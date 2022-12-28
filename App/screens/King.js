/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React, {useContext,useMemo} from 'react';
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
import {LoadingContext, CodeContext} from '../context/context';
import {useQuery} from 'react-query';
import database from '../Data/database';

const King = ({navigation}) => {
 

  const {showLoading, setShowLoading} = useContext(LoadingContext);
  const {v_code, setVCode, RemoveCode} = useContext(CodeContext);

  const king_query = useQuery(['query', v_code], database.getKing);

  const Refresh = () => {
    king_query.refetch();
  };


  const data = useMemo(() => {
    if (king_query.data) {
     
      const all = king_query.data.data;
      const sort = all.sort((a, b) => (a.name > b.name ? 1 : -1));

      return sort;
    }
  }, [king_query.data]);

  const openProfile = data => {
    navigation.navigate('profile', {
      data: data,
    });
  };


  return (
    <ImageBackground source={IMAGE.boybg} style={{flex: 1}}>
      <View style={styles.topView}>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => Refresh()}>
            <Image source={IMAGE.king_crown} style={{width: 50, height: 50}} />
          </TouchableOpacity>
          <Text style={{...styles.logotext, marginLeft: 10}}>
            King Selection
          </Text>
        </View>
      </View>
      <View style={{padding: 8, paddingTop: 0, marginTop: 0, flex: 1}}>
        {king_query.isFetching ? (
          <ActivityIndicator size={50} color={'white'} />
        ) : (
         <>
           <ScrollView>
            {king_query.data && data.map((item, index) => <PersonItem key={index} data={item} OpenProfile={openProfile} />)
             
            }
             </ScrollView>
        </>
          
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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

export default King;
