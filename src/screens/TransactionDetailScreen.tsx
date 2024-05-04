import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Transaction } from '../types/Transaction';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderLayout from '../components/HeaderLayout';
// import HeaderBackButton from '../components/Buttons/HeaderBackButton';

const TransactionDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { transaction } = route.params as { transaction: Transaction };

  const handleHeaderBackButtonPressed = () => {
    navigation.goBack();
  };

  return (
    <>
      <HeaderLayout
        headerLeftElement={
          <Button title='Back' onPress={handleHeaderBackButtonPressed} />
        }
        headerCenterElement={
          <Text style={{ fontSize: 18 }}>Transaction History</Text>
        }
        backgroundColor="grey"
      />
      <View style={styles.container}>
        {/* <Text style={styles.text}>Transaction Details</Text> */}
        <Text style={styles.text}>Amount: {`${transaction?.currency} ${transaction?.amount}`}</Text>
        <Text style={styles.text}>Date: {transaction?.date}</Text>
        <Text style={styles.text}>Description: {transaction?.description}</Text>
        <Text style={styles.text}>Type: {transaction?.type}</Text>
        <Text style={styles.text}>Payment Method: {transaction?.paymentMethod}</Text>
        <Text style={styles.text}>Merchant: {transaction?.merchant}</Text>
        <Text style={styles.text}>Location: {transaction?.location}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000',
    marginBottom: 10,
  },
});

export default TransactionDetailScreen;
