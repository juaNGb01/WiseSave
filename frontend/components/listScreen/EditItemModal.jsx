import React, { useState, useEffect } from 'react';
import { 
  Modal, View, Text, TextInput, TouchableOpacity, 
  StyleSheet, KeyboardAvoidingView, Platform 
} from 'react-native';

export default function EditItemModal({ visible, onClose, onSave, item }) {
  // Estados locais do formulário
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');

  // Sempre que o 'item' mudar ou o modal abrir, atualiza os campos
  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setQuantity(item.quantity ? String(item.quantity) : '');
      setUnit(item.unit || '');
      setPrice(item.price ? String(item.price) : '');
    }
  }, [item, visible]);

  const handleSave = () => {
    // Prepara o objeto atualizado e envia para o pai
    const updatedData = {
      name,
      quantity: parseFloat(quantity) || 0,
      unit,
      price: parseFloat(price) || 0
    };
    onSave(updatedData);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Item</Text>
          
          <Text style={styles.label}>Nome</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Quantidade</Text>
              <TextInput 
                style={styles.input} 
                value={quantity} 
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Unidade</Text>
              <TextInput 
                style={styles.input} 
                value={unit} 
                onChangeText={setUnit}
                autoCapitalize="none"
                placeholder="ex: kg"
              />
            </View>
          </View>

          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput 
            style={styles.input} 
            value={price} 
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="0.00"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'
  },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: '#DDD', borderRadius: 8,
    padding: 10, marginBottom: 15, fontSize: 16
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: {
    flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5
  },
  cancelButton: { backgroundColor: '#FF6B6B' },
  saveButton: { backgroundColor: '#38CA58' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});