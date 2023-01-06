/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import {useCardAnimation} from '@react-navigation/stack';
import React, {useContext, useState, useMemo, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {IMAGE} from '../Data/data';

import PersonItem from './components/personItem';
import database from '../Data/database';
import {useQuery, useMutation} from 'react-query';

import {
  CodeContext,
  NameIMEIContext,
  LoadingContext,
  EndTimeContext,
  DataContext,
} from '../context/context';

const Home = ({navigation}) => {
  const array = Array.from({length: 20}, (_, i) => i + 1);

  const {v_code, setVCode, RemoveCode} = useContext(CodeContext);
  const {name_IMEI, setName_IMEI, setName_ID, Remove_NameID,menu,setMenu} =
    useContext(NameIMEIContext);
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

  const {votedking, votedqueen, query} = useContext(DataContext);

  const {isTimeUp, setIsTimeUp} = useContext(EndTimeContext);

  const [searchText, setSearchText] = useState('');
  const [isrefresh, setIsRefresh] = useState(false);
  // unVoteKing({queryKey

  const checkVotingCode = useQuery(['checkcode', v_code], database.checkCode, {
    onSuccess: e => {
      if (e.data !== 1) {
        RemoveCode();
        Remove_NameID();
      }
    },
  });

  useEffect(() => {
    console.log(JSON.stringify(VoteKing));
  }, [VoteKing]);

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

  const KingVotedId = useMemo(() => {
    if (votedking.data) {
      return votedking.data.data !== 0 && votedking.data.data.selection;
    }

    return 0;
  }, [votedking.data]);

  const QueenVotedId = useMemo(() => {
    if (votedqueen.data) {
      return votedqueen.data.data !== 0   // RemoveCode();
              // Remove_NameID();&& votedqueen.data.data.selection;
    }

    return 0;
  }, [votedqueen.data]);

  const data = useMemo(() => {
    if (query.data) {
      console.log(query.data.data);

      const sel_k = query.data && query.data.data.sel_king;
      const sel_q = query.data && query.data.data.sel_queen;

      for (var i = 0; i < sel_k.length; i++) {
        sel_k[i] = {
          ...sel_k[i],
          ...{vote: sel_k[i].id === KingVotedId ? true : false},
        };
      }

      for (var i = 0; i < sel_q.length; i++) {
        sel_q[i] = {
          ...sel_q[i],
          ...{vote: sel_q[i].id === QueenVotedId ? true : false},
        };
      }

      const all = sel_k && sel_k.concat(sel_q);

      const sort =
        all &&
        all.sort((a, b) => {
          return b.vote ? 1 : -1;
          //
        });

      const final = sort.filter(a =>
        a.name.toLowerCase().includes(searchText.toLowerCase()),
      );

      return final;
    }
  }, [query.data, QueenVotedId, KingVotedId, searchText]);
  // RemoveCode();
              // Remove_NameID();
  const openProfile = data => {
    navigation.navigate('profile', {
      data: data,
    });
  };

  const Refresh = () => {
    query.refetch();
    votedking.refetch();
    votedqueen.refetch();
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
              // RemoveCode();
              setMenu(true);
              // Remove_NameID();
            }}>
            <Image
              source={IMAGE.icon_question}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => console.log('what')}>
            <Image
              source={IMAGE.ucsd}
              style={{
                width: 110,
                height: 110,
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              color: 'black',
              fontSize: 16,
            }}>
            University of Computer Studies, Dawei
          </Text>
          {isTimeUp ? (
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                color: 'red',
              }}>
              Voting time is over
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                color: 'black',
              }}>
              Developed By Thura Lin Htut
            </Text>
          )}
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
            placeholderTextColor="#4d4e4f"
            onChangeText={e => setSearchText(e)}
          />
          <TouchableOpacity style={{marginRight: 10}} onPress={e => Refresh()}>
            <Image source={IMAGE.icon_search} style={{width: 25, height: 25}} />
          </TouchableOpacity>
        </View>
        {query.isFetching ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            style={{marginTop: 10}}
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
    // opacity: 0.9,
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
