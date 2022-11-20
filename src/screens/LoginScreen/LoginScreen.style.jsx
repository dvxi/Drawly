import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    gradient: {
      position:'absolute',
      bottom: 0,
      width: '100%',
      height: '100%'
    },
    container: {
      backgroundColor: '#1C1C1E',
      height: '100%',
      paddingHorizontal: 30,
    },
    subcontainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    text: {
      medium: {
        active: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold'
        },
        disabled: {
          color: '#3A3A3C',
          fontSize: 16,
          fontWeight: 'bold'
        },
      },
      title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
        marginVertical: 5,
      },
      secondary: {
        color: "#8E8E93",
        fontSize: 14,
        marginVertical: 10,
      }
    },
    button: {
      main:{
        active: {
          backgroundColor: '#FF8854',
          padding: 20,
          borderRadius: 15,
          marginVertical: 20,
        },
        disabled: {
          backgroundColor: '#8E8E93',
          padding: 20,
          borderRadius: 15,
          marginVertical: 20,
        },
      },
      secondary: {
        active: {
          borderColor: '#FF8854',
          borderWidth: 1,
          padding: 10,
          borderRadius: 15,
          alignItems: 'center',
          width: '48%',
          marginVertical: 10
        }
      },
      pressed: { backgroundColor: '#D17045' }
    }
});