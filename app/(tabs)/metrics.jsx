import InfoCardItem from "@/components/metricsScreen/infoCardItem";
import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarChart } from 'react-native-gifted-charts';

// 1. Definição dos dadosww
const barData = [
  { value: 10, label: 'Jan' },
  { value: 65, label: 'Fev' },
  { value: 50, label: 'Mar' },
  { value: 75, label: 'Abr' },
];


const cardsData = [
  {
    id: "1",
    title: "Total comprado",
    value: "1000.60",
    description: "total comprado no mês",
    icon: "dolar"
  },

  {
    id: "2",
    title: "Maior Compra",
    value: "250",
    description: "Valor unico mais alto",
    icon: "chart-line"
  },

  {
    id: "3",
    title: "Produo mais caro",
    value: "32",
    description: "Carne Bovina",
    icon: "box-open"
  },

  {
    id: "4",
    title: "Mais comprado",
    value: "Pão Francês",
    description: "produto em maior quantidade",
    icon: "cart-shop"
  },


]

const Chart = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>

      <Text style={styles.title}>Gastos Mensais </Text>

      <BarChart
        data={barData}
        // tamanho da barra
        barWidth={35}

        //posicao do grafico
        initialSpacing={1}
        endSpacing={10}
        yAxisLabelWidth={90}

        spacing={20}
        frontColor="#17ceceff"

        // arraedonda a barra
        barBorderRadius={8}



        yAxisThickness={0} //exibe ou não os eixos do grafico(y)
        xAxisThickness={0} //exibe ou não os eixos do grafico(x)
        xAxisColor="#054a42ff" //cor do eixo 
        rulesColor="#dadadaff"

        // rulesType="solid"
        noOfSections={3} //indica quantas secoes tem o grafico

        //config de uma linha para refencia(a media geral do valores)
        showReferenceLine1
        referenceLine1Position={50}
        referenceLine1Config={{
          color: '#000000ff',
          dashWidth: 2,
          dashGap: 3,

        }
        }

      />


      {/*Botão fds*/}
      <View style={styles.buttonSelectMonth}>
        <Pressable onPress={() => { console.log("volta mes") }}>
          <IconSymbol name="angle-left" size={20}></IconSymbol>
        </Pressable>
        <Text>nome mes</Text>
        <Pressable onPress={() => { console.log("avança mes") }}>
          <IconSymbol name="angle-right" size={20}></IconSymbol>
        </Pressable>
      </View>


      <View style={styles.cardsWrapper}>
        {cardsData.map((item) => (
          <InfoCardItem key={item.id} item={item} />
        ))}
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


export default Chart;

