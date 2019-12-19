import {
  put,
  takeLatest,
  call
} from 'redux-saga/effects';
import actions, {
  getSongDetail,
  getPlaySongGeci,
  getPlaySongInfo,
  getBanners,
  getSongSheet,
  getToplistDetail,
  getSongers,
  getTopSongers,
  getPlaySongCommit
} from '@src/actions/music';
import {
  get_banner,
  get_playList,
  get_song_list_detail,
  get_geci,
  get_song_detail,
  get_toplist_detail,
  get_hot_songers,
  get_songers_list,
  get_song_commits
} from '@src/apis/home';

// 获取轮播图
function* fetchBanners() {
  try {
    const data = yield call(get_banner);
    if (data.code === 200 && data.banners) {
      yield put(actions.setBanners(data.banners));
    } else {
      yield put(actions.setBanners([]));
    }
  } catch (error) {
    return error;
  }
}

// 获取推荐歌单
function* fetchSongSheet(action) {
  try {
    const data = yield call(get_playList, action.payload);
    if (data.code === 200 && data.result) {
      yield put(actions.setSongSheet(data.result));
    } else {
      yield put(actions.setSongSheet({}));
    }
  } catch (error) {
    return error;
  }
}

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

// 获取榜单详情
function* fetchToplistDetail(action) {
  try {
    yield put(actions.setLoading(true));
    const data = yield call(get_toplist_detail, action.payload);
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

// 获取top歌手
function* fetchSongers(action) {
  try {
    yield put(actions.setLoading(true));
    const data = yield call(get_hot_songers, action.payload);
    if (data.code === 200 && data.artists) {
      yield put(actions.setSongers({
        offset: action.payload + 15,
        data: data.artists
      }));
      yield put(actions.setLoading(false));
    } else {
      yield put(actions.setSongers([]));
      yield put(actions.setLoading(false));
    }
  } catch (error) {
    return error;
  }
}

// 获取歌手列表
function* fetchTopSongers(action) {
  try {
    yield put(actions.setLoading(true));
    const data = yield call(get_songers_list, action.payload);
    if (data.code === 200 && data.artists) {
      yield put(actions.setSongers({
        offset: action.payload.offset + 15,
        data: data.artists
      }));
      yield put(actions.setLoading(false));
    } else {
      yield put(actions.setSongers([]));
      yield put(actions.setLoading(false));
    }
  } catch (error) {
    return error;
  }
}

// 获取歌曲评论
function* fetchSongCommit(action) {
  try {
    yield put(actions.setCommitLoading(true));
    const data = yield call(get_song_commits, action.payload);
    if (data.code === 200 && data.comments) {
      yield put(actions.setPlayMusicCommit({
        offset: action.payload.offset + 30,
        time: data.comments,
        hot: data.hotComments,
        total: data.total
      }));
      yield put(actions.setCommitLoading(false));
    } else {
      yield put(actions.setPlayMusicCommit([]));
      yield put(actions.setCommitLoading(false));
    }
  } catch (error) {
    return error;
  }
}

export default function* musicSaga() {
  yield takeLatest(getBanners().type, fetchBanners);
  yield takeLatest(getSongSheet().type, fetchSongSheet);
  yield takeLatest(getSongDetail().type, fetchSongDetail);
  yield takeLatest(getPlaySongGeci().type, fetchSongGeci);
  yield takeLatest(getPlaySongInfo().type, fetchPlaySongDetail);
  yield takeLatest(getToplistDetail().type, fetchToplistDetail);
  yield takeLatest(getSongers().type, fetchSongers);
  yield takeLatest(getTopSongers().type, fetchTopSongers);
  yield takeLatest(getPlaySongCommit().type, fetchSongCommit);
}