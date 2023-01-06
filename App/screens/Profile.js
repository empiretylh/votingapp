/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React, {useMemo, useState, useContext} from 'react';
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
import axios from 'axios';

import {
  CodeContext,
  NameIMEIContext,
  LoadingContext,
  EndTimeContext,
  DataContext,
} from '../context/context';
const windowWidth = Dimensions.get('window').width;
const Home = ({navigation, route}) => {
  const array = Array.from({length: 10}, (_, i) => i + 1);

  const {data} = route.params;

  const OpenFacebook = link => {
    let user =link;
    console.log(user);

    var urlParts = user.split('=');

    var fbId = urlParts[urlParts.length-1];

    console.log(fbId)



    if( parseInt(fbId)){
      console.log('ID Open')
     Linking.openURL('fb://profile/'+fbId)
    }else{
      console.log('WEb open')
      Linking.openURL('fb://facewebmodal/f?href='+fbId);
    }
  };

  const OpenInstagram = username => {
    Linking.openURL('instagram://user?username=' + username);
  };

  const {isTimeUp, setIsTimeUp} = useContext(EndTimeContext);

  const {v_code, setVCode, RemoveCode} = useContext(CodeContext);
  const {name_IMEI, setName_IMEI, setName_ID, Remove_NameID} =
    useContext(NameIMEIContext);
  const {
    showLoading,
    setShowLoading,
    IsVote,
    setIsVote,
    VoteQueen,
    VoteKing,
    UVK,
    UVKSuccess,
    UVQ,
  } = useContext(LoadingContext);

  const {votedking, votedqueen} = useContext(DataContext);

  const KingVotedId = useMemo(() => {
    if (votedking.data) {
      return votedking.data.data !== 0 && votedking.data.data.selection;
    }

    return 0;
  }, [votedking.data]);

  const QueenVotedId = useMemo(() => {
    if (votedqueen.data) {
      console.log(votedqueen.data.data);
      return votedqueen.data.data !== 0 && votedqueen.data.data.selection;
    }

    return 0;
  }, [votedqueen.data]);

  const [showVote, setShowVote] = useState(false);

  const Vote = data => {
    if (data.is_male) {
      if (KingVotedId) {
        UVK.mutate({
          votingcode: v_code,
          deviceid: name_IMEI.device_id,
        });
        setTimeout(() => {
          VoteKing.mutate({
            votingcode: v_code,
            kingid: data.id,
            deviceid: name_IMEI.device_id,
          });
        }, 1000);
      } else {
        VoteKing.mutate({
          votingcode: v_code,
          kingid: data.id,
          deviceid: name_IMEI.device_id,
        });
      }
    } else {
      if (QueenVotedId) {
        UVQ.mutate({
          votingcode: v_code,
          deviceid: name_IMEI.device_id,
        });
        setTimeout(() => {
          VoteQueen.mutate({
            votingcode: v_code,
            queenid: data.id,
            deviceid: name_IMEI.device_id,
          });
        }, 1000);
      } else {
        VoteQueen.mutate({
          votingcode: v_code,
          queenid: data.id,
          deviceid: name_IMEI.device_id,
        });
      }
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
        {!isTimeUp ? (
          <TouchableOpacity
            style={{
              backgroundColor: data.is_male
                ? KingVotedId
                  ? KingVotedId === data.id
                    ? 'red'
                    : '#FF5F5F'
                  : '#FF5F5F'
                : QueenVotedId
                ? QueenVotedId === data.id
                  ? 'red'
                  : '#FF5F5F'
                : '#FF5F5F',
              padding: 10,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={() => {
              if (data.is_male) {
                if (KingVotedId && KingVotedId === data.id) {
                  UnVote(data);
                } else {
                  if (KingVotedId) {
                    setShowVote(true);
                  } else {
                    Vote(data);
                  }
                }
              } else {
                if (QueenVotedId && QueenVotedId === data.id) {
                  UnVote(data);
                } else {
                  if (QueenVotedId) {
                    setShowVote(true);
                  } else {
                    Vote(data);
                  }
                }
              }
            }}>
            <Image
              source={IMAGE.hearticon}
              style={{
                width: 30,
                height: 30,
                marginRight: 8,
                tintColor: 'white',
              }}
            />
            <Text
              style={{color: 'white', fontFamily: 'Roboto-Bold', fontSize: 30}}>
              {data.is_male
                ? KingVotedId
                  ? KingVotedId === data.id
                    ? 'Cancel Vote'
                    : 'Vote'
                  : 'Vote'
                : QueenVotedId
                ? QueenVotedId === data.id
                  ? 'Cancel Vote'
                  : 'Vote'
                : 'Vote'}
            </Text>
          </TouchableOpacity>
        ) : null}
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
      {showVote && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '100%',

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 15,
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 15,
              shadowColor: 'black',

              elevation: 5,
            }}>
            <Text style={{fontSize: 15, color: 'black'}}>
              If you want to vote for {data.name}, the first person you voted
              for will automatically no longer vote.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 10,
              }}
              onPress={() => {
                setShowVote(false);
                Vote(data);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 20,
                }}>
                It' OK Vote Now.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
