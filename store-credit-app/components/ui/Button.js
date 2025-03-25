import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', // primary, secondary, outline
  size = 'default', // small, default, large
  outlineColor = 'white', // Set default outline color to white
  outlineTextColor = 'white', // Set default outline text color to white
  style,
  textStyle,
}) => {
  // Determine outline style based on outlineColor
  const customOutlineStyle = type === 'outline' ? { borderColor: outlineColor } : {};
  
  // Determine text color for outline button
  const customOutlineTextStyle = type === 'outline' ? { color: outlineTextColor } : {};

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        type === 'primary' ? styles.primaryButton : 
        type === 'secondary' ? styles.secondaryButton : 
        styles.outlineButton,
        customOutlineStyle, // Apply custom outline color
        size === 'small' ? styles.smallButton :
        size === 'large' ? styles.largeButton :
        styles.defaultButton,
        style
      ]} 
      onPress={onPress}
    >
      <Text 
        style={[
          styles.buttonText, 
          type === 'outline' ? styles.outlineButtonText : styles.filledButtonText,
          customOutlineTextStyle, // Apply custom text color for outline buttons
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#000000',
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white', // Default, can be overridden
  },
  smallButton: {
    paddingVertical: 8,
  },
  defaultButton: {
    paddingVertical: 16,
  },
  largeButton: {
    paddingVertical: 20,
  },
  buttonText: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
  },
  filledButtonText: {
    color: 'white',
  },
  outlineButtonText: {
    color: 'white', // Default, can be overridden
  },
});

export default Button;