import ShoppingList from '../models/ShoppingList.js';
import mongoose from 'mongoose'; // <-- NOVO IMPORT NECESSÁRIO PARA CONVERSÃO

export const getMonthlySummary = async (req, res) => {
    // 1. CAPTURA DO ID DO USUÁRIO A PARTIR DO MIDDLEWARE DE SEGURANÇA
    const userId = req.userId; 

    try {
        if (!userId) {
            return res.status(401).json({ message: 'Acesso negado. ID do usuário é obrigatório.' });
        }
        
        // 2. CONVERSÃO CRUCIAL: Transforma a string do token em um ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: 'Mês e Ano são obrigatórios.' });
        }

        const targetMonth = parseInt(month);
        const targetYear = parseInt(year);

        const startDate = new Date(targetYear, targetMonth, 1);
        const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59, 999);
        const chartStartDate = new Date(targetYear, targetMonth - 3, 1);
        
        // --- PROMISE.ALL para consultas em paralelo ---
        const [summaryResult, chartResult] = await Promise.all([
            // Query A: O Resumo (Cards)
            ShoppingList.aggregate([
                { 
                    $match: { 
                        userId: userObjectId, 
                        createdAt: { $gte: startDate, $lte: endDate } 
                    } 
                },
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
                        userId: userObjectId, // <--- FILTRO CORRIGIDO: Usa ObjectId
                        createdAt: { $gte: chartStartDate, $lte: endDate }
                    } 
                },
                {
                    $group: {
                        _id: { 
                            year: { $year: "$createdAt" }, 
                            month: { $month: "$createdAt" }
                        },
                        total: { $sum: { $toDouble: "$totalPrice" } }
                    }
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } }
            ])
        ]);

        // --- Processamento dos Dados ---
        
        const data = summaryResult[0];
        const resumo = data.resumoGeral[0] || { totalGasto: 0, maiorCompra: 0 };
        const prodCaro = data.itemMaisCaro[0] || { nome: 'N/A', valor: 0 };
        const prodPop = data.itemMaisComprado[0] || { nome: 'N/A', quantidade: 0 };

        const historyData = [];
        for (let i = 3; i >= 0; i--) {
            const d = new Date(targetYear, targetMonth - i, 1);
            const m = d.getMonth() + 1;
            const y = d.getFullYear();

            const found = chartResult.find(item => item._id.month === m && item._id.year === y);
            
            historyData.push({
                month: m,
                year: y,
                label: d.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
                value: found ? found.total : 0,
                isSelected: i === 0 
            });
        }

        return res.status(200).json({
            totalGasto: resumo.totalGasto,
            maiorCompra: resumo.maiorCompra,
            produtoMaisCaro: { nome: prodCaro.nome, valor: prodCaro.valor },
            produtoMaisComprado: { nome: prodPop.nome, quantidade: prodPop.quantidade },
            chartData: historyData
        });

    } catch (error) {
        console.error("Erro ao calcular métricas:", error);
        // Retorna 400 se a conversão de ObjectId falhar (ex: token inválido)
        if (error.name === 'BSONTypeError') {
            return res.status(400).json({ message: 'Formato do ID de usuário inválido.' });
        }
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};