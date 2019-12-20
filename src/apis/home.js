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
export const get_hot_search = () =>
    request.get(`${PORT}/search/hot/detail`).then(res => res);

// 默认搜索关键字
export const get_default_search = () =>
    request.get(`${PORT}/search/default`).then(res => res);

// 搜索建议
export const get_search_suggest = (text) =>
    request.get(`${PORT}/search/suggest?keywords=${text}&type=mobile`).then(res => res);

// 搜索详情
// 默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export const get_search_detail = ({
        name,
        type,
        limit,
        offset
    }) =>
    request.get(`${PORT}/search?keywords=${name}&type=${type}&limit=${limit}&offset=${offset}`).then(res => res);

//获取歌手单曲
export const get_songer_song = ({
        id
    }) =>
    request.get(`${PORT}/artists?id=${id}`).then(res => res);

//获取歌手专辑
export const get_songer_album = ({
        id
    }) =>
    request.get(`${PORT}/artist/album?id=${id}`).then(res => res);

//获取专辑详情
export const get_album_detail = ({
        id
    }) =>
    request.get(`${PORT}/album?id=${id}`).then(res => res);

//获取榜单
export const get_toplist = () =>
    request.get(`${PORT}/toplist/detail`).then(res => res);

//获取榜单详情
export const get_toplist_detail = (id) =>
    request.get(`${PORT}/top/list?idx=${id}`).then(res => res);

//获取热门歌手
export const get_hot_songers = (offset) =>
    request.get(`${PORT}/top/artists?offset=${offset}&limit=15`).then(res => res);

//获取歌手列表
export const get_songers_list = ({
        type,
        offset
    }) =>
    request.get(`${PORT}/artist/list?cat=${type}&offset=${offset}&limit=15`).then(res => res);

//获取热门歌单类型
export const get_playlist_hot_type = () =>
    request.get(`${PORT}/playlist/hot`).then(res => res);

//获取歌单列表
export const get_playlist_type = () =>
    request.get(`${PORT}/playlist/catlist`).then(res => res);

//获取歌单列表
export const get_sheet_list = ({
        text,
        offset
    }) =>
    request.get(`${PORT}/top/playlist?cat=${text}&limit=30&offset=${offset}`).then(res => res);

//获取歌单评论
export const get_song_commits = ({
        id,
        offset
    }) =>
    request.get(`${PORT}/comment/music?id=${id}&limit=30&offset=${offset}`).then(res => res);