import React from 'react';
import {View, Text,Image, ActivityIndicator} from 'react-native';

import {IMAGE} from '../Data/data';

const LoadingScreen = () => {
	return <View style={{
		flex:1,alignItems:'center',justifyContent:'center'
	}}>
		<Image source={IMAGE.king_crown} style={{width:100,height:100}}/>
		<ActivityIndicator color={'yellow'} size={50}/>
		<Text style={{color:'black',fontFamily: 'Roboto-Regular'}}>Loading</Text>
	</View>;
};


export default LoadingScreen;