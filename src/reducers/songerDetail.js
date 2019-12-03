import {
    handleActions
} from 'redux-actions';
import actions from '../actions/songerDetail';
import Immutable from "seamless-immutable";

const defaultState = Immutable({
    songs: [],
    album: [],
    loading: false,
    info: {},
    albumInfo: {}
});


const reducer = handleActions(
    new Map([
        [
            actions.setSongerSongs,
            (state, {
                payload
            }) => state.set("songs", payload)
        ],
        [
            actions.setSongerAlbum,
            (state, {
                payload
            }) => state.set("album", payload)
        ],
        [
            actions.setLoading,
            (state, {
                payload
            }) =>
            state.set("loading", payload)

        ],
        [
            actions.setSongerInfo,
            (state, {
                payload
            }) =>
            state.set("info", payload)

        ],
        [
            actions.setAlbumInfo,
            (state, {
                payload
            }) =>
            state.set("albumInfo", payload)

        ]
    ]),
    defaultState
);

export default reducer;