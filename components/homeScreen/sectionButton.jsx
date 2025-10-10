import { Pressable, StyleSheet, View, Text } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

export default function SectionButton({ icon }) {

    return (
        <Pressable style={styles.section}>
            <View>
                <Text style={styles.text}>Teste 1</Text>
                <Text style={styles.text}>Teste 1</Text>
            </View>
            <IconSymbol name={icon} size={30} color="white"></IconSymbol>
        </Pressable>

    )

}


const styles = StyleSheet.create({
    section: {

        padding: 20,
        backgroundColor: "blue",
        borderRadius: 15,

        width: "90%",
        height: "50%",
        margin: 20,

        flexDirection: "row",
        alignItems: "center"
        

    },
    text: {
        fontWeight: "bold",
        fontSize: 20, 
        margin: 5
    
    }
})