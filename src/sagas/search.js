import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import actions, {
    getSearchSongs,
    getSearchPlayLists,
    getSearchSonger,
    getSearchAlbums
} from '@src/actions/search';
import {
    get_search_detail
} from '@src/apis/home';
import musicAction from '@src/actions/music';

// 获取搜索单曲
function* fetchSearchSongs(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_search_detail, action.payload);
        if (data.code === 200 && data.result) {
            yield put(actions.setSearchSongs({
                limit: 20,
                offset: action.payload.offset + 20,
                data: data.result.songs,
                allCount: data.result.songCount
            }));
            yield put(actions.setLoading(false));
        } else {
            yield put(actions.setSearchSongs({}));
            yield put(actions.setLoading(false));
        }
    } catch (error) {
        return error;
    }
}

// 获取搜索歌单
function* fetchSearchPlayLists(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_search_detail, action.payload);
        if (data.code === 200 && data.result) {
            yield put(actions.setSearchPlayLists({
                limit: 20,
                offset: action.payload.offset + 20,
                data: data.result.playlists,
                allCount: data.result.playlistCount
            }));
            yield put(actions.setLoading(false));
        } else {
            yield put(actions.setSearchPlayLists({}));
            yield put(actions.setLoading(false));
        }
    } catch (error) {
        return error;
    }
}

// 获取搜索歌手
function* fetchSearchSonger(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_search_detail, action.payload);
        if (data.code === 200 && data.result) {
            yield put(actions.setSearchSonger(data.result.artists));
            yield put(actions.setLoading(false));
        } else {
            yield put(actions.setSearchSonger([]));
            yield put(actions.setLoading(false));
        }
    } catch (error) {
        return error;
    }
}

// 获取搜索专辑
function* fetchSearchAlbums(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_search_detail, action.payload);
        if (data.code === 200 && data.result) {
            yield put(actions.setSearchAlbums({
                limit: 20,
                offset: action.payload.offset + 20,
                data: data.result.albums,
                allCount: data.result.albums.length
            }));
            yield put(actions.setLoading(false));
        } else {
            yield put(actions.setSearchAlbums([]));
            yield put(actions.setLoading(false));
        }
    } catch (error) {
        return error;
    }
}

export default function* searchSaga() {
    yield takeLatest(getSearchSongs().type, fetchSearchSongs);
    yield takeLatest(getSearchPlayLists().type, fetchSearchPlayLists);
    yield takeLatest(getSearchSonger().type, fetchSearchSonger);
    yield takeLatest(getSearchAlbums().type, fetchSearchAlbums);
}