import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');
const QR_CODE_SIZE = width * 0.7;
function MyQRCodeScreen({ navigation, route }) {
  const username = route.params?.username || 'rinae-del';
  
  const qrData = JSON.stringify({
    user: username,
    timestamp: new Date().toISOString(),
    type: 'store_credit'
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <View style={{ width: 28 }} /> 
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.instructionText}>
            Let the business scan your QR Code{'\n'}
            below to issue or redeem credit from your{'\n'}
            account.
          </Text>
          
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={qrData}
              size={QR_CODE_SIZE}
              color="black"
              backgroundColor="white"
            />
          </View>
          
          <Text style={styles.usernameText}>
            {username}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 24,
    color: 'white',
    marginRight: 44,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  qrCodeContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  usernameText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
});

export default MyQRCodeScreen;