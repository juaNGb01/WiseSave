import { API_URL } from '@env';
import {
  View,
  Text,
  FlatList, // Não usado, mas mantido
  StyleSheet,
  TouchableOpacity, // Não usado, mas mantido
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";
import OptionItem from "@/components/accountScreen/optionItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
// 🚨 IMPORTAR O MODAL REUTILIZÁVEL
import UpdateDataModal from '../../components/accountScreen/updateDataModal';


const account = () => {

  const [user, setUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // ESTADOS PARA O MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(''); // 'username', 'email' ou 'password'
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  // --- FUNÇÕES DE LÓGICA DO USUÁRIO ---
  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  };

  const logout = async () => {
    try {
      // REMOVER TOKEN E DADOS DO ASYNCSTORAGE
      await AsyncStorage.multiRemove(["token", "user"]);
      // Opcional: Mostrar mensagem
      Alert.alert("Sucesso", "Você saiu da conta!");
      // Redirecionar para login
      router.dismissAll(); // Fecha todas as telas
      router.replace("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Não foi possível sair");
    }
  }


  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => { logout() }
        }
      ]
    )
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja deletar a conta?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => { deleteAccount() }
        }
      ]
    )
  }

  const deleteAccount = async () => {
    try {
      // Pegar o token
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Erro", "Você não está autenticado");
        return;
      }
      // Fazer requisição para deletar
      await axios.delete(
        `${API_URL}/wisesave/user/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Limpar AsyncStorage
      await AsyncStorage.multiRemove(["token", "user"]);
      // Redirecionar para login
      Alert.alert("Sucesso", "Conta deletada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            router.dismissAll();
            router.replace("/");
          }
        }
      ]);
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível deletar a conta"
      );
    }
  }

  // FUNÇÃO PARA ABRIR O MODAL
  const handleEdit = (mode) => {
    // Só abre se os dados do usuário tiverem sido carregados
    if (user) {
      setEditMode(mode);
      setIsModalVisible(true);
    } else {
      Alert.alert("Aviso", "Aguarde o carregamento dos dados do usuário.");
    }
  };

  //FUNÇÃO PARA SALVAR E ENVIAR DADOS PARA A API
  const handleSaveData = async (mode, newValue) => {
    setIsSaving(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) throw new Error("Token não encontrado.");

      const field = mode === 'username' ? 'name' : mode;
      const dataToSend = { [field]: newValue };

      const response = await axios.put(
        `${API_URL}/wisesave/user/update`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // ATUALIZA O TOKEN NO ASYNCSTORAGE (se o backend retornar novo token)
      if (response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
      }

      // Atualiza o estado local
      if (mode === 'username') {
        setUserName(newValue);
      } else if (mode === 'email') {
        setUserEmail(newValue);
      }

      // Atualiza o objeto user 
      setUser(prev => ({
        ...prev,
        [field]: newValue
      }));

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");

    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao salvar dados"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>

      {/*  header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Configurações</Text>
          <Text style={styles.headerSubTitle}>gerencie seus dados e preferencias</Text>
        </View>
      </View>

      <View style={styles.userDataContainer}>
        <View style={styles.userIcon}>
          <IconSymbol name="user" size={20} color="white" />
        </View>
        <View style={styles.userDataText}>
          <Text style={styles.userDataName}>{user?.name || "Usuário"}</Text>
          <Text style={styles.userDataEmail}>{user?.email || ""}</Text>
        </View>
      </View>


      {/* container opcoes 1 */}
      <View style={styles.optionsContainer}>
        <OptionItem
          iconName="user"
          text="Alterar nome usuário"
          bgIcon="default"
          onPress={() => handleEdit('username')} // 🆕 Ação para abrir o modal
        />
        <OptionItem
          iconName="email"
          text="Alterar email"
          bgIcon="default"
          onPress={() => handleEdit('email')} // 🆕 Ação para abrir o modal
        />
      </View>

      {/* container opcoes 2 */}
      <View style={styles.optionsContainer}>
        <OptionItem iconName="bell" text="Ativar Notificações" bgIcon="default" />
        <OptionItem iconName="moon" text="Modo noturno" bgIcon="default" />
      </View>


      <View style={styles.optionsContainer}>
        <OptionItem iconName="delete" text="Deletar conta" bgIcon="danger" onPress={handleDeleteAccount} />
        <OptionItem iconName="logout" text="Sair da Conta" bgIcon="danger" onPress={handleLogout} />
      </View>


      {/* modal */}
      <UpdateDataModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        mode={editMode}
        currentValue={
          editMode === 'username' ? user?.name :
            editMode === 'email' ? user?.email :
              ''
        }
        onSave={handleSaveData}
        isSaving={isSaving}
      />

    </ScrollView>

  );
}

// ... (Estilos mantidos) ...
const styles = StyleSheet.create({
  //... (Estilos originais aqui)
  header: {
    backgroundColor: "rgba(56, 202, 88, 1)",
    height: 120
  },

  headerText: {
    marginHorizontal: 40,
    marginTop: 20,
    justifyContent: "center"
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
    //marginVertical: 20
  },

  headerSubTitle: {

    color: "rgba(0, 0, 0, 1)",
    fontSize: 16,
    fontWeight: "light"
  },

  userDataContainer: {
    backgroundColor: "white",
    width: 350,
    height: 100,

    marginHorizontal: "auto",
    position: "relative",
    bottom: 30,
    borderRadius: 20,

    flexDirection: "row",
    padding: 10,

    justifyContent: "flex-start ",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

  },

  userIcon: {
    backgroundColor: "rgba(56, 202, 88, 1)",
    width: 60,
    height: 60,
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center"
  },

  userDataText: {
    marginLeft: 10

  },
  userDataName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  userDataEmail: {
    fontSize: 12,
    fontWeight: "light",
    color: "rgba(108, 108, 108, 1)"
  },

  optionsContainer: {
    backgroundColor: "white",
    width: "90%",

    borderRadius: 20,
    padding: 15,

    marginHorizontal: "auto",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    justifyContent: "center",

    marginBottom: 20

  },

  optionItem: {
    borderWidth: 2,
    borderColor: "rgba(164, 164, 164, 0.59)",

    borderRadius: 20,
    padding: 10,
    height: 70,

    flexDirection: "row",

    marginBottom: 15,

    alignItems: "center"


  },

  optionItemIcon: {
    backgroundColor: "rgba(56, 202, 88, 1)",
    width: 30,
    height: 30,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",

    marginRight: 15
  }
});

export default account;