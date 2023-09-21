import {View, StyleSheet, Dimensions,StatusBar,Text, PanResponder,SafeAreaViewBase, Button } from "react-native";
//import { Canvas } from 'react-native-canvas';
import * as MediaLibrary from 'expo-media-library';
import { Camera,CameraType } from "expo-camera";
import { Box, Flex } from "native-base";
import React from "react";
import TouchBox from "./components/TouchBox";
import { background } from "native-base/lib/typescript/theme/styled-system";
import Canvas from 'react-native-canvas';
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";

// export default function Sensor(){
//   const [lines, setLines] = React.useState([]);
//   const canvasRef = React.useRef();

//   const handlePanResponderMove = (_, gestureState) => {
//     console.log("here")
//     const { locationX, locationY } = gestureState;
//     const newLinePoint = { x: locationX, y: locationY };
//     setLines((prevLines) => [...prevLines, newLinePoint]);
//   };

//   const clearCanvas = () => {
//     setLines([]);
//     // You may also want to clear the canvas itself, if necessary
//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext('2d');
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     }
//   };
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderMove: handlePanResponderMove,
//   });

//   return (
//     <View style={{ flex: 1 }}>
//       <Canvas
//         {...panResponder.panHandlers}
//         style={{ Flex:1, backgroundColor: 'black' }}
//         drawOnHardware
//         ref={canvasRef}

//       />
//       <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//         <Button title="Clear" onPress={clearCanvas} />
//       </View>
//     </View>
//   );
// }

