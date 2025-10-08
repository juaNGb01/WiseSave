import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

// Usaremos a mesma estrutura de Item aqui
interface Item {
  id: string;
  name: string;
  quantity: number;
}

export default function ShopListScreen() {
  const router = useRouter();

  // Estados locais para esta tela
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [tempItems, setTempItems] = useState<Item[]>([]); // Lista temporária para mostrar o que foi adicionado

  const handleAddItemToList = () => {
    if (itemName.trim() === "") {
      Alert.alert("Erro", "Digite o nome do produto.");
      return;
    }
    const numQuantity = parseInt(quantity, 10) || 1;

    const newItem: Item = {
      id: Date.now().toString(),
      name: itemName.trim(),
      quantity: numQuantity,
    };

    // Adiciona na lista temporária desta tela
    setTempItems((prevItems) => [newItem, ...prevItems]);

    // Limpa os campos para o próximo item
    setItemName("");
    setQuantity("1");
    Keyboard.dismiss(); // Fecha o teclado
  };

  const handleFinish = () => {
    // NO PRÓXIMO PASSO, AQUI VAMOS SALVAR A 'tempItems' NO NOSSO "CÉREBRO" GLOBAL
    Alert.alert(
      "Lista Atualizada!",
      `${tempItems.length} ${
        tempItems.length === 1
          ? "item foi adicionado"
          : "itens foram adicionados"
      }.`
    );
    router.back(); // Volta para a tela anterior (a tela de Início)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Itens</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.inputQuantity}
          placeholder="Qtd."
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          textAlign="center"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddItemToList}
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Itens adicionados nesta sessão:</Text>

      <FlatList
        data={tempItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Qtd: {item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum item adicionado ainda.</Text>
        }
        style={styles.list}
      />

      <TouchableOpacity style={styles.doneButton} onPress={handleFinish}>
        <Text style={styles.doneButtonText}>Concluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  form: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputQuantity: {
    width: 60,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginLeft: 10,
  },
  addButton: {
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  doneButton: {
    backgroundColor: "#38CA58",
    borderRadius: 8,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  doneButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
