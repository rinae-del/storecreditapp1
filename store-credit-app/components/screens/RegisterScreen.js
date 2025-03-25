import React, { useState, useRef } from 'react';
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
import PhoneInput from 'react-native-phone-number-input';
import FormField from '../ui/FormField';
import Button from '../ui/Button';

function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const phoneInput = useRef(null);

  const validateForm = () => {
    let newErrors = {};
    
    // First name validation
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Last name validation
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Phone validation
    if (!phoneNumber) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneInput.current?.isValidNumber(phoneNumber)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log('Register with:', firstName, lastName, email, phoneNumber, password);
      navigation.navigate('Verification'); 
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
              <Text style={styles.headerTitle}>Register</Text>
              <View style={styles.headerRight} />
            </View>
            
            <View style={styles.formContainer}>
              <FormField
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                autoCapitalize="words"
                error={errors.firstName}
              />
              
              <FormField
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
                autoCapitalize="words"
                error={errors.lastName}
              />
              
              <FormField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email}
              />
              
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Mobile Number</Text>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="US"
                  layout="first"
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setPhoneNumber(text);
                  }}
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.phoneTextContainer}
                  textInputStyle={styles.phoneTextInput}
                  withDarkTheme={false}
                  withShadow={false}
                  autoFocus={false}
                />
                {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
              </View>
              
              <FormField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                secureTextEntry={true}
                error={errors.password}
              />
              
              <Button 
                title="Register"
                onPress={handleRegister}
                type="primary" // Green button
                style={styles.registerButton}
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
  phoneContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  phoneTextContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 0,
  },
  phoneTextInput: {
    height: 60,
    fontSize: 16,
    fontFamily: 'MontserratRegular',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'MontserratRegular',
  },
  registerButton: {
    marginTop: 30,
    marginBottom: 20,
  },
  termsContainer: {
    marginTop: 10,
  },
  termsText: {
    fontFamily: 'MontserratRegular',
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  termsLink: {
    fontFamily: 'MontserratSemiBold',
    color: '#4CAF50',
  },
});

export default RegisterScreen;