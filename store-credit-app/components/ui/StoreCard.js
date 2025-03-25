import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StoreCard = ({ 
  storeName, 
  subtitle, 
  logoUri,
  // Additional props for more flexibility
  storeNameStyle,
  containerStyle,
  logoContainerStyle,
  logoStyle,
  contentContainerStyle,
  renderSubtitle
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <View style={[styles.logoContainer, logoContainerStyle]}>
        <Image 
          source={{ uri: logoUri }} 
          style={[styles.logo, logoStyle]}
          defaultSource={require('../../assets/icon.png')}
        />
      </View>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        <Text style={[styles.storeName, storeNameStyle]} numberOfLines={1}>
          {storeName}
        </Text>
        
        {/* Handle different types of subtitle content */}
        {renderSubtitle ? (
          renderSubtitle()
        ) : (
          typeof subtitle === 'string' ? (
            <Text style={styles.subtitle}>{subtitle}</Text>
          ) : (
            subtitle
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
  },
  storeName: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 19,
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: '#333',
  },
});

export default StoreCard;