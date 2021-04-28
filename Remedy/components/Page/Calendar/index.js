import React, {useEffect, useState} from 'react';
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// import { DatePicker } from 'antd';

function CalendarPage(props) {
    const {navigation} = props
    const [markedDates, setMarkedDates] = React.useState(null);
    const [dates, setDates] = React.useState();
    const appointmentDots = {key:'appointment', color: 'red', selectedDotColor: 'blue'};
    const [appReminder, setAppReminder] = React.useState(null);
    let listDate=[];

    useEffect(() => {
    getMyObject().then(r=>{
        setAppReminder(r);
    });

    async function getMyObject(){
       let value;
        try {
            const jsonValue = await AsyncStorage.getItem('appReminder')
            value= jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
            // read error
        }
        return value;
    }
    }, []);


    dateToList();
    function dateToList(){
        let val;
        if(appReminder!=null) {
            for (let obj of appReminder) {
                let date = new Date(obj.start);
                val = new String().concat(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear());
                listDate.push(val);
            }
        }
    }
    /*
    function addDates() {
        for(let d of listDate) {
            let obj = (d) => Object.assign(d, {dots: [appointmentDots], selected: true, selectedColor: 'red'});
            console.log(obj);
        }
    }

     */

    const [medModalVisible, setMedModalVisible] = useState(false)
    const [appModalVisible, setAppModalVisible] = useState(false)

    // function add

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.elementsContainer}>
                    <Calendar
                        onDayPress={(day) => {
                            console.log(day);
                        }}
                        markedDates={
                            markedDates
                        }
                        />

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