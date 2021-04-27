import React, { useState } from 'react';
import {Modal, Text, Scrollview} from 'react-native';

import {ModalButton, ModalContainer, ModalView, StyledInput, ModalAction, ModalActionGroup, ModalIcon, HeaderTitle, colors, styles} from "../Popups/styles";
import {AntDesign} from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {TextInput} from 'react-native-gesture-handler';

const AddApp = ({modalVisible, setModalVisible}) => {

    const [date, setDate] = useState(new Date())
    const [purpose, setPurpose] = React.useState()
    const [brand, setBrandName] = React.useState()

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
                <ModalContainer>
                    <ModalView>
                        <ModalIcon>
                            <HeaderTitle>Add Appointments!</HeaderTitle>
                            <AntDesign name="edit" size={30} color={colors.tertiary}/>
                        </ModalIcon>
               

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

export default AddApp;