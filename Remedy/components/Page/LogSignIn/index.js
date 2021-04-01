import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CheckBox } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';

import styles from './styles';

function LogSignIn(props) {
  const { navigation } = props
  const [userRole, setUserRole] = React.useState('user');

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
          /><Text style={styles.label}>user</Text>
        </View>
        <Text style={styles.desc}>add descriptions..</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="authUser"
            status={ userRole === 'authUser' ? 'checked' : 'unchecked' }
            onPress={() => setUserRole('authUser')}
          /><Text style={styles.label}>authenticated user</Text>
        </View>
        <Text style={styles.desc}>add descriptions..</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="doctor"
            status={ userRole === 'doctor' ? 'checked' : 'unchecked' }
            onPress={() => setUserRole('doctor')}
          /><Text style={styles.label}>doctor(?)</Text>
        </View>
        <Text style={styles.desc}>add descriptions..</Text>
        <TouchableOpacity
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogSignIn