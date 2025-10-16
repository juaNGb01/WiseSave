import { text } from "@fortawesome/fontawesome-svg-core";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";


export default function OptionItem({iconName, text, bgIcon} ) {

    //bgcolor do icon
    const backgroundColor = bgIcon === "default" ? "rgba(56, 202, 88, 1)" : "rgba(255, 0, 0, 0.74)"
    const color = bgIcon === "default" ? "grey" : "rgba(255, 0, 0, 0.74)"

    return (
        <Pressable style={styles.optionItem}>
            {/*icon option*/}
            <View style={[styles.optionItemIcon, {backgroundColor} ]} >
                <IconSymbol name={iconName} size={15} color="white"></IconSymbol>
            </View>
            <Text style={{color}}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    optionItem: {
    borderWidth: 2, 
    borderColor: "rgba(164, 164, 164, 0.59)",

    borderRadius: 20, 
    padding: 10,
    height: 70,

    flexDirection: "row",
    
    marginBottom: 15, 

    alignItems: "center"

    
  } , 

  optionItemIcon : {
    backgroundColor: "rgba(56, 202, 88, 1)", 
    width: 30,    
    height: 30, 
    borderRadius: "50%",
    justifyContent: "center", 
    alignItems: "center",

    marginRight: 15
  }

})