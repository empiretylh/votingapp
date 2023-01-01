/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {IMAGE} from '../Data/data';

import PersonItem from './components/personItem';

const Home = () => {
  const array = Array.from({length: 10}, (_, i) => i + 1);

  return (
    <ScrollView style={{flex:1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'blue',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: 500,
          }}
        />
        <Image
          source={IMAGE.thura}
          style={{width: 100, height: 100, borderRadius: 100}}
        />
        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            color: 'black',
            fontSize: 18,
          }}>
          Thura Lin Htut
        </Text>
      </View>
      <Text>
        This Voting System is developed by thura lin htut. I started created by{' '}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#f0f0f0',
    height: 80,
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
