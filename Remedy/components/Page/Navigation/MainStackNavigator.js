import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Home/index';
import Accounts from '../Accounts/index';
import LogSignIn from '../LogSignIn/index';
import Calendar from '../Calendar/index';


const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='LogSignIn' // if logged in -> initialRouteName='Home' | need to figure this out later
        screenOptions={{              // Later need to remove back button on navigation once finished with log in screen
          gestureEnabled: true, // lets left->right swipe to go back a page
          headerStyle: {
            backgroundColor: '#AAACAB'
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#36D5F3',
          headerBackTitleVisible: false // doesn't page which back button will lead too
        }}
        headerMode='float' //keeps header in place on androids
        >
          
        <Stack.Screen name='Home' component={Home} options={{title: 'Dashboard' }}/>
        <Stack.Screen name='Accounts' component={Accounts} options={{title: 'Linked Accounts' }} />
        <Stack.Screen name='LogSignIn' component={LogSignIn} options={{title: 'Remedy'}} />
        <Stack.Screen name='Calendar' component={Calendar} options={{title: 'Calendar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator