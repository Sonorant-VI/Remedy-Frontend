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
      fontSize: 24,
      fontWeight: 'bold',
      margin: 20
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
    radioButtonContainer: {
      flexDirection: "row"
    },
    label: {
      margin: 8,
      color: '#2c2c2c',
    },
    desc: {
      marginBottom: 8,
      color: "#808080"
    },
  });

export default styles;