import {
  createActions,
  createAction
} from 'redux-actions';

const actions = createActions({
  SET_SEARCH_DEFAULT: keyword => keyword,
  SET_SEARCH_SONGS: songs => songs,
  SET_SEARCH_PLAY_LISTS: playList => playList,
  SET_SEARCH_SONGER: songer => songer,
  SET_SEARCH_ALBUMS: albums => albums,
  SET_LOADING: loading => loading,
  SET_SEARCH_SUGGEST: suggest => suggest
});

export const getSearchDefault = createAction('GET_SEARCH_DEFAULT');
export const getSearchSongs = createAction('GET_SEARCH_SONGS');
export const getSearchPlayLists = createAction('GET_SEARCH_PLAY_LISTS');
export const getSearchSonger = createAction('GET_SEARCH_SONGER');
export const getSearchAlbums = createAction('GET_SEARCH_ALBUMS');
export const getSearchSuggest = createAction('GET_SEARCH_SUGGEST');

export default actions;