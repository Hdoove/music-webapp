import {
    handleActions
  } from 'redux-actions';
  import actions from '../actions/search';
  import Immutable from "seamless-immutable";

  console.log(actions);
  
  const defaultState = Immutable({
    songs: {
        offset: 0,
        limit: 20,
        data: [],
        allCount: 0
    },
    playLists: {
      offset: 0,
      limit: 20,
      data: [],
      allCount: 0
  },
    loading: false
  });
  
  
  const reducer = handleActions(
    new Map([
      [
        actions.setSearchSongs,
        (state, {
          payload
        }) => {
          return state.set("songs", {
            ...payload,
            data: state.songs.data.concat(payload.data)
          })
        }  
      ],
      [
        actions.setSearchPlayLists,
        (state, {
          payload
        }) => {
          return state.set("playLists", {
            ...payload,
            data: state.playLists.data.concat(payload.data)
          })
        }  
      ],
      [
        actions.setLoading,
        (state, {
          payload
        }) =>
        state.set("loading", payload)
  
      ]
    ]),
    defaultState
  );
  
  export default reducer;