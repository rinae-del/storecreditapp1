import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FormField from '../ui/FormField';
import Button from '../ui/Button';

function VerificationScreen({ navigation }) {
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    
    if (!emailCode.trim()) {
      newErrors.emailCode = 'Code from email is required';
    }
    
    if (!phoneCode.trim()) {
      newErrors.phoneCode = 'Code from phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      console.log('Verify with:', emailCode, phoneCode);
      navigation.navigate('FinalStep'); 
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={28} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Verification</Text>
              <View style={styles.headerRight} />
            </View>
            
            <View style={styles.formContainer}>
              <FormField
                label="Enter the code we sent to your email"
                value={emailCode}
                onChangeText={setEmailCode}
                placeholder="xxxxx"
                keyboardType="numeric"
                error={errors.emailCode}
              />
              
              <FormField
                label="Enter the code we sent to your phone"
                value={phoneCode}
                onChangeText={setPhoneCode}
                placeholder="xxxxx"
                keyboardType="numeric"
                error={errors.phoneCode}
              />
              
              <Button 
                title="Continue"
                onPress={handleContinue}
                type="primary"
                style={styles.continueButton}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    color: '#333',
  },
  headerRight: {
    width: 44,
  },
  formContainer: {
    padding: 24,
    paddingTop: 20,
  },
  continueButton: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default VerificationScreen;