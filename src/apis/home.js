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

// 热搜
export const get_hot_search = (name, limit, offset) =>
    request.get(`${PORT}/search/hot/detail`).then(res => res);

// 搜索详情
// 默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export const get_search_detail = ({ name, type, limit, offset }) =>
    request.get(`${PORT}/search?keywords=${name}&type=${type}&limit=${limit}&offset=${offset}`).then(res => res);