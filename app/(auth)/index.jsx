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

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    // No futuro, aqui vai a lógica de verdade
    Alert.alert("Login", "Login feito com sucesso!");
    // Linha importante para navegar para a tela principal
    router.replace("/(tabs)/home");
  };

  return (

    <View style={styles.formContiner}>

      <Image
        source={require("../../assets/images/ws-logo.png")}
        style={styles.imgLogo}
      />

      <View style={styles.inputContainer}>
   
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput placeholder="Digite seu email" style={styles.input} keyboardType="email-address" />


        <Text style={styles.inputLabel}>Senha</Text>
        <TextInput placeholder="Digite sua senha" style={styles.input} secureTextEntry />

        <Text style={styles.forgotPasswordText}>esqueceu a senha?</Text>
      </View>

      <View style={styles.btnCotainer}>

        <Pressable style={styles.buttonPrimary}
        >
          <Text style={styles.buttonPrimaryText}>Login</Text>
        </Pressable>

        <Pressable style={styles.buttonSecondary}
             onPress={()=>{
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
    flex: 1, // ✅ Essencial: Ocupa a tela toda
    backgroundColor: '#ffffffff', // Fundo claro e moderno
    alignItems: 'center', // Centraliza o logo e o inputContainer horizontalmente
    paddingHorizontal: 30, // Espaçamento lateral da tela
    paddingTop: 80, // Espaço do topo (onde o header estaria)
    justifyContent: 'flex-start', // Começa o conteúdo do topo
  },

  // ESTILO DO LOGO
  imgLogo: {
    width: 150,
    height: 150,
    marginBottom: 40, // Espaço entre o logo e o primeiro input
    resizeMode: 'contain',
  },

  // CONTAINER DE INPUTS E TEXTOS DE SUPORTE
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },

  // RÓTULOS (Email/Senha)
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginVertical: 10,
    marginLeft: 5,

  },

  // CAIXAS DE INPUT
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10, // Bordas suaves
    paddingHorizontal: 15,
    fontSize: 16, 
    borderWidth: 1,
    borderColor: 'rgba(56, 202, 88, 1)', // Borda sutil
    marginBottom: 10,
    color: "rgba(113, 113, 113, 0.63)"
  },

  // TEXTO DE ESQUECEU A SENHA
  forgotPasswordText: {
    fontSize: 14,
    color: 'rgba(39, 150, 63, 1)', // Cor de link
    fontWeight: '600',
    textAlign: 'right', // Alinha à direita
    marginTop: 5,
  },

  // CONTAINER DOS BOTÕES
  btnCotainer: {
    width: '100%',
    // FlexDirection: 'row' para colocar os botões lado a lado,
    // ou deixamos como coluna (padrão) para botões empilhados (mais comum em mobile).
    // Aqui usaremos botões empilhados (coluna).
    gap: 15, // Espaço entre os botões
  },

  // ESTILO DO BOTÃO PRINCIPAL (Login)
  buttonPrimary: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(56, 202, 88, 1)', // Azul vibrante
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // Sombra sutil
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonPrimaryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // ESTILO DO BOTÃO SECUNDÁRIO (Cadastrar)
  buttonSecondary: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent', // Fundo transparente
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(56, 202, 88, 1)', // A cor de borda do primário
  },
  buttonSecondaryText: {
    color: 'rgba(56, 202, 88, 1)', // A cor do texto é a primária
    fontSize: 18,
    fontWeight: 'bold',
  },

});
