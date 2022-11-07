import { useCallback, useRef, useState } from 'react';
import { SafeAreaView, View, Pressable, Text } from 'react-native';
import { Canvas, Skia, SkiaView, Path, useDrawCallback, useTouchHandler } from '@shopify/react-native-skia';
import styles from './DrawingScreen.style';
import strings from '../../const/strings.const';
import exportGCode from '../../utilities/exportGCode';

const Drawing = () => {
  const touchState = useRef(false);
  const canvas = useRef();
  const currentPath = useRef();
  const [completedPaths, setCompletedPaths] = useState([]);
  const [changesHistory, setChangesHistory] = useState({ undo:[], redo:[]});

  const updatePaths = () => {
    if (!currentPath.current) return;
    canvas.current.clear(Skia.Color("#FFFFFF00"));
    let updatedPaths = {
      path: currentPath.current?.path.copy(),
      paint: currentPath.current?.paint.copy()
    };
    setCompletedPaths(completedPaths => [...completedPaths, updatedPaths]);
    setChangesHistory(({undo, redo}) => ({ undo: [...undo, updatedPaths], redo:[...redo]}));
  };

  const onDrawingActive = useCallback((touchInfo) => {
    const {x, y} = touchInfo;
    if (!currentPath.current?.path) return;
    if (touchState.current) {
      currentPath.current.path.lineTo(x, y);
      if (currentPath.current) {
        canvas.current?.drawPath(
          currentPath.current.path,
          currentPath.current.paint,
        );
      }
    }
  }, []);

  const onDrawingStart = useCallback(
    (touchInfo) => {
      if (currentPath.current) return;
      const { x, y } = touchInfo;

      const paint = Skia.Paint();
      paint.setColor(Skia.Color("#FFFFFF"));
      paint.setStyle(1);
      paint.setStrokeWidth(5);
      
      currentPath.current = {
        path: Skia.Path.Make(),
        paint
      };

      touchState.current = true;
      currentPath.current.path?.moveTo(x, y);

      if (currentPath.current) {
        canvas.current?.drawPath(currentPath.current.path, currentPath.current.paint);
      }
    },
    [],
  );

  const onDrawingFinished = useCallback(() => {
    updatePaths();
    currentPath.current = null;
    touchState.current = false;
  }, []);

  const touchHandler = useTouchHandler({
    onActive: onDrawingActive,
    onStart: onDrawingStart,
    onEnd: onDrawingFinished,
  });

  const onDraw = useDrawCallback((_canvas, info) => {
    touchHandler(info.touches);

    if (!canvas.current) {
      canvas.current = _canvas;
    }
  }, []);

  const undoChanges = () => {
    if (changesHistory.undo.length < 1) return;
    let undoPath = changesHistory.undo[changesHistory.undo.length - 1];

    setChangesHistory(({undo, redo}) => ({undo: [...undo.slice(0,-1)], redo:[...redo, undoPath]}));
    setCompletedPaths(completedPaths => [...completedPaths.slice(0,-1)]);
  }

  const redoChanges = () => {
    if (changesHistory.redo.length < 1) return;
    let redoPath = changesHistory.redo[changesHistory.redo.length - 1];
    
    setChangesHistory(({undo, redo}) => ({undo: [...undo, redoPath], redo:[...redo.slice(0,-1)]}));
    setCompletedPaths(completedPaths => [...completedPaths, redoPath]);
  }

  const convertSVG = () => {
    let svgArray = [];

    completedPaths.map((path) => (
      svgArray.push(path.path.toSVGString())
    ));

    exportGCode(svgArray);
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.textBigTitle}>{strings.drawingScreen.greeting.title}</Text>
          <Text style={styles.textSecondary}>{strings.drawingScreen.greeting.text}</Text>
          <Text style={styles.textTitle}>{strings.drawingScreen.drawingCanvas.title}</Text>
          <View style={styles.canvasContainer}>
            <SkiaView
              onDraw={onDraw}
              style={styles.drawingBoard}
            />
            <Canvas style={styles.canvas}>
              {completedPaths?.map((path) => (
                <Path
                  key={path.path.toSVGString()}
                  path={path.path}
                  paint={{ current: path.paint }}
                />
              ))}
            </Canvas>
          </View>
          <View style={styles.row}>
            <Pressable style={styles.button.secondary} onPress={undoChanges}>
                <Text style={styles.textMedium}>{strings.drawingScreen.undoButton.text}</Text>
            </Pressable>
            <Pressable style={styles.button.secondary} onPress={redoChanges}>
                <Text style={styles.textMedium}>{strings.drawingScreen.redoButton.text}</Text>
            </Pressable>
          </View>
          <Pressable style={styles.button.main} onPress={convertSVG}>
            <Text style={styles.textMedium}>{strings.drawingScreen.confirmButton.text}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
  )
};

export default Drawing;
