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
      marginBottom: 30
		},
    mb3: {
      marginBottom: 30
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
    textMedium: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
    textBigTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 28,
      marginVertical: 5,
    },
    textTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 19,
      marginVertical: 15,
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
        alignItems: 'center'
      },
      secondary: {
        borderColor: '#FF8854',
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        width: '48%'
      }
    },
    row: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
});