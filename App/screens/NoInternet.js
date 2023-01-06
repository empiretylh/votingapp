import React from 'react';
import {View, Text,Image, ActivityIndicator} from 'react-native';

import {IMAGE} from '../Data/data';

const NoInternetScreen = () => {
	return <View style={{
		flex:1,alignItems:'center',justifyContent:'center'
	}}>
		<Image source={IMAGE.king_crown} style={{width:100,height:100}}/>
		
		<Text style={{color:'black',fontFamily: 'Roboto-Bold',fontSize: 20}}>No Internet Connections</Text>

		<Text style={{color:'black',fontFamily: 'Roboto-Regular'}}>Please Check Your Internet Connections</Text>
	</View>;
};


export default NoInternetScreen;