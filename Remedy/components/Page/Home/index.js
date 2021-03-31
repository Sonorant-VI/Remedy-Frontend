import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

function Home(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Calendar')}>
        <Text style={styles.buttonText}>Go to Calendar Screen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home