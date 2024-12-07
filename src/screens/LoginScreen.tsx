import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { authenticateWithBiometrics } from '../utils/biometrics';
import { NavigationProp } from '../types/RootStackParamList';
import Assets from '../assets';

type Props = {
  navigation: NavigationProp<'TransactionHistory'>;
};

const LoginScreen = ({ navigation }: Props) => {
  const [isBiometricFailed, setIsBiometricFailed] = useState(false);

  const [enteredPin, setEnteredPin] = useState('');

  // Simulated correct PIN for testing purposes
  const CORRECT_PIN = '111111';

  useEffect(() => {
    handleBiometricAuthentication();
  }, []);

  const handleBiometricAuthentication = async () => {
    const authenticated = await authenticateWithBiometrics();
    if (!authenticated) {
      setIsBiometricFailed(true);
    } else {
      navigation.replace('TransactionHistory');
    }
  };

  const handlePinInput = (digit: string) => {
    console.log('check PIN input >> ', digit);
    if (enteredPin.length < 6) {
      const fullPin = enteredPin + digit;
      setEnteredPin(fullPin);

      if (fullPin.length === 6) {
        if (fullPin === CORRECT_PIN) {
          navigation.replace('TransactionHistory');
        } else {
          Alert.alert('Error', 'Incorrect PIN. Please try again.');
          setEnteredPin('');
        }
      }
    }
  };

  const handleDeletePin = () => {
    setEnteredPin(prev => prev.slice(0, -1));
  };

  const renderPinDots = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          {
            backgroundColor: index < enteredPin.length ? '#FFFFFF' : '#6E6680',
          },
        ]}
      />
    ));
  };

  if (!isBiometricFailed) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Authenticating...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, Haziq Haiqal</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>

      <View style={styles.pinContainer}>{renderPinDots()}</View>

      <View style={styles.keypadContainer}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'faceId', '0', 'delete']
          .reduce((rows: any, key: string, index: number) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(
              key === 'delete' ? (
                <TouchableOpacity
                  key={index}
                  onPress={handleDeletePin}
                  style={styles.keypadButton}>
                  <Text style={styles.keypadText}>⌫</Text>
                </TouchableOpacity>
              ) : key === 'faceId' ? (
                <TouchableOpacity
                  key={index}
                  style={styles.keypadButton}
                  onPress={handleBiometricAuthentication}>
                  <Image
                    source={Assets.iconFaceId}
                    style={styles.faceIdImage}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePinInput(key)}
                  disabled={key === ''}
                  style={styles.keypadButton}>
                  <Text style={styles.keypadText}>{key}</Text>
                </TouchableOpacity>
              ),
            );
            return rows;
          }, [])
          .map((row: React.ReactNode[], rowIndex: number) => (
            <View key={rowIndex} style={styles.keypadRow}>
              {row}
            </View>
          ))}
      </View>

      <TouchableOpacity style={styles.forgotPinButton}>
        <Text style={styles.forgotPinText}>Forgot PIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 32,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
    backgroundColor: '#6E6680',
  },
  keypadContainer: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  keypadText: {
    fontSize: 32,
    color: '#333333',
    margin: 16,
    textAlign: 'center',
  },
  forgotPinButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotPinText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  faceIdImage: {
    width: 50,
    height: 50,
  },
  keypadButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
