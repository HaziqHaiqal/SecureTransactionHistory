import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BackIconProps {
  onPress: () => void; // Define the onPress prop with a void return type
}

const BackIcon: React.FC<BackIconProps> = ({ onPress }) => {
  const handlePress = (event: GestureResponderEvent) => {
    onPress(); // Call the onPress function passed as prop
  };

  return (
    // <TouchableOpacity onPress={handlePress} style={styles.container}>
    //   <Icon name="chevron-back" size={24} color="black" />{' '}
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default BackIcon;
