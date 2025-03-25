import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

const HapticTab = ({ onPress, children, style, ...props }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={style}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default HapticTab;