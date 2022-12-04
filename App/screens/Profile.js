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
  FlatList,
  ScrollView,
} from 'react-native';
import {IMAGE} from '../Data/data';

import PersonItem from './components/personItem';

const Home = () => {
  const array = Array.from({length: 10}, (_, i) => i + 1);

  return (
    <ImageBackground source={IMAGE.girlbg} style={{flex: 1}}>
      <View style={styles.topView}>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Image
            source={IMAGE.person1}
            style={{
              width: 130,
              height: 130,
              borderRadius: 130,
              borderColor: 'white',
              borderWidth: 3,
            }}
          />
          <View style={{marginLeft: 10, flexDirection: 'column'}}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                color: 'black',
                fontSize: 25,
              }}>
              Hein Min Myat
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                color: 'black',
                fontSize: 20,
              }}>
              1CST_T001
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TouchableOpacity style={{}}>
                <Image
                  source={IMAGE.fbicon}
                  style={{width: 28, height: 28, borderRadius: 28}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 5}}>
                <Image
                  source={IMAGE.igicon}
                  style={{width: 28, height: 28, borderRadius: 28}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <FlatList/>
      </View>
      <View style={{padding: 8, marginTop: 0}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF5F5F',
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'row',
          }}>
          <Image source={IMAGE.hearticon} style={{width:30,height:30, marginRight:8}}/>
          <Text
            style={{color: 'white', fontFamily: 'Roboto-Bold', fontSize: 30}}>
            VOTE
          </Text>
        </TouchableOpacity>
         <TouchableOpacity
          style={{
            backgroundColor: '#FFBF5F',
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'row',
            marginTop:10,
          }}>
          <Image source={IMAGE.hearticon} style={{width:30,height:30, marginRight:8}}/>
          <Text
            style={{color: 'white', fontFamily: 'Roboto-Bold', fontSize: 30}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#7FF1C8',
    height: 200,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    opacity: 0.8,
    shadowColor: '#52006A',
    elevation: 15,
    padding: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
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
