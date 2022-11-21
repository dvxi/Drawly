import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#1C1C1E',
      paddingHorizontal: 30,
      height: '100%'
    },
		canvasContainer: {
			width: '100%',
      height: '50%',
      backgroundColor: '#3A3A3C',
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 1,
      alignSelf: 'center',
      marginVertical: 10
		},
		drawingBoard: {
			height: '100%',
			width: '100%',
			zIndex: 10
		},
		canvas: {
			height: '100%',
      width: '100%',
      position: 'absolute'
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
          fontWeight: 'bold',
          textAlign: 'center'
        },
      },
      title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
        marginVertical: 5,
      },
      bigTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28,
        marginVertical: 5,
      },
      secondary: {
        color: "#8E8E93",
        fontSize: 14,
        marginVertical: 10,
      },
      center: {
        textAlign: 'center'
      }
    },
    button: {
      main:{
        active: {
          backgroundColor: '#FF8854',
          padding: 20,
          borderRadius: 15,
        },
        disabled: {
          backgroundColor: '#8E8E93',
          padding: 20,
          borderRadius: 15,
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
        },
        wide: {
          borderColor: '#FF8854',
          borderWidth: 1,
          padding: 10,
          borderRadius: 15,
          alignItems: 'center',
          marginVertical: 10
        }
      },
      pressed: { backgroundColor: '#D17045' }
    },
    row: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    progressContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      marginVertical: 10
    },
    progressStatus: {
      marginVertical: 45,
      marginHorizontal: 25
    },
    progressText: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'white'
    },
    additionalMargin: { marginTop: 20 }
});