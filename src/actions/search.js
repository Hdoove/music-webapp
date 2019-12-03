import {
  createActions,
  createAction
} from 'redux-actions';

const actions = createActions({
  SET_SEARCH_SONGS: songs => songs,
  SET_SEARCH_PLAY_LISTS: playList => playList,
  SET_SEARCH_SONGER: songer => songer,
  SET_SEARCH_ALBUMS: albums => albums,
  SET_LOADING: loading => loading
});

export const getSearchSongs = createAction('GET_SEARCH_SONGS');
export const getSearchPlayLists = createAction('GET_SEARCH_PLAY_LISTS');
export const getSearchSonger = createAction('GET_SEARCH_SONGER');
export const getSearchAlbums = createAction('GET_SEARCH_ALBUMS');

export default actions;