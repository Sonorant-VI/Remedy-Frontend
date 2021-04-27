// Notifications TODO List
//   -Seperate system into the calendar page+home page -> Add from calendar, display in home
//   -User can input + change dates 
//   -Alerts based on when they are meant to occur
//   -Recurring notifications
//   -Colors + Styling will obv be changed 
//   -Add checkbox for user to select what type of notification they want 

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';
import FloatingButton from "../../FloatingButton/FloatingButton";

// Notification Components
import ListItems from '../../Notifications/ListItems';
import InputModal from '../../Notifications/InputModal';
import {List} from 'native-base';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import stringifySafe from "react-native/Libraries/Utilities/stringifySafe";


function Home(props) {
    const {navigation} = props
    const [appReminder, setAppReminder] = React.useState(null);
    const [medReminder, setMedReminder] = React.useState(null);
    // get all reminders
    const initialTodos = [];
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

    function fillTodos(){
        if(appReminder) {
            let val;

            let maxsize= appReminder.length;
            for (let userObject of appReminder) {
                maxsize--;
                val += '{ "title" : ' + JSON.stringify(userObject.purpose) + ', "date" : ' + JSON.stringify(userObject.start) + ', "key" : ' + maxsize.toString() +'},';
            };
            val=val.slice(0,-1);
            val=val.substring(9);
            initialTodos.push(val);
        }
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
                        <ListItems
                            todos={todos}
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