import { Alert, Linking, BackHandler } from 'react-native';
import * as Biometrics from 'react-native-biometrics';

export const authenticateWithBiometrics = async (): Promise<boolean> => {
  try {
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
          {
            text: 'Cancel',
            onPress: () => {
              /* Close modal */
            },
            style: 'cancel',
          },
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
      Alert.alert('Biometric authentication canceled', 'Exiting the app.', [
        {
          text: 'OK',
          onPress: () => exitApp(),
        },
      ]);
      return false;
    } else {
      Alert.alert('Biometric authentication failed');
      return false;
    }
  } catch (err) {
    console.log('Biometric authentication error:', err);
    Alert.alert(
      'Biometric authentication error',
      'User has denied the use of biometry for this app.',
    );
    return false;
  }
};

const exitApp = () => {
  BackHandler.exitApp();
};
