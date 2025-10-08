import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";

const account = () => {
  return (
    <View style={styles.container}>
      {/* imagem usuário */}
      <View style={styles.userData}>
        <IconSymbol size={80} name="user" />
      </View>
      <Text style={styles.title}>Bem Vindo, usuário XXXXX</Text>

      {/* opções de edição */}
      <View style={styles.configOptions}>
        <IconSymbol size={20} name="userPen" />
        <Text style={styles.ListStyle}>Alterar nome usuário</Text>

        <IconSymbol size={20} name="email" />
        <Text style={styles.ListStyle}>Alterar Email</Text>

        <IconSymbol size={20} name="LockPw" />
        <Text style={styles.ListStyle}>Alterar Senha</Text>

        <IconSymbol size={20} name="delete" style={{ marginRight: 5 }} />
        <Text style={styles.ListStyle}>Deletar Conta</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: "auto",
    backgroundColor: "white",
    flex: 1,
  },
  userData: {
    height: "180px",
    width: "180px",
    borderRadius: "100%",
    backgroundColor: "rgba(56, 202, 88, 0.25)",
    marginHorizontal: "auto",
    position: "relative",
    bottom: "150px",
    justifyContent: "center",
  },

  title: {
    fontFamily: "poppins",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },

  configOptions: {
    flex: 1,
    // flexDirection: "row"
  },

  ListStyle: {
    color: "black",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    margin: 5,
    fontWeight: "bold",
  },
});

export default account;
