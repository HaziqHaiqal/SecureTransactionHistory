import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HeaderLayout from '../components/HeaderLayout';
import { BLACK, ORANGE, WHITE } from '../constant/colors';
import HeaderBackButton from '../components/Buttons/HeaderBackButton';

const TransactionDetailRow: React.FC<{
  data: Array<{ label: string; value: string }>;
}> = ({ data }) => (
  <View style={{ gap: 16 }}>
    {data?.map(({ label, value }, index) => (
      <View
        key={index}
        style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={styles.textLabel}>{label}</Text>
        <Text style={styles.textValue}>{value}</Text>
      </View>
    ))}
  </View>
);

const TransactionDetailScreen: React.FC = () => {
  const route = useRoute();
  const { transaction } =
    (route.params as {
      transaction: {
        type: string;
        currency: string;
        amount: number;
        date: string;
        description: string;
        status: string;
        transactionId: string;
      };
    }) || {};

  const getTransactionDetails = (): Array<{
    id: string;
    label: string;
    value: string;
  }> => {
    const details = [
      {
        id: 'amount',
        label: 'Amount',
        value: `${transaction?.type === 'credit' ? '-' : ''}${
          transaction?.currency
        } ${transaction?.amount}`,
      },
      {
        id: 'transactionDate',
        label: 'Date',
        value: transaction?.date,
      },
      {
        id: 'description',
        label: 'Description',
        value: transaction?.description,
      },
      {
        id: 'transactionType',
        label: 'Type',
        value: transaction?.type,
      },
      {
        id: 'status',
        label: 'Status',
        value: transaction?.status,
      },
      {
        id: 'transactionId',
        label: 'Transaction ID',
        value: transaction?.transactionId,
      },
    ];

    return details;
  };

  return (
    <>
      <HeaderLayout
        headerLeftElement={<HeaderBackButton />}
        headerCenterLabel={'Transaction Details'}
        backgroundColor={ORANGE}
      />

      <View style={styles.container}>
        <View style={styles.card}>
          <TransactionDetailRow data={getTransactionDetails()} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  card: {
    gap: 8,
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 20,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  textLabel: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: '#333',
  },
  textValue: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: BLACK,
  },
});

export default TransactionDetailScreen;
