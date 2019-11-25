import {
  createActions,
  createAction
} from 'redux-actions';

const actions = createActions({
  SET_MUSIC_STATUS: music => music,
  SET_SONG_DETAIL: songDetail => songDetail, // 歌单
  SET_IS_SHOW_LIST: isShow => isShow,
  SET_PLAY_MUSIC_INFO: info => info,
  SET_PLAY_MUSIC_GECI: info => info,
  SET_LOADING: loading => loading,
  SET_ALL_AND_THIS_SONG: num => num
});

export const getSongDetail = createAction('GET_SONG_DETAIL');
export const getPlaySongInfo = createAction('GET_PLAY_SONG_INFO');
export const getPlaySongGeci = createAction('GET_PLAY_SONG_GECI');

export default actions;