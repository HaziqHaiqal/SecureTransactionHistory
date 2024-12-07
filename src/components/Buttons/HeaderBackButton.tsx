import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import Assets from '../../assets';
import { useNavigation } from '@react-navigation/native';

interface HeaderBackButtonProps {
  onPress: () => void;
}

const HeaderBackButton = () => {
  const navigation = useNavigation();

  const handleBackOnPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      hitSlop={styles.hitSlop}
      style={styles.container}
      onPress={handleBackOnPress}>
      <Image
        resizeMode="contain"
        source={Assets.icLeftArrow}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width: 24, height: 24 },
  hitSlop: { top: 15, left: 15, bottom: 15, right: 15 },
  image: { width: 20, height: 20 },
});

export default HeaderBackButton;
