import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import actions, {
    getSongerSongs,
    getSongerAlbum,
    getAlbumInfo
} from '@src/actions/songerDetail';
import musicAction from '@src/actions/music';
import {
    get_songer_song,
    get_songer_album,
    get_album_detail
} from '@src/apis/home';

// 获取歌手单曲
function* fetchSongerSongs(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_songer_song, action.payload);
        if (data.code === 200 && data.artist) {
            yield put(actions.setSongerSongs(data.hotSongs));
            yield put(actions.setSongerInfo(data.artist));
            yield put(musicAction.setSongDetail({
                tracks: data.hotSongs
            }));
            yield put(actions.setLoading(false));
        } else {
            yield put(actions.setLoading(false));
        }
    } catch (error) {
        return error;
    }
}

// 获取歌手专辑
function* fetchSongerAlbum(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_songer_album, action.payload);
        if (data.code === 200 && data.hotAlbums) {
            yield put(actions.setSongerAlbum(data.hotAlbums));
            yield put(actions.setLoading(false));
        } else {
            yield put(actions.setLoading(false));
        }
    } catch (error) {
        return error;
    }
}

// 获取专辑详情
function* fetchAlbumInfo(action) {
    try {
        yield put(actions.setLoading(true));
        const data = yield call(get_album_detail, action.payload);
        if (data.code === 200 && data.songs) {
            yield put(actions.setAlbumInfo(data));
            yield put(actions.setLoading(false));
            yield put(musicAction.setSongDetail({
                tracks: data.songs
            }));
        } else {
            yield put(actions.setLoading(false));
        }
    } catch (error) {
        return error;
    }
}

export default function* searchSaga() {
    yield takeLatest(getSongerSongs().type, fetchSongerSongs);
    yield takeLatest(getSongerAlbum().type, fetchSongerAlbum);
    yield takeLatest(getAlbumInfo().type, fetchAlbumInfo);
}