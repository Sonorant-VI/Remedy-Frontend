import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {TextInput} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

import axios from "axios";


function LogIn() {
    const [userEmail, setUserEmail] = React.useState()
    const [userPassword, setUserPassword] = React.useState()

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

    function sendLogin() {
        axios.post('http://localhost:3000/api/auth/login',{
            email:userEmail,
            password:userPassword
        }).then((res)=>{
            AsyncStorage.setItem('jwt',res.data.jwt);
            AsyncStorage.setItem('user',res.data.email);
        }).catch(function (error) {
            console.log(error.response.request._response);
        });
    }



    return (
        <View style={styles.container}>
            <Text style={styles.text}>Log In</Text>
            <View style={styles.logInBox}>
                <Text>email</Text>
                <TextInput placeholder="input email"  onChangeText={(email) => {
                    setUserEmail(email);
                }}/>
                <Text>password</Text>
                <TextInput placeholder="input password" onChangeText={(password) => {
                    setUserPassword(password);
                }}/>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => sendLogin()}
                >
                    <Text style={styles.buttonText}>LogIn</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function SignUp(props) {
    const {navigation} = props
    const [userEmail, setUserEmail] = React.useState()
    const [userPassword, setUserPassword] = React.useState()
    const [userRole, setUserRole] = React.useState('user')
    const toggleSwitch = () => (previousState => !previousState)

    function sendRegister() {
        switch (userRole){
            case "user": setUserRole("passive");
            case "authUser": setUserRole("active");
            case "doctor": setUserRole("passive");
            default:setUserRole("passive");
        }
        axios.post('http://localhost:3000/api/auth/register', {
            email: userEmail,
            password: userPassword,
            role: userRole
        }).then((res) => {
          AsyncStorage.setItem('jwt',res.data.jwt);
          AsyncStorage.setItem('user',res.data.email);
        }).catch(function (error) {
            console.log(error.response.request._response);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
            <View style={styles.signUpBox}>
                <Text>email</Text>
                <TextInput placeholder="input email" onChangeText={(email) => {
                    setUserEmail(email);
                }}/>
                <Text>password</Text>
                <TextInput placeholder="input password" onChangeText={(password) => {
                    setUserPassword(password);
                }}/>
                <Text>check password</Text>
                <TextInput placeholder="check password"/>
                <Text>role</Text>
                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        value="user"
                        status={userRole === 'user' ? 'checked' : 'unchecked'}
                        onPress={() => setUserRole('user')}
                    />
                    <TouchableOpacity onPress={() => setUserRole('user')}>
                        <Text style={styles.label}>user</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.desc}>add descriptions..</Text> */}
                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        value="authUser"
                        status={userRole === 'authUser' ? 'checked' : 'unchecked'}
                        onPress={() => setUserRole('authUser')}
                    />
                    <TouchableOpacity onPress={() => setUserRole('authUser')}>
                        <Text style={styles.label}>authenticated user</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.desc}>add descriptions..</Text> */}
                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        value="doctor"
                        status={userRole === 'doctor' ? 'checked' : 'unchecked'}
                        onPress={() => setUserRole('doctor')}
                    />
                    <TouchableOpacity onPress={() => setUserRole('doctor')}>
                        <Text style={styles.label}>doctor</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.desc}>add descriptions..</Text> */}
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => sendRegister()}
                >
                    <Text style={styles.buttonText}>SignUp</Text>

                </TouchableOpacity>
            </View>
        </View>
    );
}

function LogSignIn() {
    const Tab = createBottomTabNavigator();


    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'LogIn') {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === 'SignUp') {
                        iconName = focused ? "person-add" : "person-add-outline";
                    }
                    return <Ionicons name={iconName} size={18} color={color}/>;
                },
            })}
        >
            <Tab.Screen name="LogIn" component={LogIn}/>
            <Tab.Screen name="SignUp" component={SignUp}/>
        </Tab.Navigator>
    );
}

export default LogSignIn