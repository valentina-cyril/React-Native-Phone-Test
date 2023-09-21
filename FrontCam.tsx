import { TouchableOpacity, View, StyleSheet,  } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Camera,CameraType } from "expo-camera";
import { Box, Button, HStack, Heading, Overlay, Spinner, Text } from "native-base";
import React from "react";
import { Audio } from 'expo-av';
import { background, position } from "native-base/lib/typescript/theme/styled-system";

export default function FrontCam({navigation}){
  const cameraRef = React.useRef(null);
  if(Camera.isAvailableAsync()){
    console.log("here i dey available")
    
  }
  const snapPicture = async () => {
    console.log("okwa here ka m noo audio")
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("here photo",photo)
      navigation.navigate('Back')
    }
  };

  
  return(
        <View  style={styles.container}>
          <Box alignSelf="center" alignItems="center" top={1} p="8" bg="#00B39E" width={"100%"} _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            letterSpacing: 'lg'
          }}>Front Camera Test </Box>
          
          <Camera onCameraReady={() => snapPicture()}  style={styles.camera} type={CameraType.front} ref={cameraRef} autoFocus={false}>
            <View style={styles.overlay}>
              <HStack space={2}>
                <Spinner size={"md"} accessibilityLabel="Loading posts" />
              </HStack>  
            </View>
          </Camera>
          
      </View>
  )      
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',

  },
  overlay: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent:"center",
    alignItems:"center"
  }
});