/**
 * Display container for the detailed camera card
 */
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Theme} from '../assets/Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect} from 'react';
import {TrafficCamera} from '../redux/application/types';

interface DetailedCameraCardProps {
  camera: TrafficCamera;
  fallbackImage: any;
  showLocation: boolean;
  navigation: any;
}
export const DetailedCameraCard = (props: DetailedCameraCardProps) => {
  // Set header label
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.camera.cameralabel,
    });
  }, []);

  // handle image loading
  const [url, setUrl] = useState({uri: props.camera.imageurl});
  const image = (
    <Image
      source={url}
      style={styles.image}
      // handle image failed to load
      onError={() => {
        setUrl(props.fallbackImage);
      }}
    />
  );
  // show distance if location has been set
  const distance = props.showLocation ? (
    <Text style={{color: Theme.text}}>
      {props.camera.distance.toFixed(2)} miles
    </Text>
  ) : null;
  return (
    <View style={styles.container}>
      {image}
      <Text style={{color: Theme.text}}>{props.camera.ownershipcd}</Text>
      <Text style={{color: Theme.text}}>
        (lat: {props.camera.location.latitude} lon: {props.camera.location.longitude})
      </Text>
      {distance}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.dark,
    width: wp(100),
    height: hp(100),
    padding: wp(2.5),
  },
  image: {
    width: wp(95),
    height: wp(95),
  },
});
