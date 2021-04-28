import React, { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainStack from '../Navigation/MainStack';
import LogInStack from '../Navigation/LogInStack';

import { NavigationContainer } from '@react-navigation/native';



function MainStackNavigator() {

  let jwt;
  useEffect(() => {
    setMemory(() => {
      jwt = r.get('jwt');
      header = {
        headers: {token: jwt}
      }
      console.log('------------');
      console.log(jwt);
      console.log('------------');
    })

    async function setMemory() {
      let values;
      try {
        values = await AsyncStorage.getItem('jwt')
      } catch (e) {
        console.log(e);
      }
      console.log('------------');
      console.log(values);
      console.log('------------');
      return values
      
    }
  })

  if (jwt != null){
    return <LogInStack />
  } 
  else {
    return <MainStack />
  }

}
export default MainStackNavigator;