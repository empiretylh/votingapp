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
    <ImageBackground source={IMAGE.girlbg} style={{flex: 1}}>
      <View style={styles.topView}>
        <View
          style={{
            flexDirection: 'row',
        
            alignItems: 'center',
          }}>
           <TouchableOpacity>
            <Image
              source={IMAGE.queen_crown}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          <Text style={{...styles.logotext,marginLeft:10}}>Queen Selection</Text>
        </View>
      
      </View>
      <View style={{padding: 8,paddingTop:0, marginTop: 0,flex:1,}}>
      
        <ScrollView style={{marginTop: 5}}>
          {array.map((item, index) => (
            <PersonItem key={index}/>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

// javascript

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
