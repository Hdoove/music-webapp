import {
  combineReducers
} from 'redux';
import {
  connectRouter
} from 'connected-react-router';
import music from './music';

export default history =>
  combineReducers({
    router: connectRouter(history),
    music
  });