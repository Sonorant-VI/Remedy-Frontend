import React, { useState } from 'react';
import {Modal, Text, Button, Alert, ScrollView} from 'react-native';

import {ModalButton, ModalContainer, ModalView, StyledInput, ModalAction, ModalActionGroup, ModalIcon, HeaderTitle, colors, styles} from "../Popups/styles";
import {AntDesign} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-gesture-handler';

const AddMed = ({modalVisible, setModalVisible}) => {
    const [date, setDate] = useState(new Date())
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
    const [datetime, setDateTime] = React.useState()
    const [brand, setBrandName] = React.useState()
    const [generic, setGenericName] = React.useState()

    const getJwt = async () => {
        try {
            const value = await AsyncStorage.getItem('jwt');
            if(value !== null) {
                return value;
            }
        } catch(e) {
            console.log("couldn't acces to jwt in local storage");
        }
    }

    function sendCreateReminder() {

        axios.post('http://sonorant-vi.herokuapp.com/api/medReminder/',{
            time:'2021-01-01 12:00:00',
            brandName:brand,
            genericName:generic,
            patientId:1
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
                            onConfirm={(datetime) => {
                                setDateTime(datetime)
                            }}
                            />
                        )}
                        <Text style={styles.textInputHeader}>Brand Name</Text>
                        <TextInput style={styles.textInput} placeholder="Enter brand name..." onChangeText={(brand) => {
                            setBrandName(brand);
                         }}/>
                        <Text style={styles.textInputHeader}>Generic Name</Text>
                        <TextInput style={styles.textInput} placeholder="Enter generic name..." onChangeText={(generic) => {
                            setGenericName(generic);
                         }}/>

                        <Button 
                        onPress={sendCreateReminder}
                        title="Create Reminder"
                        color="#0c6d3f"
                        accessibilityLabel="Learn more about this purple button"
                        //onPress={() => Alert.alert('Reminder added!')}
                        />

                    
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
            
        </>

    );
}
export default AddMed;