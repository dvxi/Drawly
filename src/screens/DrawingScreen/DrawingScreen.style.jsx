import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
		canvasContainer: {
			width: '50%',
      height: '50%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 1,
      alignSelf: 'center'
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
		}
});