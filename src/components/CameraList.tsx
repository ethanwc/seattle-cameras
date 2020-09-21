import React from 'react';
import {useState} from 'react';
import {Image} from 'react-native';
import {
  View,
  RefreshControl,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Theme} from '../assets/Theme';
import {CameraCard} from '../containers/CameraCard';
import {getLocation} from '../redux/application/actions';
import {ApplicationState, TrafficCamera} from '../redux/application/types';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
const fallbackImage = require('../assets/imagenotfound.jpg');
const cameraFailure = require('../assets/camera_down.png');

/**
 * CameraList component
 */
export const CameraList = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const locationLoaded: boolean = useSelector(
    (state: ApplicationState) => state.locationLoaded,
  );
  const cameras: TrafficCamera[] = useSelector(
    (state: ApplicationState) => state.cameras,
  );

  // Reloads the location and cameras
  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(getLocation());
    setRefreshing(false);
  };

  // display network error or no cameras found
  if (!cameras.length)
    return (
      <TouchableHighlight
        style={styles.containerError}
        onPress={() => handleRefresh()}>
        <Image source={cameraFailure} style={styles.image} />
      </TouchableHighlight>
    );

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefresh()}
            tintColor={Theme.dark}
            title="Loading..."
            titleColor={Theme.highlight}
            colors={[Theme.highlight, Theme.text]}
            progressBackgroundColor={Theme.background}
          />
        }
        // Sort by distance if location loaded correctly otherwise a-z
        data={
          locationLoaded
            ? cameras.sort(
                (a: TrafficCamera, b: TrafficCamera) => a.distance - b.distance,
              )
            : cameras.sort((a: TrafficCamera, b: TrafficCamera) =>
                a.cameralabel.localeCompare(b.cameralabel),
              )
        }
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-evenly',
        }}
        renderItem={({item}: {item: TrafficCamera}) => (
          <CameraCard
            camera={item}
            navigation={navigation}
            fallbackImage={fallbackImage}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  containerError: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Theme.dark,
  },
  image: {
    width: wp(95),
    height: wp(95),
    padding: wp(2.5),
  },
});
