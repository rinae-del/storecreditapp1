import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import FormField from '../../ui/FormField';
import PhoneInputField from '../../ui/PhoneInputField';
import Button from '../../ui/Button';

function ProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [imageError, setImageError] = useState(false);
  const [firstName, setFirstName] = useState('Rinae');
  const [lastName, setLastName] = useState('Del');
  const [email, setEmail] = useState('rinae.del@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Updated timestamp from feedback
  const currentDateTime = "2025-03-25 13:25:17";
  const currentUserLogin = "rinae-del";
  
  const handlePickImage = async () => {
    try {
      // Request permission to access the image library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant permission to access your photos');
        return;
      }
      
      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        setImageError(false);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const validateForm = () => {
    let newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (password && password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = () => {
    if (validateForm()) {
      // Profile update logic would go here
      console.log('Profile update submitted');
      Alert.alert('Success', 'Profile updated successfully');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 40}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            style={styles.container} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={28} color="#333" />
              </TouchableOpacity>
              
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>My Profile</Text>
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.profileSection}>
                <TouchableOpacity onPress={handlePickImage}>
                  <View style={styles.profileImageContainer}>
                    {imageError ? (
                      <View style={styles.fallbackImageContainer}>
                        <Ionicons name="person" size={50} color="#999" />
                      </View>
                    ) : (
                      <Image 
                        source={{ uri: profileImage }} 
                        style={styles.profileImage}
                        onError={() => {
                          console.log('Image failed to load, showing fallback');
                          setImageError(true);
                        }}
                      />
                    )}
                    <View style={styles.editIconContainer}>
                      <Ionicons name="camera" size={22} color="white" />
                    </View>
                  </View>
                </TouchableOpacity>
                
                <View style={styles.nameFieldsContainer}>
                  <FormField
                    label="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter first name"
                    error={errors.firstName}
                    containerStyle={styles.nameField}
                  />
                  
                  <FormField
                    label="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter last name"
                    error={errors.lastName}
                    containerStyle={styles.nameField}
                  />
                </View>
              </View>
              
              <FormField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                keyboardType="email-address"
                editable={false}
                style={styles.disabledField}
              />
              
              <View style={styles.phoneFieldContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={[styles.phoneContainer, styles.disabledContainer]}>
                  <Text style={styles.countryCode}>+1</Text>
                  <Text style={styles.phoneText}>{phone}</Text>
                </View>
              </View>
              
              <FormField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter new password"
                secureTextEntry
                error={errors.password}
              />
              <Button 
                title="Update Profile"
                type="primary"
                onPress={handleUpdateProfile}
                style={styles.updateButton}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    paddingBottom: 50, // Extra padding at the bottom to ensure visibility
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  backButton: {
    padding: 8,
    zIndex: 1,
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    padding: 5,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  fallbackImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#333',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  nameFieldsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameField: {
    marginBottom: 10,
  },
  disabledField: {
    backgroundColor: '#F0F0F0',
    color: '#888',
  },
  // Phone field styles
  phoneFieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  disabledContainer: {
    backgroundColor: '#F0F0F0',
    borderColor: '#DDD',
  },
  countryCode: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#EEE',
  },
  phoneText: {
    flex: 1,
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: '#888',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  updateButton: {
    marginTop: 10,
    marginBottom: 30,
  },
});

export default ProfileScreen;