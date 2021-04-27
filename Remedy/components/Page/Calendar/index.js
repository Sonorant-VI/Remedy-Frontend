import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, Icon} from 'react-native';
import {Calendar} from 'react-native-calendars';

import styles from './styles';
import FloatingButton from "../../FloatingButton/FloatingButton";

// Icons
// Use https://icons.expo.fyi/ for icons
import {Ionicons} from '@expo/vector-icons';
import {Fontisto} from '@expo/vector-icons';
import AddMed from '../../Popups/addMed';
import AddApp from '../../Popups/addApp';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { DatePicker } from 'antd';

async function CalendarPage(props) {
    const {navigation} = props
    const [markedDates, setMarkedDates] = React.useState(null);
    const [medModalVisible, setMedModalVisible] = useState(false);
    const [appModalVisible, setAppModalVisible] = useState(false);
    const [dates, setDates] = React.useState(['2021-04-12', '2021-04-30']);
    const appointment = {key: 'Appointment', color: 'red', selectedDotColor: 'red'};
    let memory = await getMultiple();
    let jwt = await memory.get('jwt');
    let uid = parseFloat(await memory.get('uid'));

    async function getMultiple() {
        let values
        let map=new Map();
        try {
            values = await AsyncStorage.multiGet(['jwt', 'uid'])
        } catch (e) {
            // read error
        }
        values.forEach(array=>{
            map.set(array[0],array[1]);
        })
        return map;
    }


    let medReminderList;
    let appReminderList;
    getAppReminderList();
    getMedReminderList();


    // get all the med reminders
    function getMedReminderList() {
        axios.get('http://sonorant-vi.herokuapp.com/api/medReminder/' + uid, {
            headers: {
                'x-access-token': jwt
            }
        }).then((res) => {

        }).catch(function (error) {
            console.log(error);
        });
    }

    //get all the appreminder
    function getAppReminderList() {
        axios.get('http://sonorant-vi.herokuapp.com/api/appReminder/' + uid, {
            headers: {
                'x-access-token': jwt
            }
        }).then((res) => {

        }).catch(function (error) {
            console.log(error);
        });
    }

    //-------------Initialisation----------------------------


    // function add
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.elementsContainer}>
                    <Text style={styles.text}>Calendar</Text>
                    <Calendar
                        onDayPress={(day) => {
                            console.log(day);
                        }}
                        markedDates={markedDates}/>

                    <View style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        marginVertical: 50
                    }}/>

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
                </View>
            </View>
        </ScrollView>

    )
}

export default CalendarPage