import  * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons'; 

import styles from './styles';

function LogIn() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Log In</Text>
      <View style={styles.logInBox}>
        <Text>email</Text>
        <TextInput placeholder="input email"/>
        <Text>password</Text>
        <TextInput placeholder="input password"/>
        <TouchableOpacity
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LogIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SignUp(props) {
  const { navigation } = props

  const [userRole, setUserRole] = React.useState('user')

  const toggleSwitch = () => (previousState=>!previousState)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>
      <View style={styles.signUpBox}>
        <Text>email</Text>
        <TextInput placeholder="input email"/>
        <Text>password</Text>
        <TextInput placeholder="input password"/>
        <Text>check password</Text>
        <TextInput placeholder="check password"/>
        <Text>role</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="user"
            status={ userRole === 'user' ? 'checked' : 'unchecked' }
            onPress={() => setUserRole('user')}
          />
          <TouchableOpacity onPress={() => setUserRole('user')}>
            <Text style={styles.label}>user</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.desc}>add descriptions..</Text> */}
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="authUser"
            status={ userRole === 'authUser' ? 'checked' : 'unchecked' }
            onPress={() => setUserRole('authUser')}
          />
          <TouchableOpacity onPress={() => setUserRole('authUser')}>
            <Text style={styles.label}>authenticated user</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.desc}>add descriptions..</Text> */}
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="doctor"
            status={ userRole === 'doctor' ? 'checked' : 'unchecked' }
            onPress={() => setUserRole('doctor')}
          />
          <TouchableOpacity onPress={() => setUserRole('doctor')}>
            <Text style={styles.label}>doctor</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.desc}>add descriptions..</Text> */}
        <TouchableOpacity
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function LogSignIn() {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'LogIn') {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === 'SignUp'){
              iconName = focused ? "person-add" : "person-add-outline";
            }
            return <Ionicons name={iconName} size={18} color={color} />;
          },
        })}
      >
        <Tab.Screen name="LogIn" component={LogIn} />
        <Tab.Screen name="SignUp" component={SignUp} />
      </Tab.Navigator>
  );
}

export default LogSignIn