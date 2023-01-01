/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const QRCodeScreen = ({navigation}) => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Voting App',
          message:
            "Hey's I want to use your camera :)" +
            'So you can capture QR Code.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    console.log('I will request Camera Permissions');
    requestCameraPermission();
  }, []);

  const onSuccess = e => {
    console.log(e.data);
  };
  return (
    <>
      <QRCodeScanner
        onRead={onSuccess}
        topContent={
          <Text style={styles.centerText}>
            Scan QRCode, that code specificilized for voting system
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white'}}>Scan QRCode</Text>
      </View>
    </>
  );
};
export default QRCodeScreen;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: 'black',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
