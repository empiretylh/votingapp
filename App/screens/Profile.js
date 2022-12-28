/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React,{useMemo,useState,useContext} from 'react';
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
  Dimensions,
  Linking,
} from 'react-native';
import {IMAGE} from '../Data/data';

import PersonItem from './components/personItem';
import axios from 'axios'

import {CodeContext, NameIMEIContext, LoadingContext,DataContext} from '../context/context';
const windowWidth = Dimensions.get('window').width;
const Home = ({navigation, route}) => {
  const array = Array.from({length: 10}, (_, i) => i + 1);

  const {data} = route.params;

  const OpenFacebook = link => {
    let user = 'https://www.facebook.com/khin.c.tun.102';
    Linking.openURL(`fb://facewebmodal/f?href={user}`);
  };

  const OpenInstagram = username => {
    Linking.openURL('instagram://user?username=' + username);
  };


  const {v_code, setVCode, RemoveCode} = useContext(CodeContext);
  const {name_IMEI, setName_IMEI, setName_ID, Remove_NameID} =
    useContext(NameIMEIContext);
  const {showLoading, setShowLoading,IsVote, setIsVote,VoteQueen,VoteKing,UVK,UVQ} = useContext(LoadingContext);

  const {votedking,votedqueen} = useContext(DataContext);


  const Vote = data => {
    if (data.is_male) {

      VoteKing.mutate({
        votingcode: v_code,
        kingid: data.id,
        deviceid: name_IMEI.device_id,
      })
    } else {
      VoteQueen.mutate({
        votingcode: v_code,
        queenid: data.id,
        deviceid: name_IMEI.device_id,
      });
    }
  };

  const UnVote = data => {
    if (data.is_male) {
      UVK.mutate({
        votingcode: v_code,
        deviceid: name_IMEI.device_id,
      });
    } else {
      UVQ.mutate({
        votingcode: v_code,
        deviceid: name_IMEI.device_id,
      });
    }
  };

  const renderImage = ({item}) => (
    <View style={{padding: 10, height: 250}}>
      <Image
        source={{
          uri: axios.defaults.baseURL + item.image,
        }}
        style={{width: windowWidth - 20, height: 250, borderRadius: 25}}
        resizeMode={'cover'}
      />
      <Text
        style={{
          fontFamily: 'Roboto-Regular',
          color: 'white',
          position: 'absolute',
          bottom: 0,
          right: 20,
        }}>
        Swipe right to see next photo >
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={data.is_male ? IMAGE.boybg : IMAGE.girlbg}
      style={{flex: 1}}>
      <View style={styles.topView}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            // backgroundColor:'blue',
          }}>
          <Image
            source={
              data && data.profileimage
                ? {uri: axios.defaults.baseURL + data.profileimage}
                : IMAGE.person1
            }
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
                fontSize: 23,
              }}>
              {data && data.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto-Light',
                color: 'black',
                fontSize: 20,
              }}>
              {data && data.year}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TouchableOpacity onPress={() => OpenFacebook(data.fblink)}>
                <Image
                  source={IMAGE.fbicon}
                  style={{width: 28, height: 28, borderRadius: 28}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => OpenInstagram(data.iglink)}>
                <Image
                  source={IMAGE.igicon}
                  style={{width: 28, height: 28, borderRadius: 28}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={data.is_male ? IMAGE.king_crown : IMAGE.queen_crown}
            style={{
              position: 'absolute',
              width: 40,
              height: 40,
              right: 0,
              top: 0,
            }}
          />
        </View>
      </View>

      <FlatList
        data={data.images}
        contentContainerStyle={{
          flexDirection: 'row',
          marginTop: 10,
        }}
        renderItem={renderImage}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToInterval={windowWidth}
        bounces={false}
      />

      <View style={{padding: 8, marginTop: 0}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF5F5F',
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  

          onPress={()=>{
            Vote(data);
          }}
          >
          <Image
            source={IMAGE.hearticon}
            style={{width: 30, height: 30, marginRight: 8,tintColor:'white'}}
          />
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
            flexDirection: 'row',
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={IMAGE.backicon}
            style={{width: 30, height: 30, marginRight: 8, tintColor: '#ffff'}}
          />
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
    backgroundColor: '#8AD4D2',
    height: 200,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    shadowColor: '#52006A',
    elevation: 15,
    padding: 10,
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
