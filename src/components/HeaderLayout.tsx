import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WHITE } from '../constant/colors';

interface HeaderLayoutProps {
  headerLeftElement?: React.ReactNode;
  headerCenterLabel?: string;
  headerRightElement?: React.ReactNode;
  backgroundColor?: string;
  enableSafeAreaView?: boolean;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  headerLeftElement,
  headerCenterLabel,
  headerRightElement,
  backgroundColor = 'transparent',
  enableSafeAreaView = false,
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const additionalTop = safeAreaInsets.top < 21 ? 20 : 6;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: enableSafeAreaView
            ? additionalTop
            : safeAreaInsets.top + additionalTop,
        },
      ]}>
      <View style={styles.headerSmallElement}>{headerLeftElement}</View>
      <Text style={styles.headerMainElement}>{headerCenterLabel}</Text>
      <View style={styles.headerSmallElement}>{headerRightElement}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 14,
    zIndex: 3,
  },
  headerMainElement: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  headerSmallElement: {
    flex: 1,
    height: 24,
    width: 24,
  },
});

export default HeaderLayout;
