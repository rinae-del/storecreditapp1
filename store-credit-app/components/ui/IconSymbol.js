import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const IconSymbol = ({ name, size = 24, color = '#000', style }) => {
  return (
    <View style={[styles.container, style]}>
      <FontAwesome5 name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconSymbol;