import {
  createActions,
  createAction
} from 'redux-actions';

const actions = createActions({
  SET_BANNERS: ban => ban,
  SET_SONG_SHEET: sheet => sheet,
  SET_MUSIC_STATUS: music => music,
  SET_SONG_DETAIL: songDetail => songDetail, // 歌单
  SET_IS_SHOW_LIST: isShow => isShow,
  SET_PLAY_MUSIC_INFO: info => info,
  SET_PLAY_MUSIC_GECI: info => info,
  SET_LOADING: loading => loading,
  SET_ALL_AND_THIS_SONG: num => num,
  SET_TOPLIST_DETAIL: detail => detail,
  SET_SONGERS: songers => songers,
  SET_PLAY_MUSIC_COMMIT: commit => commit
});

export const getBanners = createAction('GET_BANNERS');
export const getSongSheet = createAction('GET_SONG_SHEET');
export const getSongDetail = createAction('GET_SONG_DETAIL');
export const getPlaySongInfo = createAction('GET_PLAY_SONG_INFO');
export const getPlaySongCommit = createAction('GET_PLAY_SONG_COMMIT');
export const getPlaySongGeci = createAction('GET_PLAY_SONG_GECI');
export const getToplistDetail = createAction('GET_TOPLIST_DETAIL');
export const getSongers = createAction('GET_SONGERS');
export const getTopSongers = createAction('GET_TOP_SONGERS');

export default actions;