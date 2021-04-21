
// Notifications TODO List
//   -Seperate system into the calendar page+home page -> Add from calendar, display in home
//   -User can input + change dates 
//   -Alerts based on when they are meant to occur
//   -Recurring notifications
//   -Colors + Styling will obv be changed 
//   -Add checkbox for user to select what type of notification they want 

import React, {useState ,useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import styles from './styles';
import FloatingButton from "../../FloatingButton/FloatingButton";

// Notification Components
import ListItems from '../../Notifications/ListItems';
import InputModal from '../../Notifications/InputModal';
import { List } from 'native-base';
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";


// To enable push notification you should have an expo account and being login with
// also push notification doesn't work on  simulators  only on physical devices
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
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
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


function Home(props) {
  const { navigation } = props

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


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
          onPress={() => navigation.navigate('CalendarPage')}>
          <Text style={styles.buttonText}>Go to Calendar Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={async()=>{
              await schedulePushNotification();
            }} >
          <Text style={styles.buttonText}>send notification</Text>
        </TouchableOpacity>
     </View>
    </View>
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