import { handleActions } from 'redux-actions';
import Immutable from "seamless-immutable";
import actions from '../actions/music';

const defaultState = Immutable({
  banners: [],
  songSheet: [],
  playMusicInfo: {},
  playMusicGeci: {},
  songListDetail: {},
  isShowList: false,
  musicStatus: {
    isShow: false,
    isPlay: false
  },
  loading: false,
  orderSongs: {
    all: 0,
    now: -1
  },
  toplistDetail: {},
  songers: {
    offset: 0,
    data: []
  },
  commits: {
    hot: [],
    time: [],
    offset: 0,
    total: 0
  }
});

const reducer = handleActions(
  new Map([
    [actions.setBanners, (state, { payload }) => state.set('banners', payload)],
    [
      actions.setSongSheet,
      (state, { payload }) => state.set('songSheet', payload)
    ],
    [
      actions.setMusicStatus,
      (state, { payload }) => state.set('musicStatus', payload)
    ],
    [
      actions.setSongDetail,
      (state, { payload }) => state.set('songListDetail', payload)
    ],
    [
      actions.setIsShowList,
      (state, { payload }) => state.set('isShowList', payload)
    ],
    [
      actions.setPlayMusicInfo,
      (state, { payload }) => state.set('playMusicInfo', payload)
    ],
    [
      actions.setPlayMusicGeci,
      (state, { payload }) => state.set('playMusicGeci', payload)
    ],
    [actions.setLoading, (state, { payload }) => state.set('loading', payload)],
    [
      actions.setAllAndThisSong,
      (state, { payload }) => state.set('orderSongs', payload)
    ],
    [
      actions.setToplistDetail,
      (state, { payload }) => state.set('toplistDetail', payload)
    ],
    [
      actions.setSongers,
      (state, { payload }) => {
        return state.set('songers', {
          ...payload,
          data:
            payload.offset === 15
              ? payload.data
              : state.songers.data.concat(payload.data)
        });
      }
    ],
    [
      actions.setPlayMusicCommit,
      (state, { payload }) => {
        return state.set('commits', {
          ...payload,
          hot: payload.hot ? payload.hot : state.commits.hot,
          time:
            payload.offset === 30
              ? payload.time
              : state.commits.time.concat(payload.time)
        });
      }
    ]
  ]),
  defaultState
);

export default reducer;
