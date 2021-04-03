import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Icon } from 'react-native';

import styles from './styles';
import FloatingButton from "../../FloatingButton/FloatingButton";


// Icons
// Use https://icons.expo.fyi/ for icons
import { Ionicons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';

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

       <FloatingButton style={{ bottom: 80}} />
      </View>  
  )
}
export default Calendar