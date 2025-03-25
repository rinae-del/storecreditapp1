import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Button from '../ui/Button';

function FinalStepScreen({ navigation }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log('Media library permission status:', status);
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Please allow access to your photo library to upload an image.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      console.log('Attempting to open image picker...');
      
      // Using the correct properties based on your error
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images', // Changed from MediaType.Images to 'Images'
        allowsEditing: true,
        quality: 1,
      });
      
      console.log('Image picker completed with result:', result);
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log('Setting image to:', result.assets[0].uri);
        setImage(result.assets[0].uri);
      } else {
        console.log('Image selection canceled or no assets returned');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'There was a problem selecting an image. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Final Step</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Profile Picture</Text>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={pickImage}
          activeOpacity={0.7}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.uploadIconContainer}>
              <Ionicons name="cloud-upload-outline" size={40} color="#999" />
              <Text style={styles.uploadText}>Tap to upload</Text>
            </View>
          )}
        </TouchableOpacity>
        
        {image && (
          <Button 
            title="Finish"
            onPress={() => {
              console.log('Finish pressed');
                navigation.navigate('Dashboard');
            }}
            type="secondary"
            style={styles.finishButton}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  label: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowOffset: { width: 0, height: 2 },
  },
  uploadIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    fontFamily: 'MontserratRegular',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  finishButton: {
    marginTop: 20,
  },
});

export default FinalStepScreen;