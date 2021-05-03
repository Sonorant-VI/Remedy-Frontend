import React, {useEffect, useRef, useState} from 'react';
import {Modal, Text, Button, Alert, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';

import {ModalButton, ModalContainer, ModalView, StyledInput, ModalAction, ModalActionGroup, ModalIcon, HeaderTitle, colors, styles} from "../Popups/styles";
import {AntDesign} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-gesture-handler';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

const AddMed = ({modalVisible, setModalVisible}) => {
    const [date, setDate] = useState(new Date())
    const [brand, setBrandName] = React.useState()
    const [generic, setGenericName] = React.useState()
    const [message, setMessage] = React.useState()

    // const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('dateTime')
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'android');
        setDate(currentDate);
      };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

      const showDatepicker = () => {
        showMode('date');
      };

      const showTimepicker = () => {
        showMode('time');
      };

    const handleCloseModal = () => {
        setModalVisible(false); }
    //     settodoInputValue("");
    //     setTodoToBeEdited(null);
    // }

    // const handleSubmit = () => {

    //     if(!todoToBeEdited) {
    //         handleAddTodo({
    //             title: todoInputValue,
    //             date: new Date().toUTCString(),
    //             key: `${(todos[todos.length-1] && parseInt(todos[todos.length -1].key) + 1) || 1 }`
    //         });
    //     } else {
    //         handleEditTodo({
    //             title: todoInputValue,
    //             date: todoToBeEdited.date,
    //             key: todoToBeEdited.key
    //         })
    //     }


    //     settodoInputValue("");
    // }
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    // TODO: add parameters for H, M, title, body
    async function schedulePushNotification(x) {
        Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'new Notification ;) ',
                data: {data: 'goes here'},
            },
            trigger: {
                hours: currentHour + difference,
                minutes: currentMinutes + difference,
                repeats: true },
        });
    }

    const getJwt = async () => {
        let value;
        try {
            value = await AsyncStorage.getItem('jwt');
        } catch(e) {
            console.log("couldn't acces to jwt in local storage");
        }
        console.log(value);
        return value;
    }

    const getUserId = async () => {
        let userId;
        try {
            userId = await AsyncStorage.getItem('uid');
        } catch(e) {
            console.log("Couldn't access the user id in local storage");
        }
        return userId.toString();
    }
    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
           await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }
    async function sendCreateReminder() {

        //console.log(brand);
        //console.log(generic);
        const localToken = await getJwt();
        const id = await getUserId();
        console.log(registerForPushNotificationsAsync());
        console.log(id);
        // TODO: probably move it to ".then" & add parameters
        schedulePushNotification(1);

        axios.post('http://sonorant-vi.herokuapp.com/api/medReminder/',{
            time:date,
            brandName:brand,
            genericName:generic,
            reminderMsg: message,
            patientId:id
        },
        {
            headers: {
              token: localToken
            }
        }).then((res)=>{
            let startDate= res.data.time;
            // TODO: calculate H & M dif and move "schedule..." function here
            // res.data.time - current time =
            Alert.alert('Reminder added!')
        }).catch(function (error) {
            console.log(error.response.request._response);
        });
    }


    return (

        <>
            <ScrollView>
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={() => {setModalVisible(true)}}>
                <AntDesign name="plus" size={30} color={colors.primary}/>
                <Text style={styles.whiteBtnText}>Medication</Text>
            </TouchableOpacity>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <ScrollView style={styles.scrollView}>
                <ModalContainer>

                    <ModalView>
                        <ModalIcon>
                            <HeaderTitle>Add Medications</HeaderTitle>
                        </ModalIcon>
                        {/* <DatePicker
                            mode="time"
                            date={date}
                            onDateChange={setDate}
                        /> */}
                        {modalVisible && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="datetime"
                            is24Hour={true}
                            display="spinner"
                            onChange={onChange}
                            />
                        )}
                        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}
                                               style={styles.container}>
                        <Text style={styles.textInputHeader}>Brand Name</Text>
                        <TextInput style={styles.textInput} placeholder="Enter brand name..." onChangeText={(brand) => {
                            setBrandName(brand);
                         }}/>
                        <Text style={styles.textInputHeader}>Generic Name</Text>
                        <TextInput style={styles.textInput} placeholder="Enter generic name..." onChangeText={(generic) => {
                            setGenericName(generic);
                         }}/>
                         <Text style={styles.textInputHeader}>Reminder Message</Text>
                        <TextInput style={styles.textInput} placeholder="Enter reminder message..." onChangeText={(message) => {
                            setMessage(message);
                         }}/>

                        <Button
                        onPress={sendCreateReminder}
                        title="Create Reminder"
                        color="#0c6d3f"
                        accessibilityLabel="Learn more about this purple button"
                        //onPress={() => Alert.alert('Reminder added!')}
                        />
                        </KeyboardAvoidingView>


                        {/* <StyledInput
                            placeholder="Add a todo"
                            placeholderTextColor={colors.alternative}
                            selectionColor={colors.secondary}
                            autoFocus={true}
                            onChangeText={(text) => settodoInputValue(text)}
                            value={todoInputValue}
                            onSubmiteEditing={handleSubmit}
                        /> */}
                        <ModalActionGroup>
                            <ModalAction color={colors.primary} onPress={handleCloseModal}>
                                <AntDesign name="close" size={28} color={colors.tertiary}/>
                            </ModalAction>
                            {/* <ModalAction color={colors.tertiary} onPress={handleSubmit}>
                                <AntDesign name="check" size={28} color={colors.secondary}/>
                            </ModalAction> */}
                        </ModalActionGroup>
                    </ModalView>
                </ModalContainer>
                </ScrollView>
            </Modal>
            </ScrollView>
        </>

    );
}
export default AddMed;