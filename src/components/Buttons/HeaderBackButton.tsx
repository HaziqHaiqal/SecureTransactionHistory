import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderBackButtonProps {
  onPress: () => void;
}

const HeaderBackButton = ({ onPress }: HeaderBackButtonProps) => {
  const handlePress = (event: GestureResponderEvent) => {
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Icon name="chevron-back" size={20} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
  },
});

export default HeaderBackButton;
