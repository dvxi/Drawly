import { useCallback, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Canvas, Skia, SkiaView, Path, useDrawCallback, useTouchHandler } from '@shopify/react-native-skia';
import styles from './DrawingScreen.style';

const Drawing = () => {
  const touchState = useRef(false);
  const canvas = useRef();
  const currentPath = useRef();
  const [completedPaths, setCompletedPaths] = useState([]);

  const updatePaths = () => {
    if (!currentPath.current) return;
    let updatedPaths = {
      path: currentPath.current?.path.copy(),
      paint: currentPath.current?.paint.copy()
    };
    setCompletedPaths(completedPaths => [...completedPaths, updatedPaths]);
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
      paint.setColor(Skia.Color("black"));
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
    canvas.current = _canvas;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  )
};

export default Drawing;
