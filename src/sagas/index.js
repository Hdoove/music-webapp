import {
  all
} from 'redux-saga/effects';
import musicSaga from './music';
import searchSaga from './search';
import songerDetailSaga from './songerDetail';
import songSheetSaga from './songSheet';

export default function* rootSaga() {
  yield all([musicSaga(), searchSaga(), songerDetailSaga(), songSheetSaga()]);
}