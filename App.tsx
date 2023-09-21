import React from "react";
import {  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Pressable,
  Button,
  View,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Camera,CameraType } from "expo-camera";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./HomeScreen";
import FrontCam from "./FrontCam";
import BackCam from "./BackCam";
import Sensor from "./Sensor";
import NewSensor from "./NewSensor";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
const Stack = createNativeStackNavigator();
export default function App() {
  const defaultOptions = { headerShown: false, animation: "slide_from_right", statusBarColor:"white"} as NativeStackNavigationOptions | ((props: { route: RouteProp<ParamListBase, string>; navigation: any; }) => NativeStackNavigationOptions)
  const [checking, setChecking] = React.useState(false);
  const [currentCheck, setCurrentCheck] = React.useState('front');
  const [type, setType] = React.useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = React.useRef(null);
  // if (!permission) {
  //   // Camera permissions are still loading
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  return (
    <NativeBaseProvider>
      
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* Define your screens here */}
          <Stack.Screen options={defaultOptions} name="Home" component={HomeScreen} />
          <Stack.Screen options={defaultOptions} name="Front" component={FrontCam} />
          <Stack.Screen options={defaultOptions} name="Back" component={BackCam} />
          <Stack.Screen options={defaultOptions} name="Sensor" component={NewSensor} />
        </Stack.Navigator>
      </NavigationContainer>
      
    </NativeBaseProvider>
  );
}

