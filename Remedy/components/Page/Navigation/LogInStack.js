import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// Pages
 import Home from '../Home/index';
 import Accounts from '../Accounts/index';
 import LogSignIn from '../LogSignIn/index';
 import CalendarPage from '../Calendar/index';
 import SettingsP from '../SettingsP/index';
 import FAQ from '../FAQ/index';


// Icons
// Use https://icons.expo.fyi/ for icons
import { Ionicons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function LogInStack() {

  return (
    <NavigationContainer>
      <Tab.Navigator   
        tabBarOptions={{
        activeTintColor: '#09B0DD',
        }} 
      >
   <Tab.Screen
        name="LogSignInStack"
        component={LogSignIn}
        options={{
          tabBarLabel: 'LogSignInStack',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              color={color}
              size={size}
            /> 
          ),
        }}  
     />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default LogInStack