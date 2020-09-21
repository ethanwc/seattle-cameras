export const SET_CAMERAS = 'SET_CAMERAS';
export const SET_LOCATION = 'SET_LOCATION';

/**
 * Traffic camera type
 */
export interface TrafficCamera {
  id: string;
  position: number;
  created_at: string;
  updated_at: string;
  ownershipcd: string;
  cameralabel: string;
  imageurl: string;
  videourl: string;
  xpos: number;
  ypos: number;
  location: {
    latitude: number;
    longitude: number;
  };
  distance: number;
}

/**
 * Location type
 */
export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Application state
 */
export interface ApplicationState {
  cameras: TrafficCamera[];
  location: Location;
  locationLoaded: boolean;
}

interface SetCamerasAction {
  type: typeof SET_CAMERAS;
  payload: TrafficCamera[];
}

interface SetLocationAction {
  type: typeof SET_LOCATION;
  payload: Location;
}

export type ApplicationActionTypes = SetCamerasAction | SetLocationAction;
