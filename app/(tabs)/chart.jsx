import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Chart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wise Save - Charts </Text>
      <Text style={styles.textContent}>
        Wise save is a app create to solve your problems about purschase. With
        him you can save your money and time
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: "auto",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  textContent: {
    color: "white",
    fontSize: 12,
  },
});

export default Chart;
