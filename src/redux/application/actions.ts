/**
 * Handle state updates for the application
 */

import {
  ApplicationActionTypes,
  Location,
  SET_CAMERAS,
  SET_LOCATION,
  TrafficCamera,
} from './types';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
export const setCameras = (
  cameras: TrafficCamera[],
): ApplicationActionTypes => {
  return {
    type: SET_CAMERAS,
    payload: cameras,
  };
};

export const setLocation = (location: Location): ApplicationActionTypes => {
  return {
    type: SET_LOCATION,
    payload: location,
  };
};

export const getTrafficCameras = (location: Location) => {
  return (dispatch: any) => {
    fetch(
      'https://mobile-takehome.s3.amazonaws.com/cached_seattle_traffic_cam_data.json',
    )
      .then((response) => response.json())
      .then((json) => {
        const columnNames: string[] = [];
        // Build list of columns names
        let columns = json.meta.view.columns;
        columns.forEach((column: any) => {
          columnNames.push(column.fieldName.replace(':', '').replace('@', ''));
        });

        // response data
        let data = json.data;

        const parsed_cameras = Array<TrafficCamera>();
        data.forEach((element: any, index: number) => {
          let temp_camera: any = {};

          // Map the column names to the camera data
          columnNames.forEach((name: string, index: number) => {
            temp_camera[name] = element[index];
          });

          let camera_location = {
            latitude: temp_camera.location[1],
            longitude: temp_camera.location[2],
          };

          let parsed_camera: TrafficCamera = {
            id: temp_camera.id,
            cameralabel: temp_camera.cameralabel,
            created_at: temp_camera.created_at,
            // Grab just the imageurl
            imageurl: temp_camera.imageurl[0],
            // Grab just latitude and longitude
            location: camera_location,
            ownershipcd: temp_camera.ownershipcd,
            position: temp_camera.position,
            updated_at: temp_camera.updated_at,
            videourl: temp_camera.videourl,
            xpos: temp_camera.xpos,
            ypos: temp_camera.ypos,
            // 1 mile = 1609 meters
            distance: getDistance(location, camera_location) / 1609.34,
          };

          parsed_cameras.push(parsed_camera);
        });
        return dispatch(setCameras(parsed_cameras));
      })
      .catch((error) => {
        ToastAndroid.show(
          'Network error occured. Tap to retry',
          ToastAndroid.LONG,
        );
      });
  };
};

/**
 * Grab current location and update state of it
 */
export const getLocation = () => {
  return async (dispatch: any) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            return dispatch(
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }),
            );
          },
          (error) => {
            ToastAndroid.show(error.message, ToastAndroid.LONG);
          },
        );
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };
};
