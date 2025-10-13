//import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Pressable
} from "react-native";
import { useRouter } from "expo-router"; // NOVO: Importamos o useRouter para navegação
import { IconSymbol } from "@/components/ui/icon-symbol";
import SectionButton from "@/components/homeScreen/sectionButton";

// A estrutura do item continua a mesma
interface Item {
  id: string;
  name: string;
  completed: boolean;
  quantity: number;
}

export default function Index() {
  const router = useRouter(); // NOVO: Inicializamos o router

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <View style={styles.container}>


      <View >
        <SectionButton icon="filePen" text="Sua lista de compras" backgroundColor= "rgba(56, 202, 88, 1)"/>
        <SectionButton icon="clock" text ="Histórico de compras" backgroundColor="rgba(122, 49, 187, 1)" />
        <SectionButton icon="chart-line" text ="Resumo Mensal" backgroundColor="rgba(26, 130, 227, 1)" />
      </View>
     

      {/* Botão flutuante para navegar para a tela de adicionar lista */}
      <Pressable
        style={styles.floatingButton}
        onPress={() => router.push("/(tabs)/shopList")} // Ação de navegar
      >
        <IconSymbol name="plus" size={30} color="white"></IconSymbol>
      </Pressable>
    </View>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
  },



  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#38CA58",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
    right: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold"
  },
});
