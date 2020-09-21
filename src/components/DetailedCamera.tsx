import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Theme} from '../assets/Theme';
import {DetailedCameraCard} from '../containers/DetailedCameraCard';
import {ApplicationState} from '../redux/application/types';
const fallbackImage = require('../assets/imagenotfound.jpg');

/**
 * Detailed camera component
 */

export const DetailedCamera = ({navigation, route}: any) => {
  const locationLoaded: boolean = useSelector(
    (state: ApplicationState) => state.locationLoaded,
  );
  return (
    <View style={styles.container}>
      <DetailedCameraCard
        camera={route.params.camera}
        navigation={navigation}
        showLocation={locationLoaded}
        fallbackImage={fallbackImage}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.background,
  },
});
