import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
// import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
        />
        {/* <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
