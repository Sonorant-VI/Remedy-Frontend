import React, { useState } from 'react';
import {Modal, Text, Button, Alert, ScrollView} from 'react-native';

import {ModalButton, ModalContainer, ModalView, StyledInput, ModalAction, ModalActionGroup, ModalIcon, HeaderTitle, colors, styles} from "../Popups/styles";
import {AntDesign} from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {TextInput} from 'react-native-gesture-handler';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddApp = ({modalVisible, setModalVisible}) => {

    const [date, setDate] = useState(new Date())
    const [purpose, setPurpose] = React.useState()

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
            setModalVisible(false); 
    }
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
        return userId;
    }

    async function sendCreateAppReminder() {

        //console.log(brand);
        //console.log(generic);
        console.log(date);
        
        const localToken = await getJwt();
        const id = await getUserId();
        //console.log(localToken);

        axios.post('http://sonorant-vi.herokuapp.com/api/appReminder/',{
            start:date,
            stop:'2021-12-12 12:00:00',
            timeout: 10,
            purpose: purpose,
            cancelled:'0',
            reminderMsg:'Appointment soon',
            patientId:id
        },
        {
            headers: {
              token: localToken
        }
        }).then((res)=>{
            Alert.alert('Reminder added!')
        }).catch(function (error) {
            console.log(error.response.request._response);
        });
    }

    return (
        <> 
            <TouchableOpacity 
              style={styles.whiteButton}
              onPress={() => {setModalVisible(true)}}>
                <AntDesign name="plus" size={30} color={colors.primary}/>
            <Text style={styles.whiteBtnText}>Appointment</Text>
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
                            <HeaderTitle>Add Appointments!</HeaderTitle>
                            <AntDesign name="edit" size={30} color={colors.tertiary}/>
                        </ModalIcon>
               
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

                {/* <StyledInput
                    placeholder="Add a todo"
                    placeholderTextColor={colors.alternative}
                    selectionColor={colors.secondary}
                    autoFocus={true}
                    onChangeText={(text) => settodoInputValue(text)}
                    value={todoInputValue}
                    onSubmiteEditing={handleSubmit}
                /> */}
                <Text style={styles.textInputHeader}>Purpose</Text>
                <TextInput style={styles.textInput} placeholder="Enter purpose..." onChangeText={(purpose) => {
                        setPurpose(purpose);
                }}/>
                <Button 
                        onPress={sendCreateAppReminder}
                        title="Create App Reminder"
                        color="#0c6d3f"
                        accessibilityLabel="Learn more about this purple button"
                        //onPress={() => Alert.alert('Reminder added!')}
                        />

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
        </>

    );
}

export default AddApp;