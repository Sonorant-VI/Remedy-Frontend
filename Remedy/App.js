import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/*
LogSignIn Screen -> Home Screen -> Calender -> Accounts
Can backtrack through all of the pages [Top Left]
*/

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Calendar"
        onPress={() => navigation.navigate('Calendar')}
      />
      <Button
        title="Go to LogSignInScreen"
        onPress={() => navigation.navigate('LogSignIn')} //temp logsignin screen button to be able to navigate through the 4 pages that we have
      />
    </View>
  );
}

function LogSignInScreen({ navigation }) { // Log in goes to dashboard
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LogSignIn Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function CalendarScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Calendar Screen</Text>
      <Button
        title="Go to Accounts"
        onPress={() => navigation.navigate('Accounts')}
      />
    </View>
  );
}

function AccountsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Accounts Screen </Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="LogSignIn" component={LogSignInScreen} options={{ title: 'LogSignIn' }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendar' }} />
        <Stack.Screen name="Accounts" component={AccountsScreen} options={{ title: 'Accounts' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
