/* eslint-disable prettier/prettier */
import React, {useState, useMemo, useContext, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Home from './screens/home';
import King from './screens/King';
import Queen from './screens/Queen';
import Profile from './screens/Profile';
import Container from './Container';
import Start from './screens/Start';
import Name from './screens/Name';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {LoadingContext, CodeContext,NameIMEIContext} from './context/context';

import EncryptedStorage from 'react-native-encrypted-storage';
const Stack = createStackNavigator();
const queryClient = new QueryClient();

const MainContainer = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingtext, setLoadingText] = useState('');
  const [load,setLoad] = useState(false);

  const [v_code, setVCode] = useState(null);
  const [name_IMEI, setName_IMEI] = useState(null);

  const loadingValue = useMemo(
    () => ({showLoading, setShowLoading}),
    [showLoading, setShowLoading],
  );

  const RemoveCode = async () => {
    setVCode(null);
    let code = await EncryptedStorage.setItem('temp_code', null);
  };

  const codeValue = useMemo(
    () => ({v_code, setVCode, RemoveCode}),
    [v_code, setVCode],
  );

  const setName_ID = async(data)=>{
    setName_IMEI(data)
    let r = await EncryptedStorage.setItem('name_IMEI', JSON.stringify(data));
  }

  const Remove_NameID = async(data)=>{
    setName_IMEI(null);
    let r = await EncryptedStorage.setItem('name_IMEI',null);
  }

  const nameIMEIValue = useMemo(
    () => ({name_IMEI, setName_IMEI,setName_ID,Remove_NameID}),
    [name_IMEI, setName_IMEI],
  );

  useEffect(() => {
    setLoad(true)
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
        setName_IMEI(JSON.parse(name_IMEI))
      }
      setLoad(false);
    };

    getName();
  }, [v_code]);

  if(load){
    return <View><Text>Loaing</Text></View>
  }

  return (
    <NameIMEIContext.Provider value={nameIMEIValue}>  
    <CodeContext.Provider value={codeValue}>
      <LoadingContext.Provider value={loadingValue}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              {v_code === null ? (
                <>
                  <Stack.Screen name="start" component={Start} />
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
                <ActivityIndicator size={50} color={'#000'} />
                {loadingtext && <Text>{loadingtext}</Text>}
              </View>
            </View>
          ) : null}
        </QueryClientProvider>
      </LoadingContext.Provider>
    </CodeContext.Provider>
    </NameIMEIContext.Provider>  
  );
};

export default MainContainer;
