import {
  takeEvery,
  put,
  takeLatest,
  call,
  all,
  delay
} from 'redux-saga/effects';
import actions, {
  getSongDetail,
  getPlaySongGeci,
  getPlaySongInfo
} from '@src/actions/music';
import {
  get_song_list_detail,
  get_geci,
  get_song_detail
} from '@src/apis/home';
import store from '../utilities/appStore';

// 获取歌单详情
function* fetchSongDetail(action) {
  try {
    yield put(actions.setLoading(true));
    const data = yield call(get_song_list_detail, action.payload);
    if (data.code === 200 && data.playlist) {
      yield put(actions.setSongDetail(data.playlist));
      yield put(actions.setLoading(false));
    } else {
      yield put(actions.setSongDetail({}));
      yield put(actions.setLoading(false));
    }
  } catch (error) {
    return error;
  }
}

// 获取歌词
function* fetchSongGeci(action) {
  try {
    const data = yield call(get_geci, action.payload);
    if (data.code === 200 && data.lrc) {
      yield put(actions.setPlayMusicGeci(data.lrc));
    } else {
      yield put(actions.setPlayMusicGeci({}));
    }
  } catch (error) {
    return error;
  }
}

// 获取正在播放歌曲详情
function* fetchPlaySongDetail(action) {
  try {
    const data = yield call(get_song_detail, action.payload);
    if (data.code === 200 && data.songs) {
      yield put(actions.setPlayMusicInfo(data.songs));
    } else {
      yield put(actions.setPlayMusicInfo({}));
    }
  } catch (error) {
    return error;
  }
}

export default function* musicSaga() {
  yield takeLatest(getSongDetail().type, fetchSongDetail);
  yield takeLatest(getPlaySongGeci().type, fetchSongGeci);
  yield takeLatest(getPlaySongInfo().type, fetchPlaySongDetail);
}