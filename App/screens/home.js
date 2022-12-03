/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import { useCardAnimation } from '@react-navigation/stack';
import React from 'react';
import {View, Text, ImageBackground, StyleSheet,Image} from 'react-native';
import {IMAGE} from '../Data/data';

const Home = () => {
  return (
    <ImageBackground source={IMAGE.mainbg} style={{flex: 1}}>
      <View style={styles.topView}>
        <Text>UCSD VOTING</Text>
        <Image source={IMAGE.ucsd} style={{
            width:100,
            height:100,
        }}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: 'white',
    height: 256,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    opacity:0.9,
    shadowColor: '#52006A',  
    elevation: 15,  
  },

  logotext:{

  }
});

export default Home;
