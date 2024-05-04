import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { authenticateWithBiometrics } from '../services/auth';
import { NavigationProp } from '../types/RootStackParamList';
import { BLACK_500 } from '../constant/colors';

type Props = {
  navigation: NavigationProp<'TransactionHistory'>;
};

const LoginScreen = ({ navigation }: Props) => {
  const [showModal, setShowModal] = useState(true);

  const handleBiometricValidation = async () => {
    setShowModal(false);
    const authenticated = await authenticateWithBiometrics();
    console.log('Authenticated >> ', authenticated);

    if (authenticated) {
      navigation.navigate('TransactionHistory');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Click Continue to proceed</Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleBiometricValidation}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: BLACK_500,
  },
  modalContent: {
    backgroundColor: 'white',
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
