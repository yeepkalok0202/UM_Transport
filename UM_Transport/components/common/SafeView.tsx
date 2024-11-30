// GradientBackground.tsx
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from './GradientBackground';

// Define the GradientBackground component
const SafeView = ({
  children,
  colors,
  // to leave space for status bar
  leaveSpaceForStatusBar = true,
}: {
  children: React.ReactNode;
  colors?: string;
  leaveSpaceForStatusBar?: boolean;
}) => {
  return (
    <GradientBackground colors={colors}>
      <View style={{ flex: 1 }}>{children}</View>
    </GradientBackground>
  );
};

export default SafeView;
