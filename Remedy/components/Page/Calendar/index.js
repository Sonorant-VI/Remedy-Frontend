import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

function Calendar(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calendar</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Accounts')}>
        <Text style={styles.buttonText}>Go to Accounts Screen</Text>
      </TouchableOpacity>
    </View>
  )
}
export default Calendar