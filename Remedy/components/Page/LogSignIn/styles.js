import { Row } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ebebeb'
    },
    text: {
      color: '#101010',
      fontSize: 36,
      fontWeight: 'bold',
      margin: 25
    },
    accountInfo: {
      color: '#101010',
      fontSize: 24,
      fontWeight: 'bold',
      margin: 5,
      borderWidth: 1,
      borderColor: 'black',
      padding: 7,
      width: 290,
      height: 40,
      backgroundColor: 'white',
    },
    logo: {
      resizeMode: "contain",
      height: 195,
      width: 300,
      marginVertical: 30,
      justifyContent: "center",
    },
    error:{
        color:'#cc0000',
        fontSize: 18,
    },
    role: {
      color: '#101010',
      fontSize: 24,
      fontWeight: 'bold',
      margin: 5,
    },
    accountInfoBox: {
      flexDirection: "row"
    },
    buttonContainer: {
      backgroundColor: '#222',
      borderRadius: 5,
      padding: 10,
      margin: 20
    },
    buttonText: {
      textAlign: "center",
      fontSize: 20,
      color: '#fff'
    },
    signUpBox: {
      width: 300
    },
    logInBox: {
      width: 300
    },
    radioButtonContainer: {
      flexDirection: "row"
    },
    label: {
      color: '#2c2c2c',
      fontSize: 22,
    },
    desc: {
      marginBottom: 8,
      color: "#808080"
    },
  });

export default styles;