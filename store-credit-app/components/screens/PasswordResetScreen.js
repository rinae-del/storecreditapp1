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

function PasswordResetScreen({ navigation }) {
  const [emailCode, setEmailCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    
    if (!emailCode.trim()) {
      newErrors.emailCode = 'Verification code is required';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!repeatPassword) {
      newErrors.repeatPassword = 'Please confirm your password';
    } else if (newPassword !== repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (validateForm()) {
      // Password reset logic would go here
      console.log('Password reset submitted');
      // Navigate to login or success screen
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
              <Text style={styles.headerTitle}>Reset Password</Text>
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
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry
                error={errors.newPassword}
              />
              
              <FormField
                label="Repeat New Password"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                placeholder="Confirm new password"
                secureTextEntry
                error={errors.repeatPassword}
              />
              
              <Button 
                title="Reset Password"
                onPress={handleResetPassword}
                type="primary"
                style={styles.resetButton}
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
  resetButton: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default PasswordResetScreen;