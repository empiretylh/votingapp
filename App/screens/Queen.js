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
  ActivityIndicator,
  TextInput,
  ScrollView,
  RefreshControl,
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

const Home = ({navigation}) => {
  const {
    showLoading,
    setShowLoading,
    IsVote,
    setIsVote,
    VoteQueen,
    VoteKing,
    UVK,
    UVQ,
  } = useContext(LoadingContext);
  const {v_code, setVCode, RemoveCode} = useContext(CodeContext);

  // const king_query = useQuery(['query', v_code], database.getKing);
  const {name_IMEI, setName_IMEI, setName_ID, Remove_NameID} =
    useContext(NameIMEIContext);

  const {votedking, votedqueen, query} = useContext(DataContext);

  const Refresh = () => {
    query.refetch();
  };

  const QueenVotedId = useMemo(() => {
    if (votedqueen.data) {
      return votedqueen.data.data !== 0 && votedqueen.data.data.selection;
    }

    return 0;
  }, [votedqueen.data]);

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

  const data = useMemo(() => {
    if (query.data) {
      const sel_q = query.data.data.sel_queen;

      for (var i = 0; i < sel_q.length; i++) {
        sel_q[i] = {
          ...sel_q[i],
          ...{vote: sel_q[i].id === QueenVotedId ? true : false},
        };
      }

      const all = sel_q;

      const sort = all.sort((a, b) => {
        return b.vote ? 1 : -1;
      });

      return all;
    }
  }, [query.data, QueenVotedId]);

  const openProfile = data => {
    navigation.navigate('profile', {
      data: data,
    });
  };

  return (
    <ImageBackground source={IMAGE.girlbg} style={{flex: 1}}>
      <View style={styles.topView}>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => Refresh()}>
            <Image source={IMAGE.queen_crown} style={{width: 50, height: 50}} />
          </TouchableOpacity>
          <Text style={{...styles.logotext, marginLeft: 10}}>
            Queen Selection
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
                    votedId={QueenVotedId}
                  />
                ))}
            </ScrollView>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

// javascript

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

export default Home;
