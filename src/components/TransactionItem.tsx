import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Transaction } from '../types/Transaction';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Amount: {`${transaction?.currency} ${transaction?.amount}`}
        </Text>
        <Text style={styles.text}>Date: {transaction.date}</Text>
        <Text style={styles.text}>Description: {transaction.description}</Text>
        <Text style={styles.text}>Type: {transaction.type}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    color: '#000',
  },
});

export default TransactionItem;
