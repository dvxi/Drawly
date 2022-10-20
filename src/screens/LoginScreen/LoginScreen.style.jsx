import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    gradient: {
      position:'absolute',
      bottom: 0,
      width: '100%',
      height: '100%'
    },
    container: {
      backgroundColor: '#1C1C1EDD',
      height: '100%',
      paddingHorizontal: 30,
    },
    subcontainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    textMedium: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
    textTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 19,
      marginVertical: 5,
    },
    textSecondary: {
      color: "#8E8E93",
      fontSize: 14,
      marginVertical: 5,
    },
    button: {
      main: {
        backgroundColor: '#FF8854',
        padding: 20,
        borderRadius: 15,
        marginVertical: 10,
      },
      secondary: {
  
      }
    }
});