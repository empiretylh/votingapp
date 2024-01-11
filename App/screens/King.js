/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React, {useContext, useMemo} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {IMAGE} from '../Data/data';

import PersonItem from './components/personItem';
import {
  LoadingContext,
  CodeContext,
  DataContext,
  NameIMEIContext,
} from '../context/context';
import {useQuery} from 'react-query';
import database from '../Data/database';

const King = ({navigation}) => {
  const {VoteQueen, VoteKing, UVK, UVQ} = useContext(LoadingContext);

  const {v_code, setVCode, RemoveCode} = useContext(CodeContext);

  // const king_query = useQuery(['query', v_code], database.getKing);
  const {name_IMEI, setName_IMEI, setName_ID, Remove_NameID} =
    useContext(NameIMEIContext);

  const {votedking, votedqueen, query} = useContext(DataContext);

  const Refresh = () => {
    query.refetch();
  };

  const KingVotedId = useMemo(() => {
    if (votedking.data) {
      return votedking.data.data !== 0 && votedking.data.data.selection;
    }

    return 0;
  }, [votedking.data]);

  const data = useMemo(() => {
    if (query.data) {
      const sel_k = query.data.data.sel_king;
      if (KingVotedId) {
        for (var i = 0; i < sel_k.length; i++) {
          sel_k[i] = {
            ...sel_k[i],
            ...{vote: sel_k[i].id === KingVotedId ? true : false},
          };
          console.log(sel_k[i].vote);
        }
      }

      const all = sel_k;

      const sort = all.sort((a, b) => {
        if (a.vote === b.vote) {
          return 0;
        }
        return a.vote ? -1 : 1;
      });

      return all;
    }
  }, [query.data, KingVotedId]);

  const openProfile = data => {
    navigation.navigate('profile', {
      data: data,
    });
  };

  const Vote = data => {
    if (data.is_male) {
      VoteKing.mutate({
        votingcode: v_code,
        kingid: data.id,
        deviceid: name_IMEI.device_id,
      });
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
        {query.isFetching ? (
          <ActivityIndicator size={50} color={'white'} />
        ) : (
          <>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={
                    query.isFetching ||
                    votedking.isFetching ||
                    votedqueen.isFetching
                  }
                  onRefresh={Refresh}
                />
              }>
              {query.data &&
                data.map((item, index) => (
                  <PersonItem
                    key={index}
                    data={item}
                    OpenProfile={openProfile}
                    onVote={Vote}
                    onUnVote={UnVote}
                    votedId={item.is_male ? KingVotedId : QueenVotedId}
                  />
                ))}
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
