import { API_URL } from '@env';
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  FlatList,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

// ✅ Defina a URL COM BARRA no final (padrão REST)
const API_LIST_URL = `${API_URL}/wisesave/lists/`;

export default function ShopListScreen() {
  const router = useRouter();

  const [listName, setListName] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("un");
  const [tempItems, setTempItems] = useState([]);
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData).id);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  };




  const handleAddItemToList = () => {
    if (itemName.trim() === "") {
      Alert.alert("Erro", "Digite o nome do produto.");
      return;
    }
    const numQuantity = parseFloat(quantity.replace(",", ".")) || 1;
    const itemUnit = unit.trim() || "un";

    const newItem = {
      id: Date.now().toString(),
      name: itemName.trim(),
      quantity: numQuantity,
      unit: itemUnit,
    };

    setTempItems((prevItems) => [newItem, ...prevItems]);
    setItemName("");
    setQuantity("1");
    setUnit("un");
    Keyboard.dismiss();
  };

  const handleRemoveItem = (id) => {
    setTempItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  //  Finalizar e salvar lista
  const handleFinish = async () => {
    // Validação do nome da lista
    if (listName.trim() === "") {
      Alert.alert("Erro", "Adicione um nome à sua lista.");
      return;
    }

    // Validação dos itens
    if (tempItems.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos um item à lista.");
      return;
    }

    try {
      // ✅ POST com Axios (sem precisar adicionar barra, já está na constante)
      const response = await axios.post(API_LIST_URL, {
        name: listName.trim(),
        items: tempItems,
        userId: user
      });

      // Sucesso
      Alert.alert("Sucesso!", "Sua lista foi salva!");
      router.back();

    } catch (error) {
      console.error("Erro ao salvar a lista:", error);
      Alert.alert("Erro", "Não foi possível salvar a lista.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Itens</Text>

      {/* --- FORMULÁRIO --- */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome da lista"
          value={listName}
          onChangeText={setListName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={itemName}
          onChangeText={setItemName}
        />
        <View style={styles.bottomRow}>
          <TextInput
            style={styles.inputQuantity}
            placeholder="Qtd."
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            textAlign="center"
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={unit}
              onValueChange={(itemValue) => setUnit(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="un" value="un" />
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="g" value="g" />
              <Picker.Item label="L" value="L" />
              <Picker.Item label="mL" value="mL" />
              <Picker.Item label="pacote" value="pacote" />
              <Picker.Item label="lata" value="lata" />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddItemToList}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subHeader}>Itens adicionados:</Text>

      {/* --- LISTA --- */}
      <FlatList
        data={tempItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Agrupa nome e quantidade */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text
                style={styles.itemQuantity}
              >{`${item.quantity} ${item.unit}`}</Text>
            </View>
            {/* Botão de remover */}
            <TouchableOpacity
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
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
  formContainer: {
    marginBottom: 20,
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 5,

  },
  inputQuantity: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    textAlign: "center",
  },
  pickerContainer: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginLeft: 10,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#38CA58",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 24,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#888",
  },

  removeButton: {
    paddingLeft: 15,
  },
  removeButtonText: {
    fontSize: 22,
    color: "#FF3B30",
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
    marginBottom: 30,
  },
  doneButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});