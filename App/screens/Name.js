/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React, {useRef, useContext, useMemo, useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from 'react-native';
import {IMAGE as I} from '../Data/data';

import PersonItem from './components/personItem';
import database from '../Data/database';
import {useQuery, useMutation} from 'react-query';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LoadingContext, CodeContext, NameIMEIContext} from '../context/context';
import DeviceInfo from 'react-native-device-info';
const s_width = Dimensions.get('window').width;

const Home = () => {
  const array = Array.from({length: 20}, (_, i) => i + 1);

  const yourname = useRef(0);

  const {showLoading, setShowLoading} = useContext(LoadingContext);
  const {v_code, setVCode} = useContext(CodeContext);
  const {name_IMEI, setName_IMEI, setName_ID} = useContext(NameIMEIContext);

  const [device_id, setDeviceid] = useState('');

  const checkCodeNsetCode = () => {
    setShowLoading(true);
    checkCode.refetch();
  };

  useEffect(() => {
    const GetID = async () => {
      const result = await DeviceInfo.getUniqueId();

      setDeviceid(result);
    };

    GetID();
  }, [device_id]);

  const RegisterDevice = useMutation(database.registerDevice, {
    onSuccess: () => {
      setName_ID({
        device_id: device_id,
        name: yourname.id,
      });
      setShowLoading(false);
    },
    onMutate: () => {
      setShowLoading(true);
    },
    onError: () => {
      setShowLoading(false);
    },
  });

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#f0f0f0f0',
        }}>
        <View style={{padding: 18, flex: 1}}>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 18,
              marginTop: 10,
              marginBottom: 5,
              color: 'black',
            }}>
            Your Name
          </Text>
          <TextInput
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#D9D9D9',
              borderRadius: 15,
              paddingLeft: 10,
              fontFamily: 'Roboto-Light',
              color: 'black',
              fontSize: 20,
            }}
            placeholder={'Set Your Name'}
            onChangeText={e => (yourname.current = e)}
          />

          <Text style={{fontFamily: 'Roboto-Regular', color: 'black'}}>
            Your Device ID is {device_id}
          </Text>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#4C20FA',
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 15,
              marginTop: 10,
            }}
            onPress={() => {
              if (yourname.current) {
                RegisterDevice.mutate({
                  deviceid: device_id,
                  name: yourname.current,
                  votingcode: v_code,
                });
              } else {
                alert('Please Fill Name')
              }
            }}>
            <Image
              source={I.starticon}
              style={{
                width: 30,
                height: 30,
                tintColor: 'white',
                marginRight: 5,
              }}
            />
            <Text style={{...styles.logotext, fontSize: 20, color: 'white'}}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#f0f0f0',
    height: 210,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    opacity: 0.9,
    shadowColor: '#52006A',
    elevation: 15,
    padding: 10,
    position: 'relative',
  },

  logotext: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    color: '#000',
  },
  searchtextbar: {
    flex: 1,

    minHeight: 53,
    borderRadius: 15,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});

export default Home;
