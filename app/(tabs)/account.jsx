import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";
import OptionList from "@/components/accountScreen/optionList";

const account = () => {
  return (
    <View style={styles.container}>
      <View style ={styles.userImage}>
        <IconSymbol name="user" size={150} color="white"/> 
      </View>
      <Text>User xxxx</Text>
      <OptionList  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    resizeMode: "cover",
 
  }, 

  userImage : {
    width:"250px", 
    height: "250px", 
    borderRadius: "50%", 
    backgroundColor: "rgba(56, 202, 88, 1)",
    marginVertical: "15%",
    justifyContent: "center", 
    alignItems: "center"


  }
});

export default account;
