// Notifications TODO List
//   -Seperate system into the calendar page+home page -> Add from calendar, display in home
//   -User can input + change dates 
//   -Alerts based on when they are meant to occur
//   -Recurring notifications
//   -Colors + Styling will obv be changed 
//   -Add checkbox for user to select what type of notification they want 

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import NotificationCalls from "../../Notifications/NotificationsCalls"
import styles from './styles';

// Notification Components
import ListItems from '../../Notifications/ListItems';
import InputModal from '../../Notifications/InputModal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from 'moment';
import axios from "axios";


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
                date=Moment(date).format("dd.mm.yyyy hh:MM:ss");
                obj.title=userObject.purpose;
                obj.text=userObject.reminder_msg;
                obj.key=i;
                obj.date=date;
                todo.push(obj);
            };
        }
        return todo;
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
                            todos={fillTodos()}
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