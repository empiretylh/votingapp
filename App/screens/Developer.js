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
      <View>

        <Text
          style={{
            fontSize: 19,
            fontFamily: 'Roboto-Bold',
            color: 'red',
            textAlign: 'center',
          }}>
          Do you want to become a sponsor of this app?
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#0f0f0f',
            textAlign: 'auto',
            marginTop: 10,
          }}>
          You can sponsor this app, your name will be shown in the main page of this app. If you want to sponsor this app, please make payment to this KBZ account or developer and contact me.
        </Text>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#006eb8',
              padding: 10,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}
            onPress={() => {
              Linking.openURL('tg://resolve?domain=thuralinhtut')
            }}
          >
            <Image source={IMAGE.telegram} style={{ width: 25, height: 25, marginRight: 15 }} />
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Contact Developer on Telegram</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#636261',
            flexDirection: 'row',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            paddingLeft: 10,
            marginTop: 10
          }}>
          <Text
            style={{
              letterSpacing: 0.5,
              fontSize: 15,
              padding: 4,
              fontWeight: 'bold',
              flex: 1,
              color: 'white',
            }}
            selectable={true}>
            {'09699227094 (Mg Thura Lin Htut)'}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#f53354', borderRadius: 1, borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              padding: 5,

            }}
            onPress={copyToClipboard}>
            <Text
              style={{
                fontSize: 15,

                color: 'white',
                fontWeight: 'bold',
              }}>
              Copy
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 15, padding: 5 }}>
            <Image source={IMAGE.rank1} style={{ width: 50, height: 50 }} />
            <View>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#0f0f0f', marginLeft: 10 }}>Bronze</Text>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#111e99', marginLeft: 10 }}>1,000 Ks - 3,000 Ks</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 15, padding: 5, marginTop: 5 }}>
            <Image source={IMAGE.rank2} style={{ width: 50, height: 50 }} />
            <View>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#0f0f0f', marginLeft: 10 }}>Silver</Text>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#111e99', marginLeft: 10 }}>2,000 Ks - 4,000 Ks</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 15, padding: 5, marginTop: 5 }}>
            <Image source={IMAGE.rank3} style={{ width: 50, height: 50 }} />
            <View>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#0f0f0f', marginLeft: 10 }}>Gold</Text>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#111e99', marginLeft: 10 }}>5,000 Ks - 6,000 Ks</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 15, padding: 5, marginTop: 5 }}>
            <Image source={IMAGE.rank4} style={{ width: 50, height: 50 }} />
            <View>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#0f0f0f', marginLeft: 10 }}>Platinum</Text>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#111e99', marginLeft: 10 }}>8,000 Ks - 9,000 Ks</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 15, padding: 5, marginTop: 5 }}>
            <Image source={IMAGE.rank5} style={{ width: 50, height: 50 }} />
            <View>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#0f0f0f', marginLeft: 10 }}>Diamond</Text>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#111e99', marginLeft: 10 }}>Above 10,000 Ks </Text>
            </View>
          </View>

        </View>
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        marginTop:10,
        height: 2,
        backgroundColor: '#abd9b7'
      }} />
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
