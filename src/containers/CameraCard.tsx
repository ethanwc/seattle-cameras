/**
 * Display container for the a camera card
 */

import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Theme} from '../assets/Theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {TrafficCamera} from '../redux/application/types';

interface CameraCardProps {
  camera: TrafficCamera;
  fallbackImage: any;
  navigation: any;
}
export const CameraCard = (props: CameraCardProps) => {
  // handle image loading
  const [url, setUrl] = useState({uri: props.camera.imageurl});
  const image = (
    <Image
      source={url}
      style={styles.image}
      // handle image failed to load
      onError={(error: any) => {
        setUrl(props.fallbackImage);
      }}
    />
  );

  return (
    <TouchableHighlight
      onPress={() =>
        props.navigation.navigate('DetailedCamera', {
          camera: props.camera,
        })
      }
      underlayColor={'transparent'}>
      <View style={styles.detailedCameraCard}>
        {image}
        <Text style={{color: Theme.text}}>{props.camera.cameralabel}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.background,
  },
  image: {
    width: wp(40),
    height: wp(30),
  },
  detailedCameraCard: {
    backgroundColor: Theme.dark,
    borderRadius: 5,
    marginVertical: wp(5 / 4),
    padding: wp(2.5),
    width: wp(45),
  },
});
