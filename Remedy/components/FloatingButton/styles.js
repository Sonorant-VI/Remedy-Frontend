import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "absolute",
    },
    button: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: "#36D5F3",
        shadowOpacity: 0.3,
        shadowOffset: { height : 10 },
        left: 110,
    },
    menu: {
        backgroundColor: "#36D5F3",
    },
    seconday: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: "#FFF",
    }
  });

export default styles;