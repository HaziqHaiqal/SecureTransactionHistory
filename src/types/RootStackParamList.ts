import { StackNavigationProp } from '@react-navigation/stack';
import { Transaction } from './Transaction';

// Define the root stack param list
export type RootStackParamList = {
  Login: undefined;
  TransactionHistory: undefined;
  TransactionDetail: { transaction: Transaction };
};

// Define a custom type for navigation prop in screen components
export type NavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
