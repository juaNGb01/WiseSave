import { API_URL } from '@env';
import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, Pressable, FlatList,
  TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, StatusBar
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import axios from 'axios'; // Importando apenas o Axios

// ✅ ROTA CORRETA (Baseada no seu app.use("/wisesave/lists"))
const API_LIST_URL = `${API_URL}/wisesave/lists/`; 

// --- COMPONENTE DO "CARD" ---
const ListCard = ({ list, onDelete }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/list/${list._id}`);
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Excluir Lista",
      `Tem certeza que deseja excluir a lista "${list.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onDelete(list._id)
        }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardIcon}>
        <IconSymbol name="filePen" size={30} color="#38CA58" />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle} numberOfLines={1}>{list.name}</Text>
        <Text style={styles.cardDate}>
          Criada em: {new Date(list.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
        <Text style={{ color: '#FF3B30', fontSize: 20, fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// --- TELA PRINCIPAL ---
export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState([]);

  // 1. BUSCAR LISTAS (Com Axios)
  const fetchLists = async () => {
    setIsLoading(true);
    try {
      // O Axios já trata o JSON automaticamente e lança erro se não for 2xx
      const response = await axios.get(API_LIST_URL);
      setLists(response.data);
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
      Alert.alert("Erro", "Não foi possível carregar suas listas.");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLists();
    }, [])
  );

  // 2. DELETAR LISTA (Convertido para Axios)
  const handleDeleteList = async (id) => {
    try {
      // Axios Delete
      await axios.delete(`${API_LIST_URL}${id}`);
      
      // Atualização otimista (Remove da tela imediatamente)
      setLists(prevLists => prevLists.filter(list => list._id !== id));
    } catch (error) {
      console.error("Erro ao deletar lista:", error);
      Alert.alert("Erro", "Não foi possível excluir a lista.");
    }
  };

  // --- RENDERIZAÇÃO ---

  if (isLoading && lists.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#38CA58" />
        <Text style={styles.emptyText}>Carregando suas listas...</Text>
      </SafeAreaView>
    );
  }

  if (lists.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.title}>Minhas Listas</Text>
        <Text style={styles.emptyText}>Você ainda não possui nenhuma lista.</Text>
        <Text style={styles.emptySubText}>Clique no '+' para criar sua primeira lista!</Text>
        <Pressable
          style={styles.floatingButton}
          onPress={() => router.push("/(tabs)/shopList")}
        >
          <IconSymbol name="plus" size={30} color="white" />
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Minhas Listas</Text>
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <ListCard list={item} onDelete={handleDeleteList} />
        )}
        keyExtractor={(item) => item._id}
        style={styles.list}
        onRefresh={fetchLists}
        refreshing={isLoading}
      />
      <Pressable
        style={styles.floatingButton}
        onPress={() => router.push("/(tabs)/shopList")}
      >
        <IconSymbol name="plus" size={30} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}

// --- ESTILOS (Mantidos iguais) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginVertical: 20 },
  list: { paddingHorizontal: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  cardIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E6F8EB', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  cardDate: { fontSize: 14, color: '#888', marginTop: 2 },
  deleteButton: { padding: 5, marginLeft: 10 },
  emptyText: { fontSize: 18, color: '#888', textAlign: 'center', fontWeight: '500', marginTop: 10 },
  emptySubText: { fontSize: 14, color: '#AAA', textAlign: 'center', marginTop: 8 },
  floatingButton: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#38CA58', justifyContent: 'center', alignItems: 'center', bottom: 30, right: 30, elevation: 8 },
});