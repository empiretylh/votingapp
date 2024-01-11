/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useMemo, useRef, useContext, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Animated,
  TouchableOpacity,
  Easing,
  Vibration,
  ToastAndroid,
  Linking,
} from 'react-native';
import Home from './screens/home';
import King from './screens/King';
import Queen from './screens/Queen';
import Profile from './screens/Profile';
import Container from './Container';
import Start from './screens/Start';
import Name from './screens/Name';

import LoadingScreen from './screens/LoadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  LoadingContext,
  CodeContext,
  NameIMEIContext,
  DataContext,
  EndTimeContext,
} from './context/context';

import database from './Data/database';
import EncryptedStorage from 'react-native-encrypted-storage';
import { IMAGE } from './Data/data';
import QRCodeScreen from './screens/QRCodeScan';
import NoInternet from './screens/NoInternet';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

import { onlineManager } from 'react-query';
import Clipboard from '@react-native-clipboard/clipboard';

const MainContainer = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingtext, setLoadingText] = useState('');
  const [load, setLoad] = useState(false);

  const [v_code, setVCode] = useState(null);
  const [name_IMEI, setName_IMEI] = useState(null);

  const [IsVote, setIsVote] = useState(false);

  const [endInteval, setEndInteval] = useState(900000);

  const [isTimeUp, setIsTimeUp] = useState(false);

  let opacity = useRef(new Animated.Value(0)).current;

  const end_time_load = useQuery(['end_time', v_code], database.getEndTime);

  const [showFV, setShowFV] = useState(false);

  const [showSponsor, setShowSponsor] = useState(true);

  const [isIConnected, setIConnected] = useState(null);

  const [endtime, setEndTime] = useState(null);

 
  useEffect(() => {
    const listener = NetInfo.addEventListener(state => {
      setIConnected(state.isConnected);
    });

    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(state.isConnected);
      });
    });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTimeUp) {
        end_time_load.refetch();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [end_time_load]);

  let time_up = null;

  useEffect(() => {
    time_up = setTimeout(() => {
      setIsTimeUp(true);
      setShowFV(true);
      setShowSponsor(true);
    }, endInteval);

    return () => clearTimeout(time_up);
  }, [endInteval]);

  useEffect(() => {
    if (end_time_load.data) {
      const nowdate = new Date().getTime();
      const endtime = new Date(end_time_load.data.data).getTime();
      setEndTime(endtime);
      if (endtime) {
        const result = endtime - nowdate;
        console.log(result, 'Resulltttt');
        if (result <= 0) {
          console.log('Time UP');
          setIsTimeUp(true);
        }

        console.log('Result Change', result);
        clearTimeout(time_up);
        setEndInteval(result);

        console.log('I cleareed Time Out');
      }
    }
  }, [end_time_load.data]);

  const query = useQuery({
    queryKey: ['voting', v_code],
    queryFn: database.getVoting,
  });

  const animate = () => {
    console.log('Animating');
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate();

    setTimeout(() => {
      setIsVote(false);
      console.log('Vote Loading Close');
    }, 1000);
  }, [IsVote]);

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const animatedStyles = {
    opacity: opacity,

    transform: [{ scale: size }],
  };

  const RemoveCode = async () => {
    setVCode(null);
    let code = await EncryptedStorage.setItem('temp_code', null);
  };

  const codeValue = useMemo(
    () => ({ v_code, setVCode, RemoveCode }),
    [v_code, setVCode],
  );

  const setName_ID = async data => {
    setName_IMEI(data);
    let r = await EncryptedStorage.setItem('name_IMEI', JSON.stringify(data));
  };

  const Remove_NameID = async data => {
    setName_IMEI(null);
    let r = await EncryptedStorage.setItem('name_IMEI', null);
  };

  const [menu, setMenu] = useState(false);

  const nameIMEIValue = useMemo(
    () => ({ name_IMEI, setName_IMEI, setName_ID, Remove_NameID, menu, setMenu }),
    [name_IMEI, setName_IMEI, menu, setMenu],
  );

  useEffect(() => {
    setLoad(true);
    const getCode = async () => {
      let code;

      code = await EncryptedStorage.getItem('temp_code');

      if (code !== null) {
        setVCode(code);
      }
      setLoad(false);
    };

    getCode();
  }, [v_code]);

  useEffect(() => {
    setLoad(true);
    const getName = async () => {
      let name_IMEI;

      name_IMEI = await EncryptedStorage.getItem('name_IMEI');

      if (name_IMEI !== null) {
        setName_IMEI(JSON.parse(name_IMEI));
      }
      setLoad(false);
    };

    getName();
  }, [v_code]);

  const votedking = useQuery(
    ['votedking', v_code, name_IMEI && name_IMEI.device_id],
    database.getVotedKing,
  );

  const votedqueen = useQuery(
    ['votedqueen', v_code, name_IMEI && name_IMEI.device_id],
    database.getVotedQueen,
  );

  const VoteKing = useMutation(database.voteKing, {
    onSuccess: e => {
      votedking.refetch();
      setShowLoading(false);
      Vibration.vibrate(120);
    },
    onMutate: e => {
      setIsVote(true);
      setShowLoading(true);
    },
    onError: e => {
      setShowLoading(false);
    },
  });

  const VoteQueen = useMutation(database.voteQueen, {
    onSuccess: e => {
      votedqueen.refetch();
      setShowLoading(false);
      Vibration.vibrate(120);
    },
    onMutate: e => {
      setIsVote(true);
      setShowLoading(true);
    },
    onError: e => {
      setShowLoading(false);
    },
  });

  const UVK = useMutation(database.uvk, {
    onSuccess: e => {
      console.log('Unvote Successfully');
      setShowLoading(false);
      votedking.refetch();
      Vibration.vibrate(120);
    },
    onMutate: e => {
      setShowLoading(true);
    },
    onError: e => {
      setShowLoading(false);
    },
  });

  const UVQ = useMutation(database.uvq, {
    onSuccess: e => {
      console.log('Unvote Successfully');
      setShowLoading(false);
      votedqueen.refetch();
      Vibration.vibrate(120);
    },
    onMutate: e => {
      setShowLoading(true);
    },
    onError: e => {
      setShowLoading(false);
    },
  });

  const loadingValue = useMemo(
    () => ({
      showLoading,
      setShowLoading,
      IsVote,
      setIsVote,
      VoteQueen,
      VoteKing,
      UVK,

      UVQ,
    }),
    [showLoading, setShowLoading],
  );

  const EndTimeValue = useMemo(
    () => ({ isTimeUp, setIsTimeUp,endInteval , endtime}),
    [isTimeUp, setIsTimeUp, endInteval],
  );

  const datavalue = useMemo(
    () => ({ votedking, votedqueen, query }),
    [votedking, votedqueen, query],
  );

  useMemo(() => {
    if (isIConnected) {
      query.refetch();
      votedqueen.refetch();
      votedking.refetch();
    }
  }, [isIConnected]);

  if (load) {
    return <LoadingScreen />;
  }

 

  const copyToClipboard = () => {
    Vibration.vibrate(120);
    Clipboard.setString('09699227094');
    ToastAndroid.show('Copied To Clipboard!', ToastAndroid.SHORT)
  }

  if (isIConnected === true) {
    return (
      <EndTimeContext.Provider value={EndTimeValue}>
        <DataContext.Provider value={datavalue}>
          <NameIMEIContext.Provider value={nameIMEIValue}>
            <CodeContext.Provider value={codeValue}>
              <LoadingContext.Provider value={loadingValue}>
                <NavigationContainer>
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                    }}>
                    {v_code === null ? (
                      <>
                        <Stack.Screen name="start" component={Start} />
                        <Stack.Screen
                          name="qrcodescreen"
                          component={QRCodeScreen}
                        />
                        {/* <Stack.Screen name="name" component={Start} /> */}
                      </>
                    ) : (
                      <>
                        {name_IMEI === null ? (
                          <>
                            <Stack.Screen name="name" component={Name} />
                          </>
                        ) : (
                          <>
                            <Stack.Screen name="main" component={Container} />
                            <Stack.Screen name="profile" component={Profile} />
                          </>
                        )}
                      </>
                    )}
                  </Stack.Navigator>
                </NavigationContainer>
                {showFV && (
                  <View
                    style={{
                      position: 'absolute', 
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
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
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: 'Roboto-Bold',
                          color: 'red',
                          textAlign: 'center',
                        }}>
                        VOTING TIME IS OVER.
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#0f0f0f',
                          textAlign: 'auto',
                          marginTop: 10,
                        }}>
                        you can't vote anymore. Thank you for your vote. Ask
                        your administrator for poll results.
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#f53354',
                          padding: 10,
                          borderRadius: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}
                        onPress={() => setShowFV(false)}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 20,
                          }}>
                          Close Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {showSponsor && (
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
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: 'Roboto-Bold',
                          color: 'red',
                          textAlign: 'center',
                        }}>
                        Do you want to become a sponsor of UCSD voting app?
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
                      <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'flex-end' }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#f53354',
                            padding: 10,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginTop: 10,
                          }}
                          onPress={() => setShowSponsor(false)}>
                          <Text
                            style={{
                              color: 'white',
                              fontFamily: 'Roboto-Bold',
                              fontSize: 20,
                            }}>
                           No, Thanks
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#ad14f5',
                            padding: 10,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginTop: 10,
                            marginLeft:5,
                          }}
                          onPress={() => setShowSponsor(false)}>
                          <Text
                            style={{
                              color: 'white',
                              fontFamily: 'Roboto-Bold',
                              fontSize: 20,
                            }}>
                            OK, I Understand
                          </Text>
                        </TouchableOpacity>

                      </View>
                    </View>
                  </View>
                )}
               


                {menu && (
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
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: 'Roboto-Bold',
                          color: 'black',
                          textAlign: 'center',
                        }}>
                        Voting
                      </Text>

                      <TouchableOpacity
                        style={{
                          backgroundColor: 'blue',
                          padding: 10,
                          borderRadius: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}
                        onPress={() => {
                          RemoveCode();
                          Remove_NameID();
                          setMenu(false);

                          //                         RemoveCode();
                          //                         const remove = setTimeout(() => {
                          //                           Remove_NameID();
                          //                         }, 1000);
                          //
                          //                         clearTimeout(remove);
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 20,
                          }}>
                          + New Voting
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#f53354',
                          padding: 10,
                          borderRadius: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}
                        onPress={() => setMenu(false)}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 20,
                          }}>
                          x CLOSE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {showLoading ? (
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 15,
                        shadowColor: '#000',
                        elevation: 12,
                      }}>
                      <View>
                        {IsVote ? (
                          <Animated.View style={animatedStyles}>
                            <Image
                              source={IMAGE.hearticon}
                              style={{
                                width: 10,
                                height: 10,

                                tintColor: '#FF5F5F',
                              }}
                              reszieMethod={'scale'}
                              resizeMode={'contain'}
                            />
                          </Animated.View>
                        ) : (
                          <ActivityIndicator size={50} color={'#000'} />
                        )}
                      </View>
                      {loadingtext && <Text>{loadingtext}</Text>}
                    </View>
                  </View>
                ) : null}
              </LoadingContext.Provider>
            </CodeContext.Provider>
          </NameIMEIContext.Provider>
        </DataContext.Provider>
      </EndTimeContext.Provider>
    );
  } else {
    return <NoInternet />;
  }
};

export default MainContainer;
