import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Image, 
  SafeAreaView, 
  Platform 
} from 'react-native';
import { BlurView } from 'expo-blur';
import Button from '../ui/Button';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';


function WelcomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'MontserratRegular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'MontserratBold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'MontserratSemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'MonteserratBlack': require('../../assets/fonts/Montserrat-Black.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }
  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
    >
      <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
            
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.subheadingText}>What would you like to do?</Text>
            
            <View style={styles.buttonContainer}>
              <Button 
                title="Sign In"
                onPress={() => navigation.navigate('SignIn')}
                type="secondary"  
              />
              <Button 
                title="Register"
                onPress={() => navigation.navigate('Register')}
                type="outline"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: 'MontserratBold',
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subheadingText: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
});

export default WelcomeScreen;