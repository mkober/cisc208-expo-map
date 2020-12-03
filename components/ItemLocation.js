import React, { useState, useEffect }  from 'react';
import MapView, {Marker, AnimatedRegion, Animated} from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Dimensions, Button } from 'react-native';

const ItemLocation = () => {

  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);

  let map = null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getLocation = async () => {
    if (location) {
      setMarkers([{latlng: {latitude: location.coords.latitude, longitude: location.coords.longitude}}])
      setRegion(location.region)
      let r = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: .09,
        longitudeDelta: .04,
      }; 
      map.animateToRegion(r, 500);
    }
    console.log(region);
  }

  return (
    <View>
      <MapView 
        style={styles.map}
        region={region}
        followUserLocation={true}
        showsUserLocation={true}
        ref={ref => (map = ref)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title="My Marker's Location"
          />
        ))}
      </MapView>
      <Button 
        title="Get Location" 
        onPress={getLocation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    marginBottom: 20
  }
})

export default ItemLocation;