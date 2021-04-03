import React from "react";
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native";
import { AntDesign, Entypo, Feather} from "@expo/vector-icons";

import styles from './styles';

export default class FloatingButton extends React.Component {
    animation = new Animated.Value(0)

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start();

        this.open = !this.open;
    };

    render() {
        const settingStyle = {
            transform: [
                {scale: this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -80]
                    })
                }
            ]
        };

        const helpStyle = {
            transform: [
                {scale: this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -130]
                    })
                }
            ]
        };

        const rotation = {
            transform: [{
                rotate: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })
            }
            ]
        };

        return(
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.secondary, settingStyle]}>
                        <Feather  name="settings" size={20} color="#36D5F3" 
                            onPress={ () => alert('Settings button pressed') 
                        }/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.secondary, helpStyle]}>
                        <Entypo  name="help" size={20} color="#36D5F3"
                        onPress={ () => alert('Help button pressed') 
                        }/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={[styles.button, styles.menu, rotation]}>
                        <Entypo name="menu" size={24} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
