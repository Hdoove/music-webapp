import request from "./index";
const PORT = 'http://101.200.191.21:4000';

export const get_banner = () =>
    request.get(`${PORT}/banner?type=2`).then(res => res);

export const get_playList = () =>
    request.get(`${PORT}/personalized`).then(res => res);

// 歌单详情
export const get_song_list_detail = (id) =>
    request.get(`${PORT}/playlist/detail?id=${id}`).then(res => res);

// 获取歌词
export const get_geci = (id) =>
    request.get(`${PORT}/lyric?id=${id}`).then(res => res);
// 获取歌曲详情
export const get_song_detail = (id) =>
    request.get(`${PORT}/song/detail?ids=${id}`).then(res => res);