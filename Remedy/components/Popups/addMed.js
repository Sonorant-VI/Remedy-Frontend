import React, { useState } from 'react';
import {Modal, Text} from 'react-native';

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
                <ModalContainer>
                    <ModalView>
                        <ModalIcon>
                            <HeaderTitle>Add Medicationsss!</HeaderTitle>
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
                        <Text>Brand Name : </Text>
                        <TextInput placeholder="Enter brand name..." onChangeText={(brandName) => {
                            setBrandName(brandName);
                         }}/>
                        <Text>Generic Name : </Text>
                        <TextInput placeholder="Enter generic name..." onChangeText={(genericName) => {
                            setBrandName(genericName);
                         }}/>
                    
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
            </Modal>
        </>

    );
}

export default AddMed;