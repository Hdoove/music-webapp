import {
  handleActions
} from 'redux-actions';
import actions from '../actions/music';
import Immutable from "seamless-immutable";

const defaultState = Immutable({
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
  }
});


const reducer = handleActions(
  new Map([
    [
      actions.setMusicStatus,
      (state, {
        payload
      }) =>
      state.set("musicStatus", payload)

    ],
    [
      actions.setSongDetail,
      (state, {
        payload
      }) =>
      state.set("songListDetail", payload)
    ],
    [
      actions.setIsShowList,
      (state, {
        payload
      }) =>
      state.set("isShowList", payload)
    ],
    [
      actions.setPlayMusicInfo,
      (state, {
        payload
      }) =>
      state.set("playMusicInfo", payload)
    ],
    [
      actions.setPlayMusicGeci,
      (state, {
        payload
      }) =>
      state.set("playMusicGeci", payload)
    ],
    [
      actions.setLoading,
      (state, {
        payload
      }) =>
      state.set("loading", payload)
    ],
    [
      actions.setAllAndThisSong,
      (state, {
        payload
      }) =>
      state.set("orderSongs", payload)
    ]
  ]),
  defaultState
);

export default reducer;