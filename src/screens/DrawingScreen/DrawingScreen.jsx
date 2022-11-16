import { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Pressable, Text } from 'react-native';
import { Canvas, Skia, SkiaView, Path, useDrawCallback, useTouchHandler } from '@shopify/react-native-skia';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios';
import styles from './DrawingScreen.style';
import strings from '../../const/strings.const';
import exportGCode from '../../utilities/exportGCode';

const Drawing = ({ navigation, route }) => {

  const touchState = useRef(false);
  const canvas = useRef();
  const currentPath = useRef();
  const [completedPaths, setCompletedPaths] = useState([]);
  const [changesHistory, setChangesHistory] = useState({ undo: [], redo: [] });
  const [hideButtons, setHideButtons] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [jobID, setJobID] = useState(0);

  const restartCanvas = () => {
    setCompletedPaths([]);
    setChangesHistory({ undo: [], redo: [] });
    setHideButtons(false);
  };

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
    if (hideButtons) return;
    touchHandler(info.touches);

    if (!canvas.current) {
      canvas.current = _canvas;
    }
  }, [hideButtons]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (hideButtons) {
        let config = {
          method: 'get',
          url: 'https://http-nodejs-production-5172.up.railway.app/listJob'.concat('/', jobID),
        };
        
        axios(config)
          .then((job) => {
            setPercentage(parseFloat(job.data.progress));
            setStatusText("Status: " + strings.drawingScreen.status[job.data.status]);
          })
          .catch((error) => console.log(error));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [jobID, percentage]);

  const convertSVG = () => {
    setHideButtons(true);
    let svgArray = [];

    completedPaths.map((pathData) => svgArray.push(pathData.path.toSVGString()));

    // exportGCode(svgArray);

    let data = JSON.stringify({
      "username": route.params.name,
      "printerID": route.params.printerID,
      "paths": svgArray.join(';')
    });
    
    let config = {
      method: 'post',
      url: 'https://http-nodejs-production-5172.up.railway.app/newJob',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };
    
    axios(config)
      .then(async (response) => setJobID(response.data["job_id"]))
      .catch((error) => console.log(error));
  }

  const renderProgressStatus = () => (
    <View style={styles.progressStatus}>
      <Text style={styles.progressText}>
        {percentage}%
      </Text>
    </View>
  );

  const isDisabled = percentage < 100;

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {hideButtons ? null : (
            <>
              <Text style={styles.textBigTitle}>
                {strings.drawingScreen.greeting.title}{route.params.name}
              </Text>
              <Text style={styles.textSecondary}>
                {strings.drawingScreen.greeting.text}
              </Text>
            </>
          )}
          <Text style={styles.textTitle}>
            {
              hideButtons ? 
                strings.drawingScreen.drawingCanvas.printingTitle 
                : 
                strings.drawingScreen.drawingCanvas.title
            }
          </Text>
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
          {hideButtons ? (
            <View style={styles.progressContainer}>
              <AnimatedCircularProgress
                size={120}
                width={15}
                rotation={0}
                fill={percentage}
                tintColor="#00E0FF"
                backgroundColor="#000000"
                renderCap={renderProgressStatus}
              />
              <Text style={[styles.textMedium, styles.additionalMargin]}>{statusText}</Text>
              <Pressable 
                disabled={isDisabled}
                onPress={restartCanvas}
                style={[styles.button.main, styles.additionalMargin]}
              >
                <Text style={styles.textMedium}>Stwórz nowe ciastko</Text>
              </Pressable>
            </View>
          ) : (
            <>
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
            </>
          )}
        </View>
      </SafeAreaView>
  )
};

export default Drawing;
