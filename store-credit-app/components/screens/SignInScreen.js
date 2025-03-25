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
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FormField from '../ui/FormField';
import Button from '../ui/Button';

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      console.log('Sign in with:', email, password);
      navigation.navigate('Dashboard');
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
              <Text style={styles.headerTitle}>Sign In</Text>
              <View style={styles.headerRight} />
            </View>
            
            <View style={styles.formContainer}>
              <FormField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email}
              />
              
              <FormField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={true}
                error={errors.password}
              />
              
              <Button 
                title="Sign In"
                onPress={handleSignIn}
                type="primary"
                style={styles.signInButton}
              />
              
              <View style={styles.forgotContainer}>
                <Text style={styles.forgotText}>
                  Forgot your password? <Text 
                    style={styles.resetText}
                    onPress={() => navigation.navigate('PasswordReset')}
                  >Reset it.</Text>
                </Text>
              </View>
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
    backgroundColor: '#F5F5F5', // Light grey background
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
    paddingTop: Platform.OS === 'android' ? 40 : 16, // Extra padding for Android
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
    width: 44, // Matches back button width for balance
  },
  formContainer: {
    padding: 24,
    paddingTop: 40, // Extra space below header
  },
  signInButton: {
    marginTop: 30,
    marginBottom: 20,
  },
  forgotContainer: {
    alignSelf: 'flex-start', // Left-aligned as requested
    marginTop: 10,
  },
  forgotText: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    color: '#555',
  },
  resetText: {
    fontFamily: 'MontserratBold',
    color: '#000',
  },
});

export default SignInScreen;