import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
  error,
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, !editable ? styles.inputDisabled : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#999"
        editable={editable}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 18, // Increased vertical padding
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    // Removed shadow styles
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'MontserratRegular',
  },
  inputDisabled: {
    backgroundColor: '#F0F0F0',
    color: '#888',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default FormField;