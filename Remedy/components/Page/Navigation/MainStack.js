import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


// Pages
 import Home from '../Home/index';
 import Accounts from '../Accounts/index';
 import LogSignIn from '../LogSignIn/index';
 import CalendarPage from '../Calendar/index';
 import SettingsP from '../SettingsP/index';
 import FAQ from '../FAQ/index';
import MainStackNavigator from "./MainStackNavigator";

// Icons
// Use https://icons.expo.fyi/ for icons
import { Ionicons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';


async function  logOut(){
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
        if (Platform.OS === 'android') {
            await AsyncStorage.clear();
        }
        if (Platform.OS === 'ios') {
            await AsyncStorage.multiRemove(asyncStorageKeys);
        }
    }
    MainStackNavigator();
    console.log(' cleaning of async storage Done.');
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#09B0DD' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <Button
              onPress={ () =>logOut()}
              title="Log Out"
              color="#fff"
            />
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home} />
      </Stack.Navigator>
    </>
  );
};

function CalendarStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Calendar"
        screenOptions={{
          headerStyle: { backgroundColor: '#09B0DD' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen
          name="Calendar"
          component={CalendarPage} />

      </Stack.Navigator>
    </>
  );
};

function AccountsStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Accounts"
        screenOptions={{
          headerStyle: { backgroundColor: '#09B0DD' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen
          name="Accounts"
          component={Accounts} 
          options={{ title: 'Account Page' }}
           />
      </Stack.Navigator>
    </>
  );
};

function MainStack() {

  return (
    <NavigationContainer>
      <Tab.Navigator  
        initialRouteName="HomeStack" 
        tabBarOptions={{
        activeTintColor: '#09B0DD',
        }} 
      >
   <Tab.Screen
        name="AccountsStack"
        component={AccountsStack}
        options={{
          tabBarLabel: 'Accounts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              color={color}
              size={size}
            /> 
          ),
        }}  
        />
      
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}  
        />

      <Tab.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar"
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

export default MainStack