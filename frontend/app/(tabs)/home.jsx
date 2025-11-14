import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, Pressable, FlatList,
  TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, StatusBar
} from 'react-native';
// Importa o 'useFocusEffect' para auto-atualizar a lista
import { useRouter, useFocusEffect } from 'expo-router';
// Verifique se este caminho para o seu ícone está correto
import { IconSymbol } from '@/components/ui/icon-symbol';

// !!! MUITO IMPORTANTE !!!
// COLOQUE O SEU IP E A PORTA DO SEU BACKEND AQUI
const API_URL = 'http://10.204.25.138:3000/api/lists'; // Ex: 'http://SEU_IP:SUA_PORTA/api/lists'

// --- COMPONENTE DO "CARD" DA LISTA (A "Pasta") ---
// Define como cada "pasta" da lista se parece
const ListCard = ({ list, onDelete }) => {
  const router = useRouter(); // Pega o roteador para navegar

  // 1. O que acontece ao CLICAR na pasta
  const handlePress = () => {
    // Navega para a tela de detalhes, passando o ID da lista
    router.push(`/list/${list._id}`); // MongoDB usa '_id'
  };

  // 2. O que acontece ao CLICAR na lixeira
  const handleDeletePress = () => {
    // Mostra um alerta de confirmação
    Alert.alert(
      "Excluir Lista",
      `Tem certeza que deseja excluir a lista "${list.name}"? Esta ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onDelete(list._id) // Chama a função de apagar
        }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Ícone da pasta */}
      <View style={styles.cardIcon}>
        <IconSymbol name="filePen" size={30} color="#38CA58" />
      </View>
      {/* Textos (Nome e Data) */}
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle} numberOfLines={1}>{list.name}</Text>
        <Text style={styles.cardDate}>
          Criada em: {new Date(list.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      {/* Botão de Apagar (Lixeira) */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
        <Text style={{ color: '#FF3B30', fontSize: 20, fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// --- TELA PRINCIPAL (Home) ---
export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState([]); // Onde as listas do backend serão guardadas

  // --- FUNÇÃO PARA BUSCAR AS LISTAS DO BACKEND ---
  const fetchLists = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Falha na resposta da rede');
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
      Alert.alert("Erro", "Não foi possível carregar suas listas.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- RODA TODA VEZ QUE A TELA GANHA FOCO ---
  // É isto que faz a lista atualizar sozinha quando você
  // volta da tela de "Adicionar"
  useFocusEffect(
    useCallback(() => {
      fetchLists();
    }, [])
  );

  // --- FUNÇÃO PARA DELETAR UMA LISTA ---
  const handleDeleteList = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao deletar no servidor');
      // Remove a lista da tela (atualização otimista)
      setLists(prevLists => prevLists.filter(list => list._id !== id));
    } catch (error) {
      console.error("Erro ao deletar lista:", error);
      Alert.alert("Erro", "Não foi possível excluir a lista.");
    }
  };

  // --- RENDERIZAÇÃO (O que aparece na tela) ---

  // 1. Tela de Carregamento (Spinner)
  if (isLoading && lists.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#38CA58" />
        <Text style={styles.emptyText}>Carregando suas listas...</Text>
      </SafeAreaView>
    );
  }

  // 2. Tela de "Lista Vazia"
  if (lists.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.title}>Minhas Listas</Text>
        <Text style={styles.emptyText}>
          Você ainda não possui nenhuma lista.
        </Text>
        <Text style={styles.emptySubText}>
          Clique no '+' para criar sua primeira lista!
        </Text>
        <Pressable
          style={styles.floatingButton}
          onPress={() => router.push("/(tabs)/shopList")}
        >
          <IconSymbol name="plus" size={30} color="white" />
        </Pressable>
      </SafeAreaView>
    );
  }

  // 3. Tela Principal (com as listas)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Minhas Listas</Text>
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <ListCard
            list={item}
            onDelete={handleDeleteList}
          />
        )}
        keyExtractor={(item) => item._id} // MongoDB usa '_id'
        style={styles.list}
        onRefresh={fetchLists} // Permite "puxar para atualizar"
        refreshing={isLoading} // Mostra o spinner ao puxar
      />
      {/* Botão flutuante para adicionar nova lista */}
      <Pressable
        style={styles.floatingButton}
        onPress={() => router.push("/(tabs)/shopList")}
      >
        <IconSymbol name="plus" size={30} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1, // Faz o container centralizado ocupar a tela toda
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6F8EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  deleteButton: {
    padding: 5, // Aumenta a área de clique
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 8,
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#38CA58',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30, // Posição mais segura (evita a barra de abas)
    right: 30,
    elevation: 8,
  },
});