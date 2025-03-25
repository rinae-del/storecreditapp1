import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, LogBox, ActivityIndicator } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import * as Location from 'expo-location';

// Suppress the specific warning from the CountryItem component
LogBox.ignoreLogs([
  'Warning: CountryItem: Support for defaultProps will be removed from function components',
]);

// Map of country codes to ISO codes (add more as needed)
const COUNTRY_MAP = {
  'US': 'US', 'CA': 'CA', 'GB': 'GB', 'AU': 'AU', 'FR': 'FR', 'DE': 'DE', 'IT': 'IT',
  'ES': 'ES', 'JP': 'JP', 'KR': 'KR', 'CN': 'CN', 'IN': 'IN', 'RU': 'RU', 'BR': 'BR',
  'ZA': 'ZA', 'NG': 'NG', 'MX': 'MX', 'AE': 'AE', 'SA': 'SA', 'SG': 'SG'
};

const PhoneInputField = ({ 
  label, 
  value, 
  onChangeText, 
  onChangeFormattedText,
  defaultCode = 'US', // Fallback default
  error,
  editable = true,
  phoneInputRef
}) => {
  const [countryCode, setCountryCode] = useState(defaultCode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationBasedCountry = async () => {
      try {
        setLoading(true);
        
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          console.log('Location permission denied, using default country code');
          setCountryCode(defaultCode);
          setLoading(false);
          return;
        }
        
        // Get location
        const location = await Location.getCurrentPositionAsync({});
        
        // Reverse geocode to get country
        const geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
        
        if (geocode && geocode.length > 0 && geocode[0].isoCountryCode) {
          const detectedCountry = geocode[0].isoCountryCode;
          console.log('Detected country code:', detectedCountry);
          
          // Use detected country code if supported, otherwise fallback to default
          if (COUNTRY_MAP[detectedCountry]) {
            setCountryCode(detectedCountry);
          } else {
            setCountryCode(defaultCode);
          }
        } else {
          setCountryCode(defaultCode);
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setCountryCode(defaultCode);
      } finally {
        setLoading(false);
      }
    };

    getLocationBasedCountry();
  }, [defaultCode]);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      {loading ? (
        <View style={[styles.loadingContainer]}>
          <ActivityIndicator size="small" color="#4CAF50" />
          <Text style={styles.loadingText}>Detecting location...</Text>
        </View>
      ) : (
        <PhoneInput
          ref={phoneInputRef}
          defaultValue={value}
          defaultCode={countryCode}
          layout="first"
          onChangeText={onChangeText}
          onChangeFormattedText={onChangeFormattedText}
          containerStyle={styles.phoneContainer}
          textContainerStyle={styles.phoneTextContainer}
          textInputStyle={styles.phoneTextInput}
          withDarkTheme={false}
          withShadow={false}
          autoFocus={false}
          editable={editable}
        />
      )}
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
  phoneContainer: {
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  phoneTextContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 0,
  },
  phoneTextInput: {
    height: 56,
    fontSize: 16,
    fontFamily: 'MontserratRegular',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'MontserratRegular',
  },
  loadingContainer: {
    height: 56,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  loadingText: {
    marginLeft: 10,
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    color: '#666',
  },
  inputDisabled: {
    backgroundColor: '#F0F0F0',
  },
});

export default PhoneInputField;