import { API_URL } from '@env';
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, 
  ActivityIndicator, SafeAreaView, TouchableOpacity, Alert 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import EditItemModal from '../../components/listScreen/EditItemModal'; 

const API_LIST_URL = `${API_URL}/wisesave/lists`;

export default function ListDetailScreen() {
  const { id: listId } = useLocalSearchParams();
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para o modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Busca Dados ---
  useEffect(() => {
    if (!listId) return;

    const fetchListDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_LIST_URL}/${listId}`);
        setList(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        Alert.alert("Erro", "Não foi possível carregar a lista.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListDetails();
  }, [listId]);

  // --- Função para SALVAR A EDIÇÃO (Nova) ---
  const handleSaveEditedItem = async (updatedFields) => {
    if (!selectedItem) return;

    // 1. Guardamos o estado anterior caso precise reverter (backup)
    const previousList = { ...list };

    // 2. Update Otimista no Frontend (Atualiza a UI antes do servidor responder)
    setList(currentList => {
      const updatedItems = currentList.items.map(item => 
        item._id === selectedItem._id 
          ? { ...item, ...updatedFields } // Mescla os dados antigos com os novos
          : item
      );
      return { ...currentList, items: updatedItems };
    });

    // Fecha o modal imediatamente
    setIsModalOpen(false);
    setSelectedItem(null);

    // 3. Envia para o Backend
    try {
      
      const url = `${API_LIST_URL}/${listId}/items/${selectedItem._id}/update`;
      
      // Envia o corpo da requisição (req.body) com os campos atualizados
      await axios.put(url, updatedFields);

      console.log("Item atualizado com sucesso no banco!");

    } catch (error) {
      console.error("Erro ao salvar edição:", error);
      Alert.alert("Erro", "Falha ao salvar alterações. Revertendo...");
      
      // 4. Reverte para o estado anterior em caso de erro
      setList(previousList);
    }
  };

  // --- Função Toggle Check (Pequena correção necessária) ---
  const handleToggleItem = async (itemId) => {
    // Encontrar o status atual para inverter no envio ao backend
    const itemToToggle = list.items.find(i => i._id === itemId);
    const newStatus = !itemToToggle.completed;

    setList(currentList => {
      const newList = { ...currentList };
      newList.items = newList.items.map(item => {
        if (item._id === itemId) {
          return { ...item, completed: newStatus };
        }
        return item;
      });
      return newList;
    });

    try {
      // CORREÇÃO IMPORTANTE: O axios.put precisa do segundo parâmetro (o corpo/body)
      // Senão o backend recebe um body vazio e não atualiza nada.
      await axios.put(
        `${API_LIST_URL}/${listId}/items/${itemId}`, 
        { completed: newStatus }
      );
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      // Recarrega a lista original do servidor para corrigir a UI
      const response = await axios.get(`${API_LIST_URL}/${listId}`);
      setList(response.data);
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // --- Renderização ---
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
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemContainer} 
            onLongPress={() => handleEditItem(item)}
          >
            <TouchableOpacity 
              style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
              onPress={() => handleToggleItem(item._id)}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, item.completed && styles.itemNameCompleted]}>
                {item.name}
              </Text>
              <Text style={styles.itemDetails}>
                {`${item.quantity} ${item.unit}`}
                {item.price > 0 && ` • R$ ${Number(item.price).toFixed(2)}`}
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleEditItem(item)}
            >
              <Text style={styles.editButtonText}>✏️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      {/* CONEXÃO FEITA AQUI: Passando a função handleSaveEditedItem */}
      <EditItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onSave={handleSaveEditedItem} 
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
  editButton: {
    padding: 8,
  },
  editButtonText: {
    fontSize: 18,
  },
});