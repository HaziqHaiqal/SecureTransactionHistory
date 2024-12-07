import React, { useEffect, useState } from 'react';
import { groupBy } from 'lodash';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SectionList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Transaction } from '../types/Transaction';
import { BLACK, ORANGE, GREEN, RED, WHITE } from '../constant/colors';
import HeaderLayout from '../components/HeaderLayout';
import { getTransactions } from '../data/transactions';
import moment from 'moment';
import { authenticateWithBiometrics } from '../utils/biometrics';
import Assets from '../assets';
import { NavigationProp } from '../types/RootStackParamList';

type Props = {
  navigation: NavigationProp<'TransactionDetail'>;
};

const TransactionHistoryScreen = ({ navigation }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async (): Promise<void> => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch transactions.');
    }
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const toggleAmountVisibility = async (): Promise<void> => {
    const authenticated = await authenticateWithBiometrics();
    if (authenticated) {
      setShowAmounts(!showAmounts);
    }
  };

  const groupDataByDate = (
    data: Transaction[],
  ): { title: string; data: Transaction[] }[] => {
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

  const renderTxnHistoryContent = ({
    item,
  }: {
    item: Transaction;
  }): JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() =>
          navigation.navigate('TransactionDetail', { transaction: item })
        }>
        <View style={styles.trxHistoryDesc}>
          <Text style={styles.label}>{item?.description}</Text>
          <Text style={styles.label}>
            {moment(item.date).format('DD MMM YYYY')}
          </Text>
        </View>
        <View style={styles.trxHistoryAmount}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                styles.label,
                {
                  color: showAmounts
                    ? item?.type === 'credit'
                      ? RED
                      : GREEN
                    : '#A9A9A9',
                },
              ]}>
              {showAmounts
                ? `${item?.type === 'credit' ? '-' : ''}${item?.currency} ${
                    item?.amount
                  }`
                : 'RM *****'}
            </Text>
            <TouchableOpacity onPress={toggleAmountVisibility}>
              <Image
                source={Assets.icEyeClose}
                style={{ marginLeft: 8, width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTxnHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }): JSX.Element => {
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
            item.transactionId + index.toString()
          }
          renderItem={renderTxnHistoryContent}
          renderSectionHeader={renderTxnHeader}
          refreshing={refreshing}
          onRefresh={handleRefresh}
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
    justifyContent: 'center',
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
