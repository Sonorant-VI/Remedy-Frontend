import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {TextInput} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


// import Icon from 'react-native-vector-icons/Ionicons';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

import axios from "axios";
import {useEffect} from "react";
import { startClock } from 'react-native-reanimated';

import {Restart} from 'fiction-expo-restart';

function LogIn({navigation}) {
    const [userEmail, setUserEmail] = React.useState()
    const [userPassword, setUserPassword] = React.useState()
    const [errorSign, setErrorSign] = React.useState()

    let logoPath = require('../../../assets/logo-circle.png');

    function sendLogin() {
        clearAll();
        axios.post('http://sonorant-vi.herokuapp.com/api/auth/login', {
            email: userEmail,
            password: userPassword
        }).then(async (res) => {
            const token = ["jwt", res.data.jwt]
            const uid = ["uid", JSON.stringify(res.data.id)]
            try {
                await AsyncStorage.multiSet([token, uid]);
                Restart();
            } catch (e) {
                console.log(e);
            }
        }).catch(function (error) {
            setErrorSign(JSON.parse(error.request.response).message);
        });

    }


    return (
        <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingTop: 80, backgroundColor: '#ebebeb'}} behavior="padding" enabled keyboardVerticalOffset={0}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.logInBox}>
                        <Image style={styles.logo} source={logoPath}/>
                        <Text style={styles.error}>{errorSign}</Text>
                        <View style={styles.accountInfoBox}>
                            <TextInput style={styles.accountInfo} placeholder="email" onChangeText={(email) => {
                                setUserEmail(email);
                            }}/>
                        </View>
                        <View style={styles.accountInfoBox}>
                            <TextInput style={styles.accountInfo} placeholder="password" secureTextEntry={true} onChangeText={(password) => {
                                setUserPassword(password);
                            }}/>
                        </View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => sendLogin()}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>


    );
}


async function clearAll (){
    try {
        await AsyncStorage.clear();
    } catch(e) {
        // clear error
    }
    console.log(' cleaning of async storage Done.');
}

function SignUp(props) {
    const {navigation} = props
    const [userEmail, setUserEmail] = React.useState()
    const [userPassword, setUserPassword] = React.useState()
    const [userRole, setUserRole] = React.useState('user')
    const [errorLog, setErrorLog] = React.useState()
    const toggleSwitch = () => (previousState => !previousState)

    function sendRegister({navigation}) {
        clearAll();
        switch (userRole) {
            case "user":
                setUserRole("passive");
            case "authUser":
                setUserRole("active");
            case "doctor":
                setUserRole("passive");
            default:
                setUserRole("passive");
        }
        console.log(userRole,userEmail,userPassword);
        axios.post('http://sonorant-vi.herokuapp.com/api/auth/register', {
            email: userEmail,
            password: userPassword,
            role: userRole
        }).then(async (res) => {
            const token = ["jwt", res.data.jwt]
            const uid = ["uid", JSON.stringify(res.data.id)]
            try {
                await AsyncStorage.multiSet([token, uid])
            } catch (e) {
                console.log(e);
            }
        }).catch(function (error) {
            setErrorLog(JSON.parse(error.request.response).message);
        });
    }

    return (
        <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingTop: 80, backgroundColor: '#ebebeb'}} behavior="padding" enabled keyboardVerticalOffset={0}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text}>Sign Up</Text>
                    <Text style={styles.error}>{errorLog}</Text>
                    <View style={styles.signUpBox}>
                        <View style={styles.accountInfoBox}>
                            <TextInput style={styles.accountInfo} placeholder="email" onChangeText={(email) => {
                                setUserEmail(email);
                            }}/>
                        </View>
                        <View style={styles.accountInfoBox}>
                            <TextInput style={styles.accountInfo} placeholder="password" secureTextEntry={true} onChangeText={(password) => {
                                setUserPassword(password);
                            }}/>
                        </View>
                        <View style={styles.accountInfoBox}>
                            <TextInput style={styles.accountInfo} placeholder="check password" secureTextEntry={true}/>
                        </View>
                        <Text style={styles.role}>role</Text>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton
                                value="user"
                                status={userRole === 'user' ? 'checked' : 'unchecked'}
                                onPress={() => {setUserRole('user');
                                console.log(userRole);
                                }}
                            />
                            <TouchableOpacity onPress={() => setUserRole('user')}>
                                <Text style={styles.label}>Active User</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <Text style={styles.desc}>add descriptions..</Text> */}
                        <View style={styles.radioButtonContainer}>
                            <RadioButton
                                value="authUser"
                                status={userRole === 'authUser' ? 'checked' : 'unchecked'}
                                onPress={() =>{ setUserRole('authUser');
                                    console.log(userRole);
                                }}
                            />
                            <TouchableOpacity onPress={() => setUserRole('authUser')}>
                                <Text style={styles.label}>Passive User</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <Text style={styles.desc}>add descriptions..</Text> */}

                        {/* <Text style={styles.desc}>add descriptions..</Text> */}
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => sendRegister()}
                        >
                            <Text style={styles.buttonText}>SignUp</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate('LogIn')}
                        >
                            <Text style={styles.buttonText}>Already have an account?</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


function LogSignIn() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false}}
            />
          </Stack.Navigator>
    );
}

export default LogSignIn