import {
    createActions,
    createAction
} from 'redux-actions';

const actions = createActions({
    SET_SONGER_SONGS: songs => songs,
    SET_SONGER_ALBUM: album => album,
    SET_SONGER_INFO: info => info,
    SET_LOADING: loading => loading,
    SET_ALBUM_INFO: album => album,
});

export const getSongerSongs = createAction('GET_SONGER_SONGS');
export const getSongerAlbum = createAction('GET_SONGER_ALBUM');
export const getSongerInfo = createAction('GET_SONGER_INFO');
export const getAlbumInfo = createAction('GET_ALBUM_INFO');

export default actions;