/**
 * Seattle traffic cameras app
 */
import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState, Location} from './redux/application/types';
import {getLocation, getTrafficCameras} from './redux/application/actions';
import {CameraList} from './components/CameraList';
import {DetailedCamera} from './components/DetailedCamera';
import {Theme} from './assets/Theme';

const App = () => {
  const dispatch = useDispatch();
  const location: Location = useSelector(
    (state: ApplicationState) => state.location,
  );

  const isInitialMount = useRef(true);

  // Location is updated when refreshing, grab cameras + location on launch
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      dispatch(getTrafficCameras(location));
      dispatch(getLocation());
    } else {
      dispatch(getTrafficCameras(location));
    }
  }, [location]);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Camera list page to display traffic cameras */}
        <Stack.Screen
          name="CameraList"
          component={CameraList}
          options={{headerShown: false}}
        />
        {/* Detailed camera page to show more information about a specific camera */}
        <Stack.Screen
          name="DetailedCamera"
          component={DetailedCamera}
          options={{
            headerStyle: {
              backgroundColor: Theme.text,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
