import {
  all
} from 'redux-saga/effects';
import musicSaga from './music';

export default function* rootSaga() {
  yield all([musicSaga()]);
}