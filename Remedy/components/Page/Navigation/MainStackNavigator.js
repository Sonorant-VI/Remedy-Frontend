import React, { useEffect, Component } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainStack from '../Navigation/MainStack';
import LogInStack from '../Navigation/LogInStack';

import { NavigationContainer } from '@react-navigation/native';

export default class MainStackNavigator extends Component
{
  constructor(props){
    super(props);
    this.state= {isTrue: false}
  }

  UNSAFE_componentWillMount = async() =>
  {
    let newJwt;
    console.log("componenetwillmount")
    const value = await AsyncStorage.getItem('jwt');
    console.log('value: ' + value)
    if (value)
    {
      newJwt = true; // logged in = true
    } else {
      newJwt = false; // if value is null return false 
    }
    console.log('newJwt' + newJwt)
    this.setState({isTrue: newJwt});
  }

  render() {
      console.log("this.state.isTrue: " + this.state.isTrue)
      if(this.state.isTrue == true)
      {
        console.log('main stack ran')
        return(
          <MainStack />
        )
      } else {
        return(
          <LogInStack />
        )
      }
  }
}
