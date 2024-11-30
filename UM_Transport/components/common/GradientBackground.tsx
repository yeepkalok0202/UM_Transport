import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({
  children,
  colors,
}: {
  children: React.ReactNode;
  colors?: string;
}) => {
  return (
    <LinearGradient
      colors={colors ? [colors, colors] : ['#E5EBF0', '#ffffff']}
      start={{ x: 0, y: 1 }} // Start at the top right corner
      end={{ x: 1, y: 0 }} // End at the bottom left corner
      locations={[0, 1]} // White covers 10% of the gradient
      style={styles.background} // Apply styles to the gradient
    >
      {children}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    
  },
});

export default GradientBackground;
