import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const EditItemModal = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    quantity: item?.quantity?.toString() || '1',
    unit: item?.unit || 'un',
    price: item?.price?.toString() || '0'
  });

  const [showUnitPicker, setShowUnitPicker] = useState(false);

  const units = [
    { label: 'Unidade', value: 'un' },
    { label: 'Quilograma', value: 'kg' },
    { label: 'Grama', value: 'g' },
    { label: 'Litro', value: 'l' },
    { label: 'Mililitro', value: 'ml' },
    { label: 'Caixa', value: 'cx' },
    { label: 'Pacote', value: 'pct' }
  ];

    useEffect(() => {
    if (item && isOpen) {
      setFormData({
        name: item.name || '',
        quantity: item.quantity?.toString() || '1',
        unit: item.unit || 'un',
        price:  item.price?.toString() || '0'
      });
    }
  }, [item, isOpen]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const dataToSave = {
      name: formData.name,
      quantity: parseFloat(formData.quantity) || 1,
      unit: formData.unit,
      price: parseFloat(formData.price) || 0
    };
    onSave(dataToSave);
    onClose();
  };

  const selectUnit = (value) => {
    handleChange('unit', value);
    setShowUnitPicker(false);
  };

  const getUnitLabel = (value) => {
    const unit = units.find(u => u.value === value);
    return unit ? unit.label : value;
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Editar Item</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <ScrollView style={styles.form}>
              {/* Nome do Item */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Nome do Item</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleChange('name', value)}
                  placeholder="Ex: Arroz"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Quantidade e Unidade */}
              <View style={styles.row}>
                <View style={[styles.fieldContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Quantidade</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.quantity}
                    onChangeText={(value) => handleChange('quantity', value)}
                    keyboardType="decimal-pad"
                    placeholder="1"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={[styles.fieldContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Unidade</Text>
                  <TouchableOpacity
                    style={styles.picker}
                    onPress={() => setShowUnitPicker(!showUnitPicker)}
                  >
                    <Text style={styles.pickerText}>
                      {getUnitLabel(formData.unit)}
                    </Text>
                    <Text style={styles.pickerArrow}>▼</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Unit Picker */}
              {showUnitPicker && (
                <View style={styles.unitPickerContainer}>
                  {units.map((unit) => (
                    <TouchableOpacity
                      key={unit.value}
                      style={[
                        styles.unitOption,
                        formData.unit === unit.value && styles.unitOptionSelected
                      ]}
                      onPress={() => selectUnit(unit.value)}
                    >
                      <Text
                        style={[
                          styles.unitOptionText,
                          formData.unit === unit.value && styles.unitOptionTextSelected
                        ]}
                      >
                        {unit.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Preço */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Preço (R$)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.price}
                  onChangeText={(value) => handleChange('price', value)}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </ScrollView>

            {/* Botões */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '80%', 
    flex: 1, 
  },
  modalContent: {
    flex: 1, 
    justifyContent: 'space-between', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white', 
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937'
  },
  closeButton: {
    padding: 4
  },
  closeButtonText: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300'
  },
  form: {
    padding: 30,
    flex: 1, 
  },
  fieldContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  halfWidth: {
    flex: 1
  },
  picker: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  pickerText: {
    fontSize: 16,
    color: '#1F2937'
  },
  pickerArrow: {
    fontSize: 12,
    color: '#6B7280'
  },
  unitPickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF'
  },
  unitOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  unitOptionSelected: {
    backgroundColor: '#EFF6FF'
  },
  unitOptionText: {
    fontSize: 16,
    color: '#1F2937'
  },
  unitOptionTextSelected: {
    color: '#2563EB',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1, 
    borderTopColor: '#E5E7EB',
    backgroundColor: 'white', 
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500'
  },
  saveButton: {
    backgroundColor: '#2563EB'
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600'
  }
});

export default EditItemModal;