import ShoppingList from '../models/ShoppingList.js';

export const getMonthlySummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: 'Mês e Ano são obrigatórios.' });
    }

    const targetMonth = parseInt(month);
    const targetYear = parseInt(year);

    // --- PARTE 1: Resumo do Mês Selecionado (Lógica anterior mantida) ---
    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59, 999);

    // --- PARTE 2: Lógica do Gráfico (Últimos 4 meses) ---
    // Precisamos de uma data de início que seja 3 meses antes do atual
    const chartStartDate = new Date(targetYear, targetMonth - 3, 1);
    
    // Vamos rodar duas consultas em paralelo para ser rápido (Promise.all)
    const [summaryResult, chartResult] = await Promise.all([
      // Query A: O Resumo (Cards)
      ShoppingList.aggregate([
        { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
        {
          $facet: {
            "resumoGeral": [
              { $group: { _id: null, totalGasto: { $sum: { $toDouble: "$totalPrice" } }, maiorCompra: { $max: { $toDouble: "$totalPrice" } } } }
            ],
            "itemMaisCaro": [
              { $unwind: "$items" },
              { $sort: { "items.price": -1 } },
              { $limit: 1 },
              { $project: { nome: "$items.name", valor: { $toDouble: "$items.price" } } }
            ],
            "itemMaisComprado": [
              { $unwind: "$items" },
              { $group: { _id: "$items.name", totalQuantidade: { $sum: "$items.quantity" } } },
              { $sort: { totalQuantidade: -1 } },
              { $limit: 1 },
              { $project: { nome: "$_id", quantidade: "$totalQuantidade" } }
            ]
          }
        }
      ]),

      // Query B: O Gráfico (Agrupado por Mês/Ano)
      ShoppingList.aggregate([
        { 
          $match: { 
            createdAt: { $gte: chartStartDate, $lte: endDate } // Pega o intervalo de 4 meses
          } 
        },
        {
          $group: {
            // Agrupa por Ano e Mês para não misturar Jan/2024 com Jan/2025
            _id: { 
              year: { $year: "$createdAt" }, 
              month: { $month: "$createdAt" } // Retorna 1-12
            },
            total: { $sum: { $toDouble: "$totalPrice" } }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } } // Ordena cronologicamente
      ])
    ]);

    // --- Processamento dos Dados ---
    
    // 1. Dados dos Cards
    const data = summaryResult[0];
    const resumo = data.resumoGeral[0] || { totalGasto: 0, maiorCompra: 0 };
    const prodCaro = data.itemMaisCaro[0] || { nome: 'N/A', valor: 0 };
    const prodPop = data.itemMaisComprado[0] || { nome: 'N/A', quantidade: 0 };

    // 2. Dados do Gráfico
    // O Mongo retorna só os meses que tiveram compra. Precisamos preencher com 0 os vazios.
    // Vamos gerar a estrutura final no Backend para facilitar o Front
    const historyData = [];
    
    // Loop para gerar os últimos 4 meses (do mais antigo para o atual)
    for (let i = 3; i >= 0; i--) {
      const d = new Date(targetYear, targetMonth - i, 1);
      const m = d.getMonth() + 1; // Mongo usa 1-12
      const y = d.getFullYear();

      // Procura se existe dado no chartResult para esse mês/ano
      const found = chartResult.find(item => item._id.month === m && item._id.year === y);
      
      historyData.push({
        month: m, // 1-12
        year: y,
        label: d.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''), // "jan", "fev"
        value: found ? found.total : 0,
        // Destaque visual: Se for o mês atual selecionado, marca flag
        isSelected: i === 0 
      });
    }

    return res.status(200).json({
      totalGasto: resumo.totalGasto,
      maiorCompra: resumo.maiorCompra,
      produtoMaisCaro: { nome: prodCaro.nome, valor: prodCaro.valor },
      produtoMaisComprado: { nome: prodPop.nome, quantidade: prodPop.quantidade },
      chartData: historyData // <--- NOVO CAMPO
    });

  } catch (error) {
    console.error("Erro ao calcular métricas:", error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};