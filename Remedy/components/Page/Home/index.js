// Notifications TODO List
//   -Seperate system into the calendar page+home page -> Add from calendar, display in home
//   -User can input + change dates 
//   -Alerts based on when they are meant to occur
//   -Recurring notifications
//   -Colors + Styling will obv be changed 
//   -Add checkbox for user to select what type of notification they want 

import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import FloatingButton from "../../FloatingButton/FloatingButton";

// Notification Components
import ListItems from '../../Notifications/ListItems';
import InputModal from '../../Notifications/InputModal';
import { List } from 'native-base';


function Home(props) {
  const { navigation } = props

  // initial notifications
  const initialTodos = [{
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
    
      <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}} />
    
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.buttonText}>Go to Calendar Screen</Text>
        </TouchableOpacity>
     </View>
    </View>
    <FloatingButton style={{ bottom: 80}} />
  </View>

  <InputModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      todoInputValue={todoInputValue}
      settodoInputValue={settodoInputValue}
      handleAddTodo={handleAddTodo}
      todoToBeEdited={todoToBeEdited}
      setTodoToBeEdited={setTodoToBeEdited}
      handleEditTodo={handleEditTodo}
      todos={todos}
    />

     
  </>


  )
}

export default Home;