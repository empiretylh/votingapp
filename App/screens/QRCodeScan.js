/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  StyleSheet,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LoadingContext, CodeContext} from '../context/context';
import database from '../Data/database';
import {useQuery} from 'react-query';
import {IMAGE} from '../Data/data';

const qrcodesize = Dimensions.get('window').width - 40;
const QRCodeScreen = ({navigation}) => {
  const code = useRef(0);

  const {showLoading, setShowLoading} = useContext(LoadingContext);
  const {v_code, setVCode} = useContext(CodeContext);

  const checkCode = useQuery(['checkcode', code.current], database.checkCode, {
    onSuccess: e => {
      if (e.data === 1) {
        setVCode(code.current);
        EncryptedStorage.setItem('temp_code', code.current);
      } else {
        if (code.current) {
          alert('This Code Is Invalid');
        }
      }
      setShowLoading(false);
    },
  });

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
    code.current = e.data;
    checkCode.refetch();
  };

  return (
    <>
      <TouchableOpacity
        style={{position: 'absolute', top: 10, left: 10}}
        onPress={() => navigation.goBack()}>
        <Image
          source={IMAGE.backicon}
          style={{width: 25, height: 25}}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <QRCodeScanner
        onRead={onSuccess}
        topContent={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',

              marginBottom: 10,
            }}>
            <Image source={IMAGE.king_crown} style={{width: 50, height: 50}} />
            <Text style={styles.centerText}>
              Scan the QRCode that specially created for the voting system.
            </Text>
          </View>
        }
        bottomContent={
          <View>
            <Text style={{color: 'black', fontFamily: 'Roboto-Regular'}}>
              If this QR code doesn't work on your devices, Use the voting code
              instead.
            </Text>
          </View>
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
        <Image
          source={IMAGE.icon_scan}
          style={{
            width: qrcodesize,
            height: qrcodesize,
            tintColor: '#fff',
          }}
        />
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
    paddingLeft: 30,
    paddingRight: 30,
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
