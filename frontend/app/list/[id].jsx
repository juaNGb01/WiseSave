// app/list/[id].jsx
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, 
  ActivityIndicator, SafeAreaView, TouchableOpacity, Alert 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Hook para pegar o ID da URL

// !!! Lembre-se de usar o SEU IP e a SUA PORTA !!!
const API_URL = 'http://192.168.3.56:3000/wisesave/lists'; // Use o seu IP!

export default function ListDetailScreen() {
  const { id: listId } = useLocalSearchParams(); // Pega o 'id' e renomeia para 'listId'
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Função que busca os dados no Backend ---
  useEffect(() => {
    if (!listId) return; // Se não tiver ID, não faz nada

    const fetchListDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/${listId}`);
        if (!response.ok) throw new Error('Falha ao buscar detalhes');
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListDetails();
  }, [listId]); // Roda sempre que o ID mudar

  // --- Função para marcar o item (o "tique") ---
  const handleToggleItem = async (itemId) => {
    // 1. Atualização Otimista (muda a tela primeiro)
    setList(currentList => {
      const newList = { ...currentList };
      newList.items = newList.items.map(item => {
        if (item._id === itemId) { // MongoDB usa '_id'
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return newList;
    });

    // 2. Sincroniza com o backend em segundo plano
    try {
      await fetch(`${API_URL}/${listId}/items/${itemId}`, {
        method: 'PUT',
      });
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      Alert.alert("Erro", "Não foi possível salvar a alteração.");
    }
  };

  // --- Renderização (O que aparece na tela) ---

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#38CA58" />
      </SafeAreaView>
    );
  }

  if (!list) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.emptyText}>Lista não encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{list.name}</Text>
      <FlatList
        data={list.items}
        keyExtractor={(item) => item._id} // MongoDB usa '_id'
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemContainer} 
            onPress={() => handleToggleItem(item._id)} // Chama a função de "ticar"
          >
            <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, item.completed && styles.itemNameCompleted]}>
                {item.name}
              </Text>
              <Text style={styles.itemDetails}>
                {`${item.quantity} ${item.unit}`}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginVertical: 20 },
  list: { paddingHorizontal: 20 },
  emptyText: { fontSize: 18, color: '#888' },
  itemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 4,
    borderWidth: 2, borderColor: '#38CA58',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 15,
  },
  checkboxCompleted: {
    backgroundColor: '#38CA58',
  },
  checkmark: {
    color: '#FFF', fontWeight: 'bold',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16, color: '#333', fontWeight: '500',
  },
  itemNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#AAA',
  },
  itemDetails: {
    fontSize: 14, color: '#888',
  },
});