// Notifications TODO List
//   -Seperate system into the calendar page+home page -> Add from calendar, display in home
//   -User can input + change dates 
//   -Alerts based on when they are meant to occur
//   -Recurring notifications
//   -Colors + Styling will obv be changed 
//   -Add checkbox for user to select what type of notification they want 

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {NotificationCalls,registerForPushNotificationsAsync} from "../../Notifications/NotificationsCalls";

import styles from './styles';

// Notification Components
import ListItems from '../../Notifications/ListItems';
import InputModal from '../../Notifications/InputModal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from 'moment';
import axios from "axios";

import RNRestart from 'react-native-restart';

import { FontAwesome5 } from '@expo/vector-icons';


function Home(props) {
    const {navigation} = props
    const [appReminder, setAppReminder] = React.useState(null);
    const [medReminder, setMedReminder] = React.useState(null);
    // get all reminders

    let jwt;
    let uid;
    let header;

    useEffect(() => {
        setMemory().then(r => {
            jwt = r.get('jwt');
            uid = parseFloat(r.get('uid'));
            header = {
                headers: {token: jwt}
            }
        }).then(async () => {
            let appReminderList = await getAppReminderList();
            let medReminderList = await getMedReminderList();
            setAppReminder(appReminderList);
            setMedReminder(medReminderList);
            if (appReminderList && medReminderList) {
                const appReminderListString = ["appReminder", JSON.stringify(appReminderList)];
                const medReminderListString = ["medReminder", JSON.stringify(medReminderList)];
                try {
                    await AsyncStorage.multiSet([appReminderListString, medReminderListString]);
                } catch (e) {
                    console.log(e);
                }
            }
        });
        async function setMemory() {
            let values
            let map = new Map();
            try {
                values = await AsyncStorage.multiGet(['jwt', 'uid'])
            } catch (e) {
                console.log(e);
            }
            values.forEach(array => {
                map.set(array[0], array[1]);
            })
            return map;
        }
        //get all MedReminders
        async function getMedReminderList() {
            let listMed;
            listMed = await axios.get('http://sonorant-vi.herokuapp.com/api/medReminder/' + uid, header
            ).then((res) => {
                return res.data;
            }).then(data => {
                return data;
            }).catch(function (error) {
            })
            return listMed;
        }

        //get all the appreminder
        async function getAppReminderList() {
            let listApp;
            listApp = await axios.get('http://sonorant-vi.herokuapp.com/api/appReminder/' + uid, header)
                .then((res) => {
                    return res.data;
                }).then(data => {
                    return data;
                }).catch(function (error) {
                });
            return listApp;
        }
    },[]);
    fillTodos();

    const initialTodos = [
        {
            title: "Do an assignment or something",
            date: "Fri, 08 April 2021 16:32:11 GMT",
            key: "1"
        }, {
            title: "Go on a run ",
            date: "Fri, 28 April 2021 16:12:11 GMT",
            key: "2"
        }, {
            title: "Watch a movie",
            date: "Fri, 18 April 2021 16:32:11 GMT",
            key: "3"
        }]

    function fillTodos(){
        let todo=[]
        if(appReminder) {
            let i= 1;
            for (let userObject of appReminder) {
                i++;
                let obj=new Object();
                let date=new Date(userObject.start);
                date=Moment(date).format("ddd, DD MMMM, h:mm a");
                obj.title=userObject.purpose.toString();
                obj.text=userObject.reminder_msg.toString();
                obj.key=i.toString();
                obj.date=date.toString();
                todo.push(obj);
            };
        }

        return todo;
    }
    function fillTodosMed(){
        let todo=[]
        if(medReminder) {
            let i= 1;
            for (let userObject of medReminder) {
                i++;
                let obj=new Object();
                let date=new Date(userObject.time);
                date.setSeconds(date.getSeconds()+userObject.timeout);
                date=Moment(date).format("ddd, DD MMMM, h:mm a");
                obj.title=(userObject.brandName.toString())+" "+(userObject.genericName.toString());
                obj.text=userObject.reminderMsg.toString();
                obj.key=i.toString();
                obj.date=date.toString();
                todo.push(obj);
            };
        }
        if (todo)

        return todo;
    }

    function fillPushNotif(obj){
        let expoPushToken=registerForPushNotificationsAsync;
        const message = {
            content: {
                title: "You've got mail! ????",
                body: 'Here is the notification body',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        };

    }



    // initial notifications
    const [todos, setTodos] = useState(initialTodos);
    //Modal Visibility & input Value
    const [modalVisible, setModalVisible] = useState(false);
    const [todoInputValue, settodoInputValue] = useState();

    // function to add a new todo
    const handleAddTodo = (todo) => {
        const newTodos = [...todos, todo];
        setTodos(newTodos);
        setModalVisible(false);
    }
    //Editing
    const [todoToBeEdited, setTodoToBeEdited] = useState(null);


    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisible(true);
        settodoInputValue(item.title);
    }

    const handleEditTodo = (editedTodo) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodos.splice(todoIndex, 1, editedTodo);
        setTodos(newTodos);
        setTodoToBeEdited(null);
        setModalVisible(false);
    }
    return (
        <>
            <View style={styles.container}>
                <View style={[{flex: 1}, styles.elementsContainer]}>
                    <View style={{flex: 3}}>
                        <View style={styles.headlineBox}>
                            <FontAwesome5 name="clinic-medical" size={34} color="black" /> 
                            <Text style={styles.headlineTitle}> Appointments</Text>
                        </View>
                        <View style={styles.divider} />
                        <ListItems
                            todos={fillTodos()}
                            setTodos={setTodos}
                            handleTriggerEdit={handleTriggerEdit}
                        />
                        <View style={styles.headlineBox}>
                            <FontAwesome5 name="pills" size={34} color="black" />
                            <Text style={[styles.headlineTitle,styles.medHeadLine]}> Medications</Text>
                        </View>
                        <View style={styles.divider} />
                        <ListItems
                            todos={fillTodosMed()}
                            setTodos={setTodos}
                            handleTriggerEdit={handleTriggerEdit}
                        />
                    </View>
                </View>
            </View>
        </>


    )
}

export default Home;