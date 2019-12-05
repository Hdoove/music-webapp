import {
    createActions,
    createAction
} from 'redux-actions';

const actions = createActions({
    SET_SHEET_HOT_TYPE: type => type,
    SET_SHEET_TYPE: type => type,
    SET_SHEET_LIST: list => list,
    SET_LOADING: loading => loading
});

export const getSheetHotType = createAction('GET_SHEET_HOT_TYPE');
export const getSheetType = createAction('GET_SHEET_TYPE');
export const getSheetList = createAction('GET_SHEET_LIST');

export default actions;