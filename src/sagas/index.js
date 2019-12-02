import {
  all
} from 'redux-saga/effects';
import musicSaga from './music';
import searchSaga from './search';

export default function* rootSaga() {
  yield all([musicSaga(), searchSaga()]);
}