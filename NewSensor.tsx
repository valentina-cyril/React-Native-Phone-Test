import React from "react";
import { PanResponder, View,Dimensions } from "react-native";
import { Rect, Svg } from "react-native-svg";

export const Box = ({ x, y, width, height, fill }) => {
    return (
      <Svg style={{ position: 'absolute'}}>
        <Rect x={x} y={y} width={width} height={height} fill={fill}  />
      </Svg>
    );
};
  
export default function NewSensor(){
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width
    const boxSize = 25;
    const numberOfBoxes = Math.floor(screenHeight / boxSize);
    const horizontal = Math.floor(screenWidth / boxSize);
    console.log("hor",horizontal)
    const initialBoxes = Array.from({ length: numberOfBoxes }, (_, index) => ({
        id: `leftboxes${index + 1}`,
        x: 0, // Adjust the X position as needed
        y: index * boxSize, // Position each box vertically
        width: boxSize, // Adjust the width as needed
        height: boxSize, // Use the specified box height
        fill: 'blue', // You can set the initial color here
    }));
    const initialRightBoxes = Array.from({ length: numberOfBoxes }, (_, index) => ({
        id: `rightboxes${index + 1}`,
        x: screenWidth - boxSize, // Adjust the X position as needed
        y: index * boxSize, // Position each box vertically
        width: boxSize, // Adjust the width as needed
        height: boxSize, // Use the specified box height
        fill: 'black', // You can set the initial color here
    }));
    const initialTopBoxes = Array.from({ length: horizontal }, (_, index) => ({
        id: `topboxes${index + 1}`,
        x: boxSize * index, // Adjust the X position as needed
        y: 0, // Position each box vertically
        width: boxSize, // Adjust the width as needed
        height: boxSize, // Use the specified box height
        fill: 'black', // You can set the initial color here
    }));

    const allBoxes = initialBoxes.concat(initialRightBoxes,initialTopBoxes)
    const [boxes, setBoxes]  = React.useState(allBoxes);
    const [rightBoxes, setRightBoxes]  = React.useState(initialRightBoxes);
    const handleSwipe = (boxId) => {
        // Mark the box with the given ID when swiped
        // You can implement your own logic here
        console.log(`Box ${boxes.length}`,boxId);
        setBoxes((boxes) =>
        boxes.map((box) =>
            box.id === boxId ? { ...box, fill: 'green' } : box
        )
        );
    };
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          // Check if the swipe crosses any box
          boxes.forEach((box) => {
            if (
              gestureState.moveX >= box.x &&
              gestureState.moveX <= box.x + box.width &&
              gestureState.moveY >= box.y &&
              gestureState.moveY <= box.y + box.height
            ) {
                handleSwipe(box.id);
            }
          });
        },
      });
    return (<>
        
        <View style={{flex:1,flexDirection:"row",backgroundColor:"yellow"}}>
                <View style={{ flex: 1,justifyContent: 'flex-start',
        flexDirection: "column", }} {...panResponder.panHandlers}>
                {boxes.map((box) => (
                <Box key={box.id} {...box} />
                ))}
                </View>
                

                
        </View>
            
    </>
        
    )
}