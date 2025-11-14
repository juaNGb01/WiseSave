import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

export default function InfoCardItem({ item }) {
    
    const { title, value, description, icon } = item;
    const isMonetaryValue = !isNaN(parseFloat(value));

    return (
        <View style={styles.infoCardContainer}>
            <View style={styles.infoCardText}>
                {/* Usando as variáveis desestruturadas */}
                <Text style={styles.infoTextTitle}>{title}</Text>
                <Text style={styles.infoValue}>
                {isMonetaryValue ? 'R$ ' : ''} 
                {value}
                </Text>
                <Text style={styles.infoValueProduct}>{description}</Text>
            </View>
            <View style={styles.iconPosition}>
                <IconSymbol name={icon} size={25} color="rgb(97, 177, 104)"></IconSymbol>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
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
  infoCardContainer: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgb(97, 177, 104)",
    borderRadius: 20,
    borderWidth: 3,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,

    width: '100%',
    height: 130,
    marginTop: 10,

    padding: 10,

    flexDirection: "row",
    alignContent: "center",


  },

  iconPosition: {
    position: "absolute",
    left: "85%",
    top: 20

  },

  infoCardText: {
    justifyContent: "space-between"

  },

  infoTextTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,


  },

  infoValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',

  },

  infoValueProduct: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,

  },


});