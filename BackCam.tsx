import { TouchableOpacity, View, StyleSheet } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Camera,CameraType } from "expo-camera";
import { Box, Button, HStack, Spinner, Text } from "native-base";
import { Audio } from 'expo-av';

import React from "react";

export default function BackCam({navigation}){
  const cameraRef = React.useRef(null);
    
  const snapPicture = async () => {
    await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
    })
   
    console.log("okwa here ka m noo ")
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("here photo",photo)
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
    })
      navigation.navigate('Sensor')
    }
    // await Audio.setAudioModeAsync({
    //     playsInSilentModeIOS: true,
    //     allowsRecordingIOS: true,
    //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
    //     shouldDuckAndroid: true,
    //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    //     playThroughEarpieceAndroid: false,
    //   });
  };

  return(
        <View  style={styles.container}>
          <Box alignSelf="center" alignItems="center" p="8" bg="#00B39E" width={"100%"} _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            letterSpacing: 'lg'
          }}>Back Camera Test </Box>
        <Camera onCameraReady={() => snapPicture()}  style={styles.camera} type={CameraType.back} ref={cameraRef} >
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