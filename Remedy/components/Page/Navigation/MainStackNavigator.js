import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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




const Stack = createStackNavigator()

function MainStackNavigator(props) {
  const { navigation } = props

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
            fontWeight: 'bold'                // Colors are subject to change
          },
          headerTintColor: '#36D5F3',
          headerBackTitleVisible: false // doesn't page which back button will lead too
        }}
        headerMode='float' //keeps header in place on androids
        >
          
        <Stack.Screen
          name='Home' 
          component={Home} 
          options={{
            title: 'Dashboard',
            headerRight: () => (
              <Ionicons 
                name="settings" 
                size={32} 
                color="#36D5F3" 
                onPress={ () => 
                  alert('Settings button pressed')
                } 
                style={{ paddingRight: 10 }}/>
            ), 
            }}/>

        <Stack.Screen 
          name='Accounts' 
          component={Accounts} 
          options={{title: 'Linked Accounts'     
          }} />

        <Stack.Screen
         name='LogSignIn' 
         component={LogSignIn} 
         options={{title: 'Remedy'}} />

        <Stack.Screen
         name='CalendarPage' 
         component={CalendarPage} 
         options={{
           title: 'CalendarPage',
           headerRight: () => (
             <Fontisto 
               name="persons" 
               size={32} 
               color="#36D5F3" 
               onPress={ () => alert('Settings button pressed') // subject to change
               } 
               style={{ paddingRight: 10 }}/>
           ),
           }} />

        <Stack.Screen
         name='SettingsP' 
         component={SettingsP} 
         options={{title: 'Settings'}} />

        <Stack.Screen
         name='FAQ' 
         component={FAQ} 
         options={{title: 'FAQ'}} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default MainStackNavigator