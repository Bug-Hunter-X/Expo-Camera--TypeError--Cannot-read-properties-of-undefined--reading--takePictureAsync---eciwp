The solution involves using the `onCameraReady` callback provided by Expo's `Camera` component. This callback ensures that `takePictureAsync` is only called after the camera is fully initialized and ready for use.

```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

if (hasPermission === null) {
    return <View />; //Show loading
  }
if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log(photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        onCameraReady={() => console.log('Camera is ready')}
      />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
}

export default App;
```