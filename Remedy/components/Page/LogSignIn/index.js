import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

function LogSignIn(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LogSignIn</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogSignIn