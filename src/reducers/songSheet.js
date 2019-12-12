import {
    handleActions
} from 'redux-actions';
import actions from '../actions/songSheet';
import Immutable from "seamless-immutable";

const defaultState = Immutable({
    sheets: {
        offset: 0,
        total: 0,
        type: '华语',
        data: []
    },
    type: {},
    hotType: [],
    loading: false,
});


const reducer = handleActions(
    new Map([
        [
            actions.setSheetType,
            (state, {
                payload
            }) => state.set("type", payload)
        ],
        [
            actions.setSheetHotType,
            (state, {
                payload
            }) => state.set("hotType", payload)
        ],
        [
            actions.setSheetList,
            (state, {
                payload
            }) => {
                return state.set("sheets", {
                    ...payload,
                    data: payload.offset === 30 ? payload.data : state.sheets.data.concat(payload.data)
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