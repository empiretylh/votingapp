/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import Home from './screens/home';
import King from './screens/King';
import Queen from './screens/Queen';
import Profile from './screens/Profile';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Container = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Home' component={Home}/>
          <Tab.Screen name="Settings" component={King} />
  
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default Container;
