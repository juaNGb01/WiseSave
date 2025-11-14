import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";

//configurar conforme o ip local
const API_BASE_URL = 'http://10.204.25.138:3000/wisesave/auth';

export default function RegisterScreen() {


  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {


    if (!userName || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "preencha todos os campos");
      return;
    }
      if (password !== confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem.");
        console.log("senha")
        return;
      }
      setLoading(true)
      try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
          userName,
          email,
          password
        })
        Alert.alert(
          "Sucesso!",
          response.data.message || "Cadastro realizado com sucesso!",
          [
            // Após o sucesso, leva o usuário para a tela de Login
            { text: "OK", onPress: () => router.replace("/(auth)") }
          ]
        )
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro de conexão. Tente novamente.";
        Alert.alert("Falha no Cadastro", errorMessage);
      } finally {
        setLoading(false);
      };
    }
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crie sua Conta</Text>

        {/* CAMPO NOME */}
        <Text style={styles.inputLabel}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={userName}
          onChangeText={setUserName}
          autoCapitalize="words"
        />

        {/* CAMPO E-MAIL */}
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* CAMPO SENHA */}
        <Text style={styles.inputLabel}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua senha (mín. 6 caracteres)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* CAMPO CONFIRMAR SENHA */}
        <Text style={styles.inputLabel}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* BOTÃO PRIMÁRIO (Cadastrar) */}
        <Pressable style={styles.buttonPrimary} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonPrimaryText}>Cadastrar</Text>
        </Pressable>

        {/* LINK PARA LOGIN */}
        <Pressable style={styles.linkContainer} onPress={() => router.back()}>
          <Text style={styles.linkText}>Já tem conta? <Text style={{ fontWeight: 'bold' }}>Faça Login</Text></Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  // CONTAINER DE ROLAGEM
  scrollContent: {
    flexGrow: 1, // Permite que o conteúdo se expanda e role
    justifyContent: "center", // Centraliza o formulário verticalmente
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },

  // CONTAINER DO FORMULÁRIO (Usado para aplicar margens em bloco)
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: '#333333',
  },

  // RÓTULOS (Nome, Email, etc.)
  inputLabel: {
    width: "100%",
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
    marginTop: 10,
  },

  // CAIXAS DE INPUT
  input: {
    width: "100%",
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
  },

  // BOTÃO PRIMÁRIO (Cadastrar)
  buttonPrimary: {
    width: "100%",
    height: 50,
    backgroundColor: '#3498DB',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  buttonPrimaryText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },

  // LINK PARA LOGIN
  linkContainer: {
    marginTop: 10,
    padding: 10,
  },
  linkText: {
    color: '#333333',
    fontSize: 16,
  }
});