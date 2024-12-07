import React, { useEffect, useState } from 'react';
import { groupBy } from 'lodash';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { Transaction } from '../types/Transaction';
import { BLACK, ORANGE, GREEN, RED } from '../constant/colors';
import HeaderLayout from '../components/HeaderLayout';
import { WHITE } from '../constant/colors';
import { getTransactions } from '../data/transactions';
import moment from 'moment';

const TransactionHistoryScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch transactions.');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const groupDataByDate = (data: Transaction[]) => {
    if (!data) {
      return [];
    }
    const result = groupBy(data, (transaction: Transaction) => {
      const date = moment(transaction.date);
      if (date.isSame(moment(), 'day')) {
        return 'Today';
      } else if (date.isSame(moment().subtract(1, 'day'), 'day')) {
        return 'Yesterday';
      } else {
        return date.format('DD MMM YYYY');
      }
    });
    let formattedData: { title: string; data: Transaction[] }[] = [];

    Object.keys(result).forEach(key => {
      formattedData.push({
        title: key,
        data: result[key],
      });
    });

    return formattedData;
  };

  const renderTxnHistoryContent = ({ item }: { item: Transaction }) => {
    return (
      <TouchableOpacity style={styles.contentContainer}>
        <View style={styles.trxHistoryDesc}>
          <Text style={styles.label}>{item?.description}</Text>
        </View>
        <View style={styles.trxHistoryAmount}>
          <Text
            style={[
              styles.label,
              item?.type === 'credit' ? { color: RED } : { color: GREEN },
            ]}>
            {item?.type === 'credit'
              ? `- ${item?.currency} ${item?.amount}`
              : `${item?.currency} ${item?.amount}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTxnHeader = ({ section: { title } }) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabel}>{title}</Text>
      </View>
    );
  };

  return (
    <>
      <HeaderLayout
        headerCenterLabel={'Transaction History'}
        backgroundColor={ORANGE}
      />
      <View style={styles.container}>
        <SectionList
          sections={groupDataByDate(transactions)}
          keyExtractor={(item: Transaction, index: number) =>
            item.id + index.toString()
          }
          renderItem={renderTxnHistoryContent}
          renderSectionHeader={renderTxnHeader}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  trxHistoryDesc: {
    // textAlign: 'left',
  },
  label: {
    lineHeight: 24,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 14,
    color: BLACK,
  },
  trxHistoryAmount: {
    // textAlign: 'right',
    // flex: 1,
  },

  headerContainer: {
    backgroundColor: '#d8d8d8',
    flexDirection: 'row',
    borderRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  headerLabel: {
    lineHeight: 24,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 14,
    color: BLACK,
  },
});

export default TransactionHistoryScreen;
