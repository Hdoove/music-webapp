import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import actions, {
    getSheetList,
    getSheetType,
    getSheetHotType
} from '@src/actions/songSheet';
import {
    get_playlist_hot_type,
    get_playlist_type,
    get_sheet_list
} from '@src/apis/home';

// 获取热门歌单类型
function* fetchSheetHotType(action) {
    try {
        const data = yield call(get_playlist_hot_type);
        if (data.code === 200 && data.tags) {
            yield put(actions.setSheetHotType(data.tags));
        } else {
            yield put(actions.setSheetHotType([]));
        }
    } catch (error) {
        return error;
    }
}

// 获取全部歌单类型
function* fetchSheetType(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_playlist_type);
        if (data.code === 200 && data.sub) {
            const sub = data.sub;
            const cate = data.categories;
            let newObj = {};
            for (let i = 0, len = sub.length; i < len; i++) {
                newObj[cate[sub[i].category]] = newObj[cate[sub[i].category]] ? newObj[cate[sub[i].category]].concat(sub[i]) : [].concat(sub[i]);
            }
            yield put(actions.setLoading(false));
            yield put(actions.setSheetType(newObj));
        } else {
            yield put(actions.setLoading(false));
            yield put(actions.setSheetType([]));
        }
    } catch (error) {
        return error;
    }
}

// 获取歌单列表
function* fetchSheetList(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_sheet_list, action.payload);
        if (data.code === 200 && data.playlists) {
            yield put(actions.setSheetList({
                offset: action.payload.offset + 30,
                data: data.playlists,
                total: data.total,
                type: action.payload.text
            }));
            yield put(actions.setLoading(false));
        } else {
            yield put(actions.setSheetList([]));
            yield put(actions.setLoading(false));
        }
    } catch (error) {
        return error;
    }
}

export default function* musicSaga() {
    yield takeLatest(getSheetType().type, fetchSheetType);
    yield takeLatest(getSheetList().type, fetchSheetList);
    yield takeLatest(getSheetHotType().type, fetchSheetHotType);
}