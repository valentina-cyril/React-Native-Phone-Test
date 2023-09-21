import { Box, Button, Center, Circle, HStack, Image, Stack, Text, VStack, View } from "native-base";
import { Camera,CameraType } from "expo-camera";

export default function HomeScreen({navigation}){
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const proceed = () => {
    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        <View>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
    if(permission?.granted){
      navigation.navigate('Front')
    }
  }
    return(
        <VStack height={"100%"} space={7} alignItems="center">
          <Box alignSelf="center" alignItems="center" p="8" bg="#00B39E" width={"100%"} _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            letterSpacing: 'lg'
          }}>Mobile Device Health Check Up</Box>
          <Box _text={{
            fontSize: 'md',
            color: '#242424',
            letterSpacing: 'md'
          }} px={"5"}>We are going to run the following health check on your device:</Box>

          <VStack space={5} alignItems="center">
            <Stack direction="row"  space={5}>
              <Box size="40" bg="#F1F2F3" rounded="sm" _text={{
                  color: 'black',
                  fontWeight: 'medium'
                }} shadow={'3'}>
                  <Box alignItems="center" alignContent={"center"} height={"100%"} p={"3"} position={"relative"}>
                    <Circle position={"absolute"} left={2} top={2} size="20px" borderColor={"#00B39E"} borderWidth={1}  _text={{
                      color: '#00B39E',
                      fontSize:'10px'
                    }}>
                      1
                    </Circle>
                      <Center width={"100%"} height="100%">
                        <Image size={"md"} source={require('./assets/Group.png')} alt="Front camera icon"/>
                      </Center>
                      <Box alignItems="center"  bottom={2} width={"100%"} position={"absolute"}>Front Camera</Box>
                  </Box>                  
              </Box>
              <Box size="40" bg="#F1F2F3" rounded="sm" _text={{
                  color: 'black',
                  fontWeight: 'medium'
                }} shadow={'3'}>
                  <Box alignItems="center" alignContent={"center"} height={"100%"} p={"3"} position={"relative"}>
                    <Circle position={"absolute"} left={2} top={2} size="20px" borderColor={"#00B39E"} borderWidth={1}  _text={{
                      color: '#00B39E',
                      fontSize:'10px'
                    }}>
                      2
                    </Circle>
                      <Center width={"100%"} height="100%">
                        <Image size={"md"} source={require('./assets/Group.png')} alt="Front camera icon"/>
                      </Center>
                      <Box alignItems="center"  bottom={2} width={"100%"} position={"absolute"}>Front Camera</Box>
                  </Box>                  
              </Box>
            </Stack>
            <Stack direction="row"  space={5}>
              <Box size="40" bg="#F1F2F3" rounded="sm" _text={{
                  color: 'black',
                  fontWeight: 'medium'
                }} shadow={'3'}>
                  <Box alignItems="center" alignContent={"center"} height={"100%"} p={"3"} position={"relative"}>
                    <Circle position={"absolute"} left={2} top={2} size="20px" borderColor={"#00B39E"} borderWidth={1}  _text={{
                      color: '#00B39E',
                      fontSize:'10px'
                    }}>
                      1
                    </Circle>
                      <Center width={"100%"} height="100%">
                        <Image size={"md"} source={require('./assets/Group.png')} alt="Front camera icon"/>
                      </Center>
                      <Box alignItems="center"  bottom={2} width={"100%"} position={"absolute"}>Front Camera</Box>
                  </Box>                  
              </Box>
              <Box size="40" bg="#F1F2F3" rounded="sm" _text={{
                  color: 'black',
                  fontWeight: 'medium'
                }} shadow={'3'}>
                  <Box alignItems="center" alignContent={"center"} height={"100%"} p={"3"} position={"relative"}>
                    <Circle position={"absolute"} left={2} top={2} size="20px" borderColor={"#00B39E"} borderWidth={1}  _text={{
                      color: '#00B39E',
                      fontSize:'10px'
                    }}>
                      2
                    </Circle>
                      <Center width={"100%"} height="100%">
                        <Image size={"md"} source={require('./assets/Group.png')} alt="Front camera icon"/>
                      </Center>
                      <Box alignItems="center"  bottom={2} width={"100%"} position={"absolute"}>Front Camera</Box>
                  </Box>                  
              </Box>
            </Stack>
          </VStack>

            
          
          <VStack safeAreaBottom bottom={35} position={"absolute"} width={"100%"}  borderRadius={20}  justifyContent={"center"} justifyItems={"center"}>
            <Button onPress={() => proceed({navigator})} mx={6} bg={"#00B39E"} borderRadius={"10px"}>Proceed</Button>   
          </VStack>
        </VStack>
    )

}