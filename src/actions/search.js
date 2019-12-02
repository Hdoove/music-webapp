import {
    createActions,
    createAction
  } from 'redux-actions';
  
  const actions = createActions({
    SET_SEARCH_SONGS: songs => songs,
    SET_SEARCH_PLAY_LISTS: playList => playList,
    SET_LOADING: loading => loading
  });
  
  export const getSearchSongs = createAction('GET_SEARCH_SONGS');
  export const getSearchPlayLists = createAction('GET_SEARCH_PLAY_LISTS');
  
  export default actions;