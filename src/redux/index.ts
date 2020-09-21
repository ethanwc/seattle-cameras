import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Application} from './application/reducers';
import {ApplicationState} from './application/types';

// Root application state types
export interface RootState {
  state: ApplicationState;
}

export const store = createStore(Application, applyMiddleware(thunk));
