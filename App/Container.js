/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image,StyleSheet} from 'react-native';
import Home from './screens/home';
import King from './screens/King';
import Queen from './screens/Queen';
import Profile from './screens/Profile';
import Sponsor from './screens/Developer';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {IMAGE as I,URL} from './Data/data';
import axios from 'axios';

axios.defaults.baseURL = URL;

console.log(URL)

const Tab = createBottomTabNavigator();
const iconsize = 38;
const hoversize = 65
const topsize = -1;
const Container = () => {
  return (
   
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            padding: 10,
            paddingBottom: 20,
            height: 65,
          },

        }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center',padding:0,margin:0}}>
                  {focused && <View style={{width:'100%',height:hoversize,backgroundColor:'blue',position:'absolute',top:topsize,opacity:0.5}}/>}
          
                <Image source={I.main_icon} style={{width: iconsize, height: iconsize}} />
                <Text style={styles.text}>Main</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen name="king" component={King} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center',padding:0,margin:0}}>
                {focused && <View style={{width:100,height:hoversize,backgroundColor:'blue',position:'absolute',top:topsize,opacity:0.5}}/>}
           <Image source={I.king_crown} style={{width: iconsize, height: iconsize}} />
                <Text style={styles.text}>King</Text>
              </View>
            ),
          }} />
        <Tab.Screen name="queen" component={Queen}  options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center',padding:0,margin:0}}>
            {focused && <View style={{width:100,height:hoversize,backgroundColor:'blue',position:'absolute',top:topsize,opacity:0.5}}/>}
          
                <Image source={I.queen_crown} style={{width: iconsize, height: iconsize}} />
               <Text style={styles.text}>Queen</Text>
              </View>
            ),
          }}/>

        <Tab.Screen name="sponsor" component={Sponsor}  options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center',padding:0,margin:0}}>
                {focused && <View style={{width:100,height:hoversize,backgroundColor:'blue',position:'absolute',top:topsize,opacity:0.5,}}/>}
        
                <Image source={I.sp_icon} style={{width: iconsize, height: iconsize}} />
                <Text style={styles.text}>Developer</Text>
              </View>
            ),
          }}/>
      </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  text:{
    fontFamily:'Roboto-Regular',
    fontSize:10,
    color:'black',
  }
})

export default Container;
