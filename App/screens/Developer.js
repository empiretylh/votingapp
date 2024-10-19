/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import { useCardAnimation } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  Vibration,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { IMAGE } from '../Data/data';

import PersonItem from './components/personItem';
import Clipboard from '@react-native-clipboard/clipboard';

const Home = () => {
  const array = Array.from({ length: 10 }, (_, i) => i + 1);

  const copyToClipboard = () => {
    Clipboard.setString('09699227094');
    ToastAndroid.show('Copied to Clipboard', ToastAndroid.SHORT);
    Vibration.vibrate(150);
  };

  // https://www.linkedin.com/in/thura-lin-htut-042175249

  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
    
      <Text style={{ fontFamily: 'Roboto-Bold', color: 'black', fontSize: 18, marginTop: 5 }}>
        Developer Info
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Image
          source={IMAGE.thura}
          style={{ width: 100, height: 100, borderRadius: 100 }}
          resizeMode="contain"
        />
        <Text
          style={{ color: 'black', fontFamily: 'Roboto-Black', fontSize: 19 }}>
          Thura Lin Htut
        </Text>
        <Text style={{ fontFamily: 'Roboto-Regular', color: '#4d4e4f' }}>
          Github Username: empiretylh
        </Text>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.github.com/empiretylh')
            }>
            <Image source={IMAGE.ic_github} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/in/thura-lin-htut-042175249',
              )
            }>
            <Image source={IMAGE.ic_linkedin} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() =>
              Linking.openURL(
                'fb://facewebmodal/f?href=https://www.facebook.com/thuralinhtut.developer?mibextid=ZbWKwL',
              )
            }>
            <Image source={IMAGE.ic_fb} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() =>
              Linking.openURL('instagram://user?username=thuralinhtut__')
            }>
            <Image source={IMAGE.ic_ig} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text
          style={{
            flex: 1,
            textAlign: 'justify',
            color: '#4d4e4f',
            marginTop: 10,
          }}>
          {'    '}I developed a voting system consisting of an Android app, an
          Admin panel and a Server. I have been working on this project since
          December 2022, and the code is available on my GitHub account as open
          source, so you can edit it to improve the system further. There is a
          summary of the information that I used to develop the voting app.
        </Text>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: 'Roboto-Black', color: 'black', fontSize: 20
            }}>
            App Info
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.cell}>
              <Text style={styles.text}>Mobile App</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>JavaScript (React Native)</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.cell}>
              <Text style={styles.text}>Admin Panel</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>HTML, CSS, JavaScript (React)</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.cell}>
              <Text style={styles.text}>Backend Server</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>Python (Django)</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.cell}>
              <Text style={styles.text}>Database</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>SQLite3</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.cell}>
              <Text style={styles.text}>UI/UX</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>Figma, PhotoShop</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ padding: 10, flex: 1, alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>Copyright 2023 - {new Date().getFullYear()} | Apache License</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#4d4e4f',
    borderWidth: 1,
    marginTop: 2,
    padding: 5,
    minHeight: 70,
  },

  text: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },

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
