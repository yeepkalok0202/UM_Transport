import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Subheading, Text } from 'react-native-paper';

interface ScanCardProps {
  title: string;
  scanCount: string;
  scanText: string;
  actionText: string;
  onPress?: (event: GestureResponderEvent) => void;
  color: string;
}

const ScanCard: React.FC<ScanCardProps> = ({
  title,
  scanCount,
  scanText,
  actionText,
  onPress,
  color,
}) => {
  return (
    <View>
      <View style={styles.warranty}>
        <View style={[styles.colorIndicator, { backgroundColor: color }]} />
        <Subheading style={styles.subheading}>{title}</Subheading>
      </View>
      <View style={styles.scanContainer}>
        <View style={styles.pointsWrapper}>
          <View style={styles.scanInfo}>
            <Text
              style={styles.scanTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {scanCount}
            </Text>
            <Text style={[styles.scanText, { paddingRight: 10 }]}>
              {scanText}
            </Text>
          </View>
          <TouchableOpacity style={styles.actionContainer} onPress={onPress}>
            <Text style={[styles.scanText, { color: color }]}>
              {actionText}
            </Text>
            <AntDesign name="right" size={10} color={color} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  warranty: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subheading: {
    fontWeight: 'bold',
  },
  scanContainer: {
    paddingLeft: 4,
  },
  pointsWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  scanInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scanTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingRight: 2,
  },
  scanText: {
    fontSize: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScanCard;
