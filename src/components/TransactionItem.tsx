import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Transaction } from '../types/Transaction';
import Assets from '../assets';

// Not use, using SectionList in TransactionHistory screen
const TransactionItem: React.FC<{
  transaction: Transaction;
  onPress: () => void;
}> = ({ transaction, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
        <Text
          style={[
            styles.amount,
            transaction.type === 'debit' ? styles.debit : styles.credit,
          ]}>
          {transaction.type === 'credit'
            ? `- RM ${transaction.amount}`
            : `RM ${transaction.amount}`}
        </Text>
      </View>
      <Image source={Assets.icRightArrow} style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: { flex: 1 },
  description: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 14, color: '#666' },
  amount: { fontSize: 16, color: 'green' },
  debit: { color: 'green' },
  credit: { color: 'red' },
  arrow: { width: 25, height: 25 },
});

export default TransactionItem;
