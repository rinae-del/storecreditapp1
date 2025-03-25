import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Collapsible = ({
  children,
  collapsed = true,
  title,
  renderHeader,
  duration = 300,
  style,
  contentStyle,
  headerStyle,
  onToggle,
}) => {
  const [measured, setMeasured] = useState(false);
  const [height, setHeight] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const animation = useRef(new Animated.Value(collapsed ? 0 : 1)).current;

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isCollapsed ? 0 : 1,
      duration: duration,
      useNativeDriver: false,
    }).start();
    
    if (onToggle) {
      onToggle(isCollapsed);
    }
  }, [isCollapsed, duration, animation, onToggle]);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onLayout = (event) => {
    if (!measured) {
      setHeight(event.nativeEvent.layout.height);
      setMeasured(true);
    }
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  const headerContent = renderHeader ? (
    renderHeader(isCollapsed, toggleCollapsed)
  ) : (
    <TouchableOpacity 
      style={[styles.header, headerStyle]} 
      onPress={toggleCollapsed}
    >
      <Text style={styles.headerText}>{title || 'Toggle'}</Text>
      <Text>{isCollapsed ? '▼' : '▲'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      {headerContent}
      
      <Animated.View
        style={[
          styles.contentContainer,
          { height: measured ? animatedHeight : undefined, opacity: measured ? 1 : 0 },
        ]}
      >
        <View 
          style={[styles.content, contentStyle]} 
          onLayout={onLayout}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    width: '100%',
    padding: 15,
  },
});

export default Collapsible;