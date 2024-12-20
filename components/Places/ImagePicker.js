import { Alert, Image, View, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus
} from "expo-image-picker";
import { useState } from "react";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState ();
  const [cameraPermissionInfortmation, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInfortmation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfortmation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if(!hasPermission) {
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  image:{
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
});
