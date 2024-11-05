/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React, {useRef, useContext, useMemo} from 'react';

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
import {useQuery} from 'react-query';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LoadingContext, CodeContext} from '../context/context';
const s_width = Dimensions.get('window').width;

const Home = ({navigation}) => {
  const array = Array.from({length: 20}, (_, i) => i + 1);

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

  const checkCodeNsetCode = () => {
    setShowLoading(true);
    checkCode.refetch();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#f0f0f0f0',
        }}>
        <View style={{padding: 18, alignItems: 'center', flex: 1}}>
          <Image
            source={I.king_crown}
            style={{width: '100%', height: 250}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              color: 'black',
              fontSize: 17,
            }}>
            Youth Choice Voting System
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Light',
              color: 'black',
              fontSize: 15,
            }}>
            Developed By EMPIRE
          </Text>
          <View
            style={{
              width: '100%',
              padding: 0.5,
              backgroundColor: '#D9D9D9',
              marginTop: 10,
            }}
          />
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
              navigation.navigate('qrcodescreen');
            }}>
            <Image
              source={I.scanicon}
              style={{
                width: 30,
                height: 30,
                tintColor: 'white',
                marginRight: 5,
              }}
            />
            <Text style={{...styles.logotext, fontSize: 20, color: 'white'}}>
              Scan QR Code
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Roboto-Light',
              color: 'black',
              fontSize: 20,
              marginTop: 10,
            }}>
            OR
          </Text>

          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 18,
              marginTop: 10,
              marginBottom: 5,
              color: 'black',
            }}>
            Type Code
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
            placeholder={'Code - XXXXX'}
            placeholderTextColor="#4d4e4f"
            keyboardType={'numeric'}
            maxLength={5}
            onChangeText={e => (code.current = e)}
          />
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
            onPress={() => checkCodeNsetCode()}>
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
              Let's Connect
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
