import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    elementsContainer: {
      marginBottom: 24,
      marginRight: 15,
      marginLeft: 15,
      width: '95%',
    },
    text: {
      color: '#101010',
      fontSize: 24,
      fontWeight: 'bold'
    },
    buttonContainer: {
      backgroundColor: '#222',
      borderRadius: 5,
      padding: 10,
    },
    buttonRow: {
      flexDirection: "row",
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
    },
  });

export default styles;