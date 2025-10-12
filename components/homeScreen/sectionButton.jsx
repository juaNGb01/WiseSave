import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import { Background } from "@react-navigation/elements";

export default function SectionButton({ icon, text, backgroundColor }) {

    return (
        <Pressable style={[styles.button, {backgroundColor}]}>
            <View>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.subText}>02/02/2025</Text>
            </View>
            <View style={styles.iconContainer}>
                <IconSymbol name={icon} size={30} color="white" />
            </View>
        </Pressable>
    )

}


const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderRadius: 15,
        width: "90%",
        height: "45%",
        marginHorizontal: "auto",
        marginBottom: 15, 
        
        flexDirection: "row",
        position: "relative",
        alignItems: "flex-start",
        justifyContent: "flex-start",   
    },
    text: {
        fontWeight: "medium",
        fontSize: 25, 
        margin: 5, 
        color: "white",
        //textShadowColor: 'rgba(0, 0, 0, 0.75)',
        //textShadowOffset: { width: 2, height: 2 },
        //textShadowRadius: 5
    }, 
    subText : {
        margin: 5, 
        fontSize: 15, 
        color: "rgba(230, 228, 228, 1)",
        fontWeight:"medium", 
        fontStyle: "italic", 

        // textShadowColor: 'rgba(0, 0, 0, 0.75)',
        // textShadowOffset: { width: 2, height: 2 },
        // textShadowRadius: 5
    }, 
    iconContainer: {
        position: "absolute",
        margin: 5,
        right: 10,
        bottom: 10,
    },
  
})