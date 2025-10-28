import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView, // Usado aqui para garantir que a tela role se houver muitos campos
} from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Lógica de cadastro (chamar API) iria aqui
    
    Alert.alert("Sucesso", "Cadastro realizado! Faça login para continuar.");
    
    // ✅ NOVO: Navega para a tela de Login (que é a rota index do grupo (auth))
    // Usamos 'replace' para não deixar o usuário voltar para o cadastro
    router.replace("index"); 
  };



  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crie sua Conta</Text>

        {/* CAMPO NOME */}
        <Text style={styles.inputLabel}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
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
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
          <Text style={styles.buttonPrimaryText}>Cadastrar</Text>
        </TouchableOpacity>
        
        {/* LINK PARA LOGIN */}
        <TouchableOpacity style={styles.linkContainer} onPress={()=> router.back()}>
            <Text style={styles.linkText}>Já tem conta? <Text style={{fontWeight: 'bold'}}>Faça Login</Text></Text>
        </TouchableOpacity>
        
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