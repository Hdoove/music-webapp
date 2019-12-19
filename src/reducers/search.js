import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import actions from '../actions/search';

const defaultState = Immutable({
  default: {},
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
  songer: [],
  albums: {
    offset: 0,
    limit: 20,
    data: [],
    allCount: 0
  },
  loading: false,
  suggest: []
});

const reducer = handleActions(
  new Map([
    [
      actions.setSearchDefault,
      (state, { payload }) => state.set('default', payload)
    ],
    [
      actions.setSearchSongs,
      (state, { payload }) => {
        return state.set('songs', {
          ...payload,
          data:
            payload.offset === 20
              ? payload.data
              : state.songs.data.concat(payload.data)
        })
      }
    ],
    [
      actions.setSearchPlayLists,
      (state, { payload }) => {
        return state.set('playLists', {
          ...payload,
          data:
            payload.offset === 20
              ? payload.data
              : state.playLists.data.concat(payload.data)
        });
      }
    ],
    [
      actions.setSearchSonger,
      (state, { payload }) => state.set('songer', payload)
    ],
    [
      actions.setSearchAlbums,
      (state, { payload }) => {
        return state.set('albums', {
          ...payload,
          data:
            payload.offset === 20
              ? payload.data
              : state.albums.data.concat(payload.data)
        });
      }
    ],
    [actions.setLoading, (state, { payload }) => state.set('loading', payload)],
    [
      actions.setSearchSuggest,
      (state, { payload }) => state.set('suggest', payload)
    ]
  ]),
  defaultState
);

export default reducer;
