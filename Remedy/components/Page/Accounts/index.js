import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import FloatingButton from "../../FloatingButton/FloatingButton";

function Accounts(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accounts</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go to Home Screen</Text>
      </TouchableOpacity>

      <FloatingButton style={{ bottom: 80}} />
    </View>
  )
}

export default Accounts