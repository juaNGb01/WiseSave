import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";


export default function SectionButton({ text, backgroundColor }) {

    return (
        <Pressable style={[styles.button, {backgroundColor}]}>
            <View>
                <Text style={styles.text}>{text}</Text>
                
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
        height: 130,
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
    
    }, 
    subText : {
        margin: 5, 
        fontSize: 15, 
        color: "rgba(230, 228, 228, 1)",
        fontWeight:"medium", 
        fontStyle: "italic", 

    
    }, 
    iconContainer: {
        position: "absolute",
        margin: 5,
        right: 10,
        bottom: 10,
    },
  
})