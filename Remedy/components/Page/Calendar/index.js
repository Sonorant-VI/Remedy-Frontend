import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Icon } from 'react-native';
import { Calendar } from 'react-native-calendars';

import styles from './styles';
import FloatingButton from "../../FloatingButton/FloatingButton";


// Icons
// Use https://icons.expo.fyi/ for icons
import { Ionicons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import AddMed from '../../Popups/addMed';
import AddApp from '../../Popups/addApp';
// import { DatePicker } from 'antd';

function CalendarPage(props) {
  const { navigation } = props

  const [markedDates, setMarkedDates] = React.useState(null);
  const [dates, setDates] = React.useState(['2021-04-12', '2021-04-30']);

  function addDates() {
    let obj = dates.reduce((c, v) => Object.assign(c, { [v]: { marked: true, dotColor: 'red' }, }), {}, );
    console.log(obj);
    setMarkedDates(obj);
  }
  

  const [medModalVisible, setMedModalVisible] = useState(false)

  const [appModalVisible, setAppModalVisible] = useState(false)

  // function add

  return (
      <View style={styles.container}>
        <View style={styles.elementsContainer}>
          <Text style={styles.text}>Calendar</Text>
          <Calendar
            onDayPress={(day) =>{ console.log(day); }}
            markedDates={markedDates} />

          <View style={{borderBottomColor: 'black', borderBottomWidth: 1, borderWidth: 1, marginVertical: 50}} />

          <View style={styles.buttonRow}>
            <AddMed
              modalVisible={medModalVisible}
              setModalVisible={setMedModalVisible}
            />
            <AddApp
              modalVisible={appModalVisible}
              setModalVisible={setAppModalVisible}

            />
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Accounts')}>
            <Text style={styles.buttonText}>Go to Accounts Screen</Text>
          </TouchableOpacity>

          {/* <FloatingButton style={{ bottom: 80 }} /> */}
        </View>
      </View>
  )
}
export default CalendarPage