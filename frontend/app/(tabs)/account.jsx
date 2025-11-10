
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";
import OptionItem from "@/components/accountScreen/optionItem";




const UserHandle = async ()=> {

}

const account = () => {
  return (

    <ScrollView contentContainerStyle={styles.scrollContent}>

      {/*Header*/}
      <View style={styles.header}>
        {/*Text */}
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Configurações</Text>
          <Text style={styles.headerSubTitle}>gerencie seus dados e preferencias</Text>
        </View>
      </View>

      {/*User data container*/}
      <View style={styles.userDataContainer}>
        {/*user icon*/}
        <View style={styles.userIcon}>
          <IconSymbol name="user" size={20} color="white" />
        </View>
        {/*user data*/}
        <View style={styles.userDataText}>
          <Text style={styles.userDataName}>username</Text>
          <Text style={styles.userDataEmail}>user@email.com</Text>
        </View>
      </View>


      {/*Options container - component*/}
      <View style={styles.optionsContainer}>
        <OptionItem iconName="user" text="Alterar nome usuário" bgIcon="default" />
        <OptionItem iconName="email" text="Alterar email" bgIcon="default" />
      </View>

      <View style={styles.optionsContainer}>
        <OptionItem iconName="bell" text="Ativar Notificações" bgIcon="default" />
        <OptionItem iconName="moon" text="Modo noturno" bgIcon="default" />
      </View>

      
      <View style={styles.optionsContainer}>
        <OptionItem iconName="delete" text="Deletar conta" bgIcon="danger" />
         <OptionItem iconName="logout" text="Sair da Conta" bgIcon="danger" />
      </View>

    </ScrollView>

  );
};

const styles = StyleSheet.create({



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