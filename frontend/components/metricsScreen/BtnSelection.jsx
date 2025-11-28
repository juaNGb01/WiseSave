import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function BtnSelection({ currentDate, onMonthChange }) {

    const formattedDate = currentDate.toLocaleString('pt-BR', {
        month: 'long',
        year: 'numeric'
    });

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <View style={styles.buttonSelectMonth}>
            {/* Botão Voltar */}
            <Pressable
                // Chama a função do pai passando -1
                onPress={() => onMonthChange(-1)}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <IconSymbol name="angle-left" size={20} color="#333" />
            </Pressable>

            {/* Texto Centralizado */}
            <Text style={styles.monthText}>
                {capitalizeFirstLetter(formattedDate)}
            </Text>

            {/* Botão Avançar */}
            <Pressable
                onPress={() => onMonthChange(1)}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <IconSymbol name="angle-right" size={20} color="#333" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonSelectMonth: {
        flexDirection: "row",
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: '80%', 
        backgroundColor: '#F5F5F5', 
        padding: 10,
        borderRadius: 12,
        alignSelf: 'center' 
    },
    monthText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        minWidth: 140, 
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.5 
    }
});