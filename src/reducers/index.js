import {
  combineReducers
} from 'redux';
import {
  connectRouter
} from 'connected-react-router';
import music from './music';
import search from './search';
import songerDetail from './songerDetail';

export default history =>
  combineReducers({
    router: connectRouter(history),
    music,
    search,
    songerDetail
  });