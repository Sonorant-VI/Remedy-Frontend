import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ebebeb',
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
        fontSize: 18,
        marginTop: 0
    },
    medHeadLine:{
        marginTop:-5
    }
  });

export default styles;