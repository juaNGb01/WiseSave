import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";

//alterar ip para o da maquina
const API_BASE_URL = "http://10.204.25.138:3000/wisesave/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Prencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      const userData = response.data;
      Alert.alert("Sucesso!", response.data.message, [
        // Após o sucesso, leva o usuário para a tela de Login
        { text: "OK", onPress: () => router.replace("/(tabs)/home") },
      ]);
    } catch (error) {
      //retorna o status 401 ou 400
      const errorMessage =
        error.response?.data?.message ||
        "Erro de conexão ou credenciais inválidas.";
      console.log(error);
      Alert.alert("Falha no Login", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContiner}>
      <Image
        source={require("../../assets/images/ws-logo.png")}
        style={styles.imgLogo}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.inputLabel}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.forgotPasswordText}>esqueceu a senha?</Text>
      </View>

      <View style={styles.btnCotainer}>
        <Pressable
          style={styles.buttonPrimary}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonPrimaryText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.buttonSecondary}
          onPress={() => {
            router.push("register");
          }}
        >
          <Text style={styles.buttonSecondaryText}>Cadastrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTAINER PRINCIPAL
  formContiner: {
    flex: 1,
    backgroundColor: "#ffffffff",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 80,
    justifyContent: "flex-start",
  },

  // ESTILO DO LOGO
  imgLogo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    resizeMode: "contain",
  },

  // CONTAINER DE INPUTS E TEXTOS DE SUPORTE
  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },

  // RÓTULOS (Email/Senha)
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginVertical: 10,
    marginLeft: 5,
  },

  // CAIXAS DE INPUT
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(56, 202, 88, 1)",
    marginBottom: 10,
    color: "rgba(113, 113, 113, 0.63)",
  },

  // TEXTO DE ESQUECEU A SENHA
  forgotPasswordText: {
    fontSize: 14,
    color: "rgba(39, 150, 63, 1)",
    fontWeight: "600",
    textAlign: "right",
    marginTop: 5,
  },

  // CONTAINER DOS BOTÕES
  btnCotainer: {
    width: "100%",
    gap: 15,
  },
  // ESTILO DO BOTÃO PRINCIPAL (Login)
  buttonPrimary: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(56, 202, 88, 1)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonPrimaryText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  // ESTILO DO BOTÃO SECUNDÁRIO
  buttonSecondary: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(56, 202, 88, 1)",
  },
  buttonSecondaryText: {
    color: "rgba(56, 202, 88, 1)",
    fontSize: 18,
    fontWeight: "bold",
  },
});
