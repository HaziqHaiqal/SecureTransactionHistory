import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

interface HeaderLayoutProps {
  headerLeftElement?: React.ReactNode;
  headerCenterElement?: React.ReactNode;
  headerRightElement?: React.ReactNode;
  backgroundColor?: string;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  headerLeftElement,
  headerCenterElement,
  headerRightElement,
  backgroundColor = 'transparent',
}) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: safeAreaInsets.top,
          height: 70 + safeAreaInsets.top,
        },
      ]}>
      <View style={styles.headerSmallElement}>{headerLeftElement}</View>
      <View style={styles.headerMainElement}>{headerCenterElement}</View>
      <View style={styles.headerSmallElement}>{headerRightElement}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 7,
    width: '100%',
    zIndex: 1,
  },
  headerMainElement: {
    flex: 1,
    alignItems: 'center',
  },
  headerSmallElement: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: '100%',
  },
});

HeaderLayout.propTypes = {
  headerLeftElement: PropTypes.node,
  headerCenterElement: PropTypes.node,
  headerRightElement: PropTypes.node,
  backgroundColor: PropTypes.string,
};

export default HeaderLayout;
