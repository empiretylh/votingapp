/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {IMAGE as I} from '../../Data/data';

const PersonItem = () => {
  return (
    <View style={styles.view}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Image
            source={I.person1}
            style={{
              width: 70,
              height: 70,
              borderRadius: 70,
              borderColor: 'red',
              borderWidth: 2,
            }}
          />
          <View style={{marginLeft: 8, marginTop: 2}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>Mg Thura Lin Htut</Text>
              <Image
                source={I.icon_tickmark}
                style={{width: 20, height: 20, marginLeft: 5}}
              />
            </View>
            <Text style={styles.text}>1CST</Text>
            <TouchableOpacity>
              <Text style={styles.text}>See His Photos ></Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View>
          <Image
            source={I.king_crown}
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: 10,
              backgroundColor: '#FF5F5F',
              borderRadius: 15,
              width: 100,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontFamily: 'Roboto-Bold', color: 'white', fontSize: 15}}>
              Vote
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginTop: 8,
  },
  name: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
    fontSize: 15,
  },

  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    color: 'black',
  },
});

export default PersonItem;
