/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React, {useContext, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {IMAGE} from '../Data/data';

import PersonItem from './components/personItem';
import database from '../Data/database';
import {useQuery} from 'react-query';

import {CodeContext, NameIMEIContext} from '../context/context';

const Home = ({navigation}) => {
  const array = Array.from({length: 20}, (_, i) => i + 1);

  const {v_code, setVCode, RemoveCode} = useContext(CodeContext);
  const {name_IMEI, setName_IMEI, setName_ID, Remove_NameID} =
    useContext(NameIMEIContext);

  const query = useQuery({
    queryKey: ['checkcode', v_code],
    queryFn: database.getVoting,
  });

  const data = useMemo(() => {
    if (query.data) {
      const sel_k = query.data.data.sel_king;
      const sel_q = query.data.data.sel_queen;
      const all = sel_k.concat(sel_q);
      const sort = all.sort((a, b) => (a.name > b.name ? 1 : -1));

      return sort;
    }
  }, [query.data]);

  const openProfile = data => {
    navigation.navigate('profile', {
      data: data,
    });
  };

  return (
    <ImageBackground source={IMAGE.mainbg} style={{flex: 1}}>
      <View style={styles.topView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.logotext}>UCSD VOTING</Text>
          <TouchableOpacity
            onPress={() => {
              RemoveCode();
              Remove_NameID();
            }}>
            <Image
              source={IMAGE.icon_question}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={IMAGE.ucsd}
            style={{
              width: 120,
              height: 120,
            }}
          />
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              color: 'black',
              fontSize: 15,
            }}>
            University of Computer Studies,Dawei
          </Text>
        </View>
      </View>
      <View style={{padding: 8, marginTop: 15, flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            backgroundColor: '#fff',
            opacity: 0.84,
            padding: 2,
            paddingLeft: 10,
            borderRadius: 15,
          }}>
          <TextInput
            style={styles.searchtextbar}
            placeholder="Search With Name"
          />
          <TouchableOpacity style={{marginRight: 10}}>
            <Image source={IMAGE.icon_search} style={{width: 25, height: 25}} />
          </TouchableOpacity>
        </View>
        {query.is_fetching ? (
          <ActivityIndicator />
        ) : (
          <ScrollView style={{marginTop: 10}}>
            {query.data &&
              data.map((item, index) => <PersonItem key={index} data={item} OpenProfile={openProfile} />)}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#f0f0f0',
    height: 210,
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
