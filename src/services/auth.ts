import { Alert, Linking, BackHandler } from 'react-native';
import * as Biometrics from 'react-native-biometrics';

export const authenticateWithBiometrics = async (): Promise<boolean> => {
  try {
    console.tron.log('Biometrics >> ', Biometrics);
    const { available, biometryType } =
      await Biometrics.ReactNativeBiometricsLegacy.isSensorAvailable();
    console.log(
      'Biometrics available:',
      available,
      'Biometry type:',
      biometryType,
    );

    if (!available) {
      Alert.alert(
        'Biometrics not available',
        'Please set up biometrics (Face ID / Fingerprint) in your device settings.',
        [
          { text: 'Cancel', onPress: () => exitApp(), style: 'cancel' },
          {
            text: 'Go to Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
      );
      return false;
    }

    const promptMessage =
      biometryType === Biometrics.BiometryTypes.FaceID
        ? 'Face ID'
        : 'Fingerprint';
    const resultObject =
      await Biometrics.ReactNativeBiometricsLegacy.simplePrompt({
        promptMessage,
      });

    const { success, error } = resultObject;

    if (success) {
      console.log('Biometric authentication successful');
      return true;
    } else if (error && error === 'CANCELED') {
      console.log('Biometric authentication canceled');
      Alert.alert('Biometric authentication canceled', 'Exiting the app.', [
        {
          text: 'OK',
          onPress: () => exitApp(),
        },
      ]);
      return false;
    } else {
      console.log('Biometric authentication failed');
      Alert.alert('Biometric authentication failed');
      return false;
    }
  } catch (err) {
    console.log('Biometric authentication error:', err);
    Alert.alert('Biometric authentication error', `${err}`);
    return false;
  }
};

const exitApp = () => {
  BackHandler.exitApp(); // Exit the app when called
};
