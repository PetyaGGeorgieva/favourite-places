import { useEffect, useState } from "react";
import { Alert, Image, View, StyleSheet, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus
} from 'expo-location';
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { getMapPreview } from "../../util/location";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    console.log('useEffect triggered', isFocused, route.params);
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng
      };
      console.log('Setting picked location:', mapPickedLocation);
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  async function verifyPermissions() {
    if (!locationPermissionInformation) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
      }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.'
      );
        return false;
      }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location picked yet.</Text>

  if (pickedLocation && pickedLocation.lat && pickedLocation.lng) {
  locationPreview = (
    <Image
      style={styles.image}
      source={{
        uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
      }}
    />
  );
}


  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
         </OutlinedButton>
         <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
});
