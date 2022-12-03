/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ImageBackground,StyleSheet} from 'react-native';
import {IMAGE} from '../Data/data';

const Home = () => {
  return (
    <ImageBackground source={IMAGE.mainbg} style={{flex: 1}}>
      <View
        style={{
          height: 256,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 15,
        }}>
            <Text>UCSD VOTING</Text>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    
})

export default Home;