export default function Sensor(){
    StatusBar.setHidden(true)
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const boxSize = 25; 
 
  //////////////////////
  const numberOfUpDownBoxes = Math.floor(screenWidth / boxSize);
  const numberOfBoxes = Math.floor(screenHeight / boxSize);
  const maxDiagonalRows = Math.floor(screenHeight / boxSize); 
  const diagonalBoxCount = Math.min(numberOfBoxes, maxDiagonalRows * 2 - 1);

  // Initialize an array of colors, one for each box
  const [boxColor, setBoxColors] = React.useState(
    Array.from({ length: diagonalBoxCount * 2 }, () => 'lightblue')
  );
  // Create an array to track box colors
  const [leftBoxesColors, setLeftBoxesColors] = React.useState(Array(numberOfBoxes).fill('lightpink'));
  const [rightBoxesColors, setRightBoxesColors] = React.useState(Array(numberOfBoxes).fill('lightpink'));
  const [topBoxesColors, setTopBoxesColor] = React.useState(Array(numberOfBoxes * 2).fill('lightpink'));
  const [bottomBoxesColors, setBottomBoxesColor] = React.useState(Array(numberOfBoxes * 2).fill('lightpink'));
  const [boxColors, setBoxColor] = React.useState(Array(numberOfBoxes * 2).fill('lightpink'));

  const handleGesture = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log(event.nativeEvent.state,"ebea")
      const touchY = event.nativeEvent.pageY;
      const containerY = event.nativeEvent.locationY;

      const rowIndex = Math.floor((touchY - containerY) / boxSize);
      console.log("ebaaaaaaaaaaa",rowIndex)

      // const rowIndex = Math.floor(y / boxSize);

      if (rowIndex >= 0 && rowIndex < numberOfBoxes) {
        const newBoxColors = [...leftBoxesColors];
        newBoxColors[rowIndex] = 'lightgreen';
        setLeftBoxesColors(newBoxColors);
      }
    }
  };

  
  // Create a PanResponder to track touch gestures
  const LeftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // Get the touch coordinates
      const { moveY } = gestureState;

      // Calculate the box index based on touch position
      const rowIndex = Math.floor(moveY / boxSize);
      console.log("row,index",rowIndex)

      // Check if the rowIndex is within bounds
      if (rowIndex >= 0 && rowIndex < (numberOfBoxes)) {
        // Create a copy of the current box colors array
        const newBoxColors = [...leftBoxesColors];

        // Update the color of the touched box to green
        newBoxColors[rowIndex] = 'lightgreen';

        // Set the updated box colors array
        setLeftBoxesColors(newBoxColors);
      }
    }
  });
  const rightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // Get the touch coordinates
      const { moveY } = gestureState;

      // Calculate the box index based on touch position
      const rowIndex = Math.floor(moveY / boxSize);
      console.log("row,index",rowIndex)

      // Check if the rowIndex is within bounds
      if (rowIndex >= 0 && rowIndex < (numberOfBoxes)) {
        // Create a copy of the current box colors array
        const newBoxColors = [...rightBoxesColors];

        // Update the color of the touched box to green
        newBoxColors[rowIndex] = 'lightgreen';

        // Set the updated box colors array
        setRightBoxesColors(newBoxColors);
      }
    },
  });
  const topPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // Get the touch coordinates
      const { moveX } = gestureState;

      // Calculate the box index based on touch position
      const rowIndex = Math.floor(moveX / boxSize);
      console.log("row,index",rowIndex)

      // Check if the rowIndex is within bounds
      if (rowIndex >= 0 && rowIndex < (numberOfUpDownBoxes)) {
        // Create a copy of the current box colors array
        const newBoxColors = [...topBoxesColors];

        // Update the color of the touched box to green
        newBoxColors[rowIndex] = 'lightgreen';

        // Set the updated box colors array
        setTopBoxesColor(newBoxColors);
      }
    },
  });
  const bottomPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // Get the touch coordinates
      const { moveX } = gestureState;

      // Calculate the box index based on touch position
      const rowIndex = Math.floor(moveX / boxSize);
      console.log("row,index",rowIndex,"bottom")

      // Check if the rowIndex is within bounds
      if (rowIndex >= 0 && rowIndex < (numberOfUpDownBoxes)) {
        // Create a copy of the current box colors array
        const newBoxColors = [...bottomBoxesColors];

        // Update the color of the touched box to green
        newBoxColors[rowIndex] = 'lightgreen';

        // Set the updated box colors array
        setBottomBoxesColor(newBoxColors);
      }
    },
  });

  const leftBoxes = [];
  for (let i = 0; i < numberOfBoxes; i++) {
    leftBoxes.push(
      <View key={i} style={[styles.box,{backgroundColor: leftBoxesColors[i]}]}>
        <Text>{i + 1}</Text>
      </View>
    );
  }
  const rightBoxes = [];
  for (let i = 0; i < numberOfBoxes; i++) {
    rightBoxes.push(
      <View  key={i} style={[styles.box,{backgroundColor: rightBoxesColors[i]}]}>
        <Text style={{color:"black"}}>{i + 1}r</Text>
      </View>
    );
  }
  const topBoxes = [];
  for (let i = 1; i < numberOfUpDownBoxes - 0.9; i++) {
    topBoxes.push(
      <View key={i} style={[styles.box,{backgroundColor: topBoxesColors[i]}]}>
        <Text style={{color:"black"}}>{i + 1}</Text>
      </View>
    );
  }
  const bottomBoxes = [];
  for (let i = 1; i < numberOfUpDownBoxes; i++) {
    bottomBoxes.push(
      <View key={i} style={[styles.box,{backgroundColor: bottomBoxesColors[i]}]}>
        <Text style={{color:"black"}}>{i + 1}</Text>
      </View>
    );
  }

  
  // Create an array of diagonal boxes
  const diagonalBoxes = [];
  for (let i = 2; i < diagonalBoxCount; i++) {
    const translateX = (i / 2) * boxSize; // Calculate horizontal position
    const translateY = (i / 100) * boxSize; // Calculate vertical position
    diagonalBoxes.push(
      <View 
        style={[styles.box, { transform: [{ translateX }, { translateY }] },{backgroundColor: boxColor[i]},]}
      ><Text style={{color:"black"}}>{i + 1}a</Text></View>
    );
  }

  const rightDiagonalBoxes = [];
  for (let i = 2; i < diagonalBoxCount; i++) {
    const translateX = (i / 2) * boxSize; // Calculate horizontal position
    const translateY = (i / 100) * boxSize; // Calculate vertical position
    rightDiagonalBoxes.push(
      <View
        key={`diagonal-${i}`}
        style={[styles.box, { transform: [{ translateX }, { translateY }]},{backgroundColor: boxColor[i]}]}
      ><Text style={{color:"black"}}>{i + 1}b</Text></View>
    );
  }

  console.log(leftBoxes.length,topBoxes.length,diagonalBoxes.length,"boxes",numberOfBoxes)
  
    // Define the positions of the touch boxes
  const boxPositions = [
    ////left top
    { top: 0, left: 0, side: "vertical" },
    // { top: 15, left: 0 },
    { top: 30, left: 0,side: "vertical" },
    //{ top: 45, left: 0 },
    { top: 60, left: 0,side: "vertical" },
    //{ top: 75, left: 0 },
    { top: 90, left: 0,side: "vertical" },
    ///{ top: 105, left: 0 },
    { top: 120, left: 0,side: "vertical" },
    //{ top: 135, left: 0 },
    { top: 150, left: 0,side: "vertical" },
    //{ top: 165, left: 0 },
    { top: 180, left: 0,side: "vertical" },
    //{ top: 195, left: 0 },
    { top: 210, left: 0,side: "vertical" },
    //{ top: 225, left: 0 },
    { top: 240, left: 0,side: "vertical" },
    //{ top: 255, left: 0 },
    { top: 270, left: 0,side: "vertical" },
    //{ top: 285, left: 0 },
    { top: 300, left: 0,side: "vertical" },
    //{ top: 315, left: 0 },
    { top: 330, left: 0,side: "vertical" },
    //{ top: 345, left: 0 },
    { top: 360, left: 0,side: "vertical" },
    //{ top: 375, left: 0 },
    { top: 390, left: 0,side: "vertical" },
    //{ top: 405, left: 0 },
    { top: 416, left: 0,side: "vertical" },
    ////left bottom
    { bottom: 0, left: 0,side: "vertical" },
    // { bottom: 15, left: 0 },
    { bottom: 30, left: 0,side: "vertical" },
    // { bottom: 45, left: 0 },
    { bottom: 60, left: 0,side: "vertical" },
    // { bottom: 75, left: 0 },
    { bottom: 90, left: 0,side: "vertical" },
    // { bottom: 105, left: 0 },
    { bottom: 120, left: 0,side: "vertical" },
    // { bottom: 135, left: 0 },
    { bottom: 150, left: 0,side: "vertical" },
    // { bottom: 165, left: 0 },
    { bottom: 180, left: 0,side: "vertical" },
    // { bottom: 195, left: 0 },
    { bottom: 210, left: 0,side: "vertical" },
    // { bottom: 225, left: 0 },
    { bottom: 240, left: 0,side: "vertical" },
    // { bottom: 255, left: 0 },
    { bottom: 270, left: 0,side: "vertical" },
    // { bottom: 285, left: 0 },
    { bottom: 300, left: 0,side: "vertical" },
    // { bottom: 315, left: 0 },
    { bottom: 330, left: 0,side: "vertical" },
    // { bottom: 345, left: 0 },
    { bottom: 360, left: 0,side: "vertical" },
    ////rigt top
    { top: 0, right: 0,side: "vertical" },
    // { top: 15, right: 0 },
    { top: 30, right: 0,side: "vertical" },
    // { top: 45, right: 0 },
    { top: 60, right: 0,side: "vertical" },
    // { top: 75, right: 0 },
    { top: 90, right: 0,side: "vertical"},
    // { top: 105, right: 0 },
    { top: 120, right: 0,side: "vertical" },
    // { top: 135, right: 0 },
    { top: 150, right: 0,side: "vertical" },
    // { top: 165, right: 0 },
    { top: 180, right: 0,side: "vertical" },
    // { top: 195, right: 0 },
    { top: 210, right: 0,side: "vertical" },
    // { top: 225, right: 0 },
    { top: 240, right: 0,side: "vertical" },
    // { top: 255, right: 0 },
    { top: 270, right: 0,side: "vertical" },
    // { top: 285, right: 0 },
    { top: 300, right: 0,side: "vertical" },
    // { top: 315, right: 0 },
    { top: 330, right: 0,side: "vertical" },
    // { top: 345, right: 0 },
    { top: 360, right: 0,side: "vertical" },
    // { top: 375, right: 0 },
    { top: 390, right: 0,side: "vertical" },
    // { top: 405, right: 0 },
    { top: 416, right: 0,side: "vertical" },
    ////right bottom
    { bottom: 0, right: 0,side: "vertical" },
    // { bottom: 15, right: 0 },
    { bottom: 30, right: 0,side: "vertical" },
    // { bottom: 45, right: 0 },
    { bottom: 60, right: 0,side: "vertical" },
    // { bottom: 75, right: 0 },
    { bottom: 90, right: 0,side: "vertical" },
    // { bottom: 105, right: 0 },
    { bottom: 120, right: 0,side: "vertical" },
    // { bottom: 135, right: 0 },
    { bottom: 150, right: 0,side: "vertical" },
    // { bottom: 165, right: 0 },
    { bottom: 180, right: 0,side: "vertical" },
    // { bottom: 195, right: 0 },
    { bottom: 210, right: 0,side: "vertical"},
    // { bottom: 225, right: 0 },
    { bottom: 240, right: 0,side: "vertical" },
    // { bottom: 255, right: 0 },
    { bottom: 270, right: 0,side: "vertical" },
    // { bottom: 285, right: 0 },
    { bottom: 300, right: 0,side: "vertical" },
    // { bottom: 315, right: 0 },
    { bottom: 330, right: 0,side: "vertical" },
    // { bottom: 345, right: 0 },
    { bottom: 360, right: 0,side: "vertical" },

    ////top left
    { top: 0, left: 10 },
    { top: 0, left: 40 },
    { top: 0, left: 80 },
    { top: 0, left: 120 },
    { top: 0, left: 160 },
    { top: 0, left: 195 },////middle
    /// top right
    { top: 0, right: 10 },
    { top: 0, right: 40 },
    { top: 0, right: 80 },
    { top: 0, right: 120 },
    { top: 0, right: 160 },

    //bottom left
    { bottom: 0, left: 10 },
    { bottom: 0, left: 40 },
    { bottom: 0, left: 80 },
    { bottom: 0, left: 120 },
    { bottom: 0, left: 160 },
    { bottom: 0, left: 195 },////middle
    /// bottom top
    { bottom: 0, right: 10 },
    { bottom: 0, right: 40 },
    { bottom: 0, right: 80 },
    { bottom: 0, right: 120 },
    { bottom: 0, right: 160 },
    ///straight line in the middle
    { top: 0, left: "50%",side: "vertical" },
    //{ top: 15, left: 195 },
    { top: 30, left: "50%",side: "vertical" },
    // { top: 45, left: 195 },
    { top: 60, left: "50%",side: "vertical" },
    // { top: 75, left: 195 },
    { top: 90, left: "50%",side: "vertical" },
    // { top: 105, left: 195 },
    { top: 120, left: "50%",side: "vertical" },
    // { top: 135, left: 195 },
    { top: 150, left: "50%",side: "vertical" },
    // { top: 165, left: 195 },
    { top: 180, left: "50%",side: "vertical" },
    // { top: 195, left: 195 },
    { top: 210, left: "50%",side: "vertical" },
    // { top: 225, left: 195 },
    { top: 240, left: "50%",side: "vertical" },
    // { top: 255, left: 195 },
    { top: 270, left: "50%",side: "vertical" },
    // { top: 285, left: 195 },
    { top: 300, left: "50%",side: "vertical" },
    // { top: 315, left: 195 },
    { top: 330, left: "50%",side: "vertical" },
    // { top: 345, left: 195 },
    { top: 360, left: "50%",side: "vertical" },
    // { top: 375, left: 195 },
    { top: 390, left: "50%",side: "vertical" },
    // { top: 405, left: 195 },
    { top: 416, left: "50%",side: "vertical" },
    ///middle bottom
    { bottom: 0, left: "50%",side: "vertical" },
    // { bottom: 15, left: 195 },
    { bottom: 30, left: "50%",side: "vertical" },
    // { bottom: 45, left: 195 },
    { bottom: 60, left: "50%",side: "vertical" },
    // { bottom: 75, left: 195 },
    { bottom: 90, left: "50%",side: "vertical" },
    // { bottom: 105, left: 195 },
    { bottom: 120, left: "50%",side: "vertical" },
    // { bottom: 135, left: 195 },
    { bottom: 150, left: "50%",side: "vertical" },
    // { bottom: 165, left: 195 },
    { bottom: 180, left: "50%",side: "vertical" },
    // { bottom: 195, left: 195 },
    { bottom: 210, left: "50%",side: "vertical" },
    // { bottom: 225, left: 195 },
    { bottom: 240, left: "50%",side: "vertical" },
    // { bottom: 255, left: 195 },
    { bottom: 270, left: "50%",side: "vertical" },
    // { bottom: 285, left: 195 },
    { bottom: 300, left: "50%",side: "vertical" },
    // { bottom: 315, left: 195 },
    { bottom: 330, left: "50%",side: "vertical" },
    //////////////////////
    { top: "50%", left: 10 },
    { top: "50%", left: 40 },
    { top: "50%", left: 80 },
    { top: "50%", left: 120 },
    { top: "50%", left: 160 },
    { top: "50%", right: 10 },
    { top: "50%", right: 40 },
    { top: "50%", right: 80 },
    { top: "50%", right: 120 },
    { top: "50%", right: 160 },       
    ////////////////////////////left to right
    { top: 10, left: 20},
    { top: 20, left: 40 },
    { top: 45, left: 60 },
    { top: 30, left: 0,side: "vertical" },
    //{ top: 45, left: 0 },
    { top: 60, left: 0,side: "vertical" },

    
  ];


  return(
    <GestureHandlerRootView>                                                                                                                                                                                                                                                                                 
     <View style={{flexDirection:"row",backgroundColor:"yellow"}}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={[styles.container,{backgroundColor:"blue"}]}>{leftBoxes}</View>
        </PanGestureHandler>
        
        <View style={{backgroundColor:"blue",left:0}}>
          <View style={[styles.diagonalContainer,{backgroundColor:"blue"}]}>{diagonalBoxes}</View>
          <View  style={styles.diagonalContainer2}>{rightDiagonalBoxes}</View>

        </View>
      
        <View>
          <View {...topPanResponder.panHandlers} style={[styles.horizontalContainer,{backgroundColor:"red"}]}>{topBoxes}</View>
          <View {...bottomPanResponder.panHandlers} style={[styles.bottomHorizontalContainer,{backgroundColor:"blue"}]}>{bottomBoxes}</View> 
        </View>  
        
        <View {...rightPanResponder.panHandlers} style={{backgroundColor:"blue",flex:1,flexDirection:"column",alignItems:"flex-end"}} >{rightBoxes}</View> 
        
      
    </View>
    
      
      
    
    </GestureHandlerRootView>
    
  )      
}
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'white',
//       position: 'relative',
//     },
//   })
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: "column",
    // left:0
  },
  box: {
    width: 25,
    height: 25,
    borderColor: "red",
    borderWidth: 2,
    },
  // rightBox: {
  //   alignSelf: 'flex-end', // Align right boxes to the rightmost part
  // },
  horizontalContainer: {
    flexDirection: 'row', // Arrange boxes horizontally
    justifyContent: 'center', // Center boxes horizontally
    alignItems: 'flex-start', // Align boxes to the top
  },
  bottomHorizontalContainer: {
    position: 'absolute',
   bottom:0,
    flexDirection: 'row', // Arrange bottom horizontal boxes horizontally
    alignItems: 'flex-end',
  },
  diagonalContainer: {
    position: 'absolute', // Position the diagonal boxes absolutely
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
  },
  diagonalContainer2:{
    flex: 1,
    position: 'absolute', // Position the diagonal boxes absolutely
    top: 20,
    left: 0,
    // right: 0,
    // bottom: 0,
    flexDirection: 'column-reverse'

  }

});


