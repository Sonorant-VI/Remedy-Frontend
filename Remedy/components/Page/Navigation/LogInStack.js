import * as React from 'react';
import { getStateFromPath, NavigationContainer } from '@react-navigation/native';
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
import { StackRouter } from 'react-navigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LogInStack() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="LogSignInStack"
        component={LogSignIn}
        options={{ headerShown: false}}
        />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default LogInStack