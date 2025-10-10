import { text } from "@fortawesome/fontawesome-svg-core";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";


const data = [
    {
        id: "1",
        icon: "userPen",
        text: "Alterar Nome de usuário"
    },

    {
        id: "2",
        icon: "email",
        text: "Alterar email"
    },

    {
        id: "3",
        icon: "password",
        text: "Alterar senha"
    },

       {
        id: "4",
        icon: "delete", 
        text: "Deletar conta"
    }, 


];

const ListItem = ({ text, icon }) => (
        <Pressable style = {styles.listItem}>
            <IconSymbol name={icon} size={20} style={styles.iconSpacer}></IconSymbol>
            <Text style={styles.textStyle}>{text}</Text>
        </Pressable>
);


export default function OptionList() {
    return (
        <View style = {styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <ListItem text={item.text} icon={item.icon} />
                )}
                keyExtractor={item => item.id}
                scrollEnabled = {false}
            >
            </FlatList>
        </View>
    )

}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        top: "10%"
    },

    listItem: {
        flexDirection: 'row',       
        alignItems: 'center',       
        paddingVertical: 16,       
        paddingHorizontal: 20,      
        backgroundColor: 'white',   
        borderBottomWidth: 1,       
        borderBottomColor: '#EEEEEE',
    },

 

    // Estilo para o Texto
    textStyle: {
        fontSize: 20,
        color: '#333333',
        fontWeight: '500', 
        marginLeft: 15
    }

})