import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import React from "react";
import { BarChart } from 'react-native-gifted-charts';

// 1. Definição dos dados
const barData = [
  { value: 10, label: 'Jan' },
  { value: 65, label: 'Fev' },
  { value: 50, label: 'Mar' },
  { value: 75, label: 'Abr' },
];




const Chart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos Mensais (Exemplo)</Text>

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
        rulesColor = "#dadadaff"
        // rulesType="solid"
        noOfSections={3} //indica quantas "partes" tem o grafico

        //config de uma linha para refencia(a media geral do valores)
        showReferenceLine1
        referenceLine1Position={50}
        referenceLine1Config={{
          color: '#000000ff',
          dashWidth: 2,
          dashGap: 3,
          
        }}


      />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    //backgroundColor: '#293d3a89', // Cor de fundo do container
    borderRadius: 10,
    shadowColor: '#000000ff',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    marginVertical: 20,
    alignItems: 'center', 
    margin: 10, 

    

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
});


export default Chart;