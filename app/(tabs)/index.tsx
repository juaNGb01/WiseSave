import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // NOVO: Importamos o useRouter para navegação

// A estrutura do item continua a mesma
interface Item {
  id: string;
  name: string;
  completed: boolean;
  quantity: number;
}

export default function InicioScreen() {
  const router = useRouter(); // NOVO: Inicializamos o router

  // O estado da lista continua aqui, para que a tela possa exibi-la.
  // No futuro, este estado virá de um lugar global (Context ou outra biblioteca).
  const [items, setItems] = useState<Item[]>([]);

  // As funções de gerenciar a lista (marcar, mudar quantidade, deletar) continuam aqui.
  const toggleItemCompletion = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleUpdateQuantity = (id: string, amount: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const deleteItem = (id: string) => {
    Alert.alert("Excluir Item", "Tem certeza que deseja excluir este item?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        onPress: () =>
          setItems((prevItems) => prevItems.filter((item) => item.id !== id)),
        style: "destructive",
      },
    ]);
  };

  // --- RENDERIZAÇÃO DO COMPONENTE ---

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minha Lista de Compras</Text>

      {/* REMOVIDO: A área de input para adicionar novos itens foi retirada daqui. */}

      {/* A lista continua aqui, para visualização e gerenciamento. */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.itemInfo}
              onPress={() => toggleItemCompletion(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxCompleted,
                ]}
              >
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text
                style={[
                  styles.itemText,
                  item.completed && styles.itemTextCompleted,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleUpdateQuantity(item.id, -1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleUpdateQuantity(item.id, 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Sua lista está vazia. Toque no '+' para adicionar itens!
          </Text>
        }
        style={styles.list}
      />

      {/* NOVO: Botão flutuante para navegar para a tela de adicionar lista */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/(tabs)/shopList")} // Ação de navegar
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
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
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  list: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#38CA58",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  checkboxCompleted: {
    backgroundColor: "#38CA58",
  },
  checkmark: {
    color: "#FFF",
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  itemTextCompleted: {
    textDecorationLine: "line-through",
    color: "#AAA",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  deleteButton: {
    fontSize: 20,
    marginLeft: 15,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
    fontSize: 16,
  },
  // NOVO: Estilos para o botão flutuante
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#38CA58",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
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
    fontWeight: "bold",
    lineHeight: 32, // Ajuste fino para centralizar o '+'
  },
});
