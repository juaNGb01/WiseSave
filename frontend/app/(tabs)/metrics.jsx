import InfoCardItem from "@/components/metricsScreen/infoCardItem.jsx";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert
} from "react-native";
import { BarChart } from 'react-native-gifted-charts';
import BtnSelection from "@/components/metricsScreen/BtnSelection.jsx";
import axios from "axios"; // Não esqueça de instalar: npm install axios
import { API_URL } from '@env';


const API_METRICS = `${API_URL}/wisesave/metrics/summary`



const initialBarData = [
  { value: 0, label: '-' },
  { value: 0, label: '-' },
  { value: 0, label: '-' },
  { value: 0, label: '-' },
];

const Metrics = () => {

  // 1. Estados
  const [currentDate, setCurrentDate] = useState(new Date());
  const [metricsData, setMetricsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(initialBarData); //estado do grafico



  // 2. Função para alterar o mês (será passada para o BtnSelection)
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // 3. Busca os dados na API sempre que currentDate mudar
  useEffect(() => {
    fetchMetrics();
  }, [currentDate]);


  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const month = currentDate.getMonth(); // 0 a 11
      const year = currentDate.getFullYear();

      // Chama a rota: .../summary?month=X&year=Y
      const response = await axios.get(`${API_METRICS}?month=${month}&year=${year}`);
      const data = response.data;
      setMetricsData(data);

      // --- MAPEAMENTO DO GRÁFICO ---
      if (data.chartData) {
        const formattedChart = data.chartData.map((item) => ({
          value: item.value,
          label: item.label.charAt(0).toUpperCase() + item.label.slice(1), // Capitaliza "Jan"
          frontColor: item.isSelected ? '#17ceceff' : '#9CA3AF', // Destaque pro mês atual
          topLabelComponent: () => (
            <Text style={{ color: 'gray', fontSize: 10, marginBottom: 4 }}>
              {item.value > 0 ? `R$${Math.floor(item.value)}` : ''}
            </Text>
          )
        }));
        setChartData(formattedChart);
      }

    } catch (error) {
      console.error("Erro ao buscar métricas:", error);
      setChartData(initialBarData);
      // Opcional: Alert.alert("Erro", "Não foi possível carregar os dados.");
      setMetricsData(null); // Reseta os dados em caso de erro
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Mapeamento Dinâmico: Transforma os dados da API no formato dos Cards
  // Se metricsData for null (carregando ou erro), usa valores zerados/padrão
  const dynamicCardsData = [
    {
      id: "1",
      title: "Total comprado",
      value: metricsData ? `R$ ${metricsData.totalGasto.toFixed(2)}` : "R$ 0.00",
      description: "total comprado no mês",
      icon: "dolar"
    },
    {
      id: "2",
      title: "Maior Compra",
      value: metricsData ? `R$ ${metricsData.maiorCompra.toFixed(2)}` : "R$ 0.00",
      description: "Valor único mais alto",
      icon: "chart-line"
    },
    {
      id: "3",
      title: "Produto mais caro",
      value: metricsData ? `R$ ${metricsData.produtoMaisCaro.valor.toFixed(2)}` : "R$ 0.00",
      description: metricsData ? metricsData.produtoMaisCaro.nome : "-",
      icon: "box-open"
    },
    {
      id: "4",
      title: "Mais comprado",
      value: metricsData ? metricsData.produtoMaisComprado.nome : "-",
      description: metricsData ? `${metricsData.produtoMaisComprado.quantidade} unidades` : "0 unidades",
      icon: "cart-shop"
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>

      <Text style={styles.title}>Gastos Mensais </Text>

      <BarChart
        data={chartData} // Agora usa o estado
        barWidth={35}
        initialSpacing={20}
        spacing={30}
        barBorderRadius={4}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: 'gray' }}
        yAxisTextStyle={{ color: 'gray' }}
        noOfSections={3}
        maxValue={Math.max(...chartData.map(d => d.value)) * 1.2 || 100} // Ajusta escala auto
        isAnimated
      />

      <BtnSelection
        currentDate={currentDate}
        onMonthChange={changeMonth}
      />

      {/* Exibição dos Cards ou Loading */}
      <View style={styles.cardsWrapper}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#17ceceff" style={{ marginTop: 20 }} />
        ) : (
          dynamicCardsData.map((item) => (
            <InfoCardItem key={item.id} item={item} />
          ))
        )}
      </View>

    </ScrollView>

  );

}
const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    flexGrow: 1, // Permite que o ScrollView cresça
    backgroundColor: "white",


  },

  chartContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000000ff',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    marginVertical: 50
  },
  buttonSelectMonth: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: 'center',
    gap: 20,
  },

  cardsWrapper: {
    width: '100%',
    marginTop: 20,
  },


});


export default Metrics;

