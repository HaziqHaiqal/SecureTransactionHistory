import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, Alert, Text } from 'react-native';
import { Transaction } from '../types/Transaction';
import { getTransactions } from '../data/transactions';
import TransactionItem from '../components/TransactionItem';
import { useNavigation } from '@react-navigation/native';
import HeaderLayout from '../components/HeaderLayout';

const TransactionHistoryScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch transactions.');
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadTransactions().then(() => setRefreshing(false));
  };

  const handleTransactionPress = (transaction: Transaction) => {
    navigation.navigate('TransactionDetail', { transaction });
  };

  return (
    <>
      <HeaderLayout
        headerCenterElement={
          <Text style={{ fontSize: 18 }}>Transaction History</Text>
        }
        backgroundColor='grey'
      />
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() => handleTransactionPress(item)}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </>
  );
};

export default TransactionHistoryScreen;
