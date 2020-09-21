/**
 * Map state updates for the application
 */
import {
  ApplicationActionTypes,
  ApplicationState,
  SET_CAMERAS,
  SET_LOCATION,
  TrafficCamera,
} from './types';
import {getDistance} from 'geolib';

export const Application = (
  state: ApplicationState = {
    cameras: [],
    // initial load location that isnt used due to locationLoaded flag
    location: {
      latitude: 100,
      longitude: -100,
    },
    locationLoaded: false,
  },
  action: ApplicationActionTypes,
) => {
  switch (action.type) {
    case SET_CAMERAS:
      return {
        cameras: action.payload,
        location: state.location,
        locationLoaded: state.locationLoaded,
      };
    case SET_LOCATION:
      return {
        // Update the distances of the cameras instead of reparsing data
        cameras: state.cameras.map((camera: TrafficCamera) => {
          return {
            ...camera,
            distance: getDistance(action.payload, camera.location) / 1609.34,
          };
        }),
        location: action.payload,
        locationLoaded: true,
      };
    default:
      return state;
  }
};
