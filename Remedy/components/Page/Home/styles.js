import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    text: {
      color: '#101010',
      fontSize: 24,
      fontWeight: 'bold',
    },
    buttonContainer: {
      backgroundColor: '#222',
      borderRadius: 5,
      padding: 10,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    },
    elementsContainer: {
      marginBottom: 24,
      marginRight: 15,
      marginLeft: 15,
      marginTop: 5,
      width: '95%',
    },
    headlineTitle:{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 0,
      marginBottom: 10,
    },
    medHeadLine:{
      marginTop:-5
    },
    headlineBox: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    divider: {
      marginBottom: 5,
      borderBottomWidth: 1,
      borderColor: 'black'
    }
  });

export default styles;