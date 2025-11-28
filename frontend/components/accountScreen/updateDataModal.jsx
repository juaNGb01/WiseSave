import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';

const UpdateDataModal = ({ visible, onClose, mode, currentValue, onSave, isSaving }) => {
  const [newValue, setNewValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 1. Reseta o estado local toda vez que o modal é aberto ou o modo muda
  useEffect(() => {
    setNewValue('');
    setConfirmPassword('');
  }, [visible, mode]);

  // Funções auxiliares para mudar o texto dinamicamente
  const getTitle = () => {
    switch (mode) {
      case 'username':
        return 'Alterar Nome de Usuário';
      case 'email':
        return 'Alterar E-mail';
      case 'password':
        return 'Alterar Senha';
      default:
        return 'Editar Dados';
    }
  };

  const getInputType = () => {
    switch (mode) {
      case 'email':
        return 'email-address';
      default:
        return 'default';
    }
  };


  const handleSave = () => {
    if (!newValue) {
      Alert.alert('Erro', 'O novo valor não pode ser vazio.');
      return;
    }

    if (mode === 'password') {
      if (newValue.length < 6) {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
        return;
      }
      if (newValue !== confirmPassword) {
        Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
        return;
      }
      // Para a senha, enviamos apenas a nova senha.
      onSave(mode, newValue);
      
    } else if (mode === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newValue)) {
        Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
        return;
      }
      onSave(mode, newValue);
      
    } else {
      // Para username ou outros
      onSave(mode, newValue);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{getTitle()}</Text>
          
          {/* Mostra o valor atual para referência (exceto senha) */}
          {mode !== 'password' && (
            <Text style={styles.currentValueText}>Atual: {currentValue}</Text>
          )}

          {/* Campo de Novo Valor */}
          <Text style={styles.inputLabel}>Novo {mode === 'password' ? 'Senha' : mode}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Digite o novo ${mode}`}
            value={newValue}
            onChangeText={setNewValue}
            keyboardType={getInputType()}
            autoCapitalize={mode === 'email' ? 'none' : 'words'}
            secureTextEntry={mode === 'password'}
          />

          {/* Campo de Confirmação de Senha (Visível apenas em modo 'password') */}
          {mode === 'password' && (
            <>
              <Text style={styles.inputLabel}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
            </>
          )}

          {/* Botões de Ação */}
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.buttonClose]} 
              onPress={onClose}
              disabled={isSaving}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textStyle}>Salvar</Text>
              )}
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
};

// --- ESTILOS DO MODAL ---
const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  modalView: {
    width: '85%',
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  currentValueText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#95a5a6',
  },
  buttonSave: {
    backgroundColor: '#3498db',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default UpdateDataModal;