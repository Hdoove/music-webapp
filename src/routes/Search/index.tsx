import React, { ChangeEvent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Icon, Tabs } from 'antd';
const { TabPane } = Tabs;
import { get_hot_search, get_search_detail } from '@src/apis/home';
import HostSeatch from './component/HotSearch/index';
import CompreComp from '@src/components/SearchShow/Compre/index';
import SongsComp from '@src/components/SearchShow/Songs/index';
import PlayListComp from '@src/components/SearchShow/PlayList/index';
import SongersComp from '@src/components/SearchShow/Songers/index';
import AlbumsComp from '@src/components/SearchShow/Albums/index';
import { RunIcon } from '@src/components/RunIcon/index';
import { connect } from 'react-redux';
import { getSearchSongs, getSearchPlayLists, getSearchSonger, getSearchAlbums } from '@src/actions/search';
import actions, { getPlaySongGeci, getPlaySongInfo } from '@src/actions/music';

import './index.less';

interface SearchFilter {
    name: string,
    type: number,
    limit: number,
    offset: number
}

interface ISearch {
    [propsName: number]: number
}

const seatchKey: ISearch = {
    2: 1,
    3: 1000,
    4: 100,
    5: 10
}

interface IProps {
    searchSongsGet: (obj: SearchFilter) => void;
    searchPlayListsGet: (obj: SearchFilter) => void;
    searchSongerGet: (obj: SearchFilter) => void;
    searchAlbumsGet: (obj: SearchFilter) => void;
    songs: any;
    playLists: any;
    songers: any;
    albums: any;
    searchLoading: boolean;
    playSongGeciGet: (id: number) => void;
    playSongInfoGet: (id: number) => void;
    musicStatusSet: Function,
    changeSongOrder: (obj: { all: number, now: number }) => void
}

const SearechPage: React.FC<IProps> = props => {

    const [searchList, setSearchList] = useState([]);
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [tab, setTab] = useState<string>('1');

    const {
        searchSongsGet,
        songs,
        searchLoading,
        playSongGeciGet,
        playSongInfoGet,
        musicStatusSet,
        changeSongOrder,
        playLists,
        songers,
        albums,
        searchPlayListsGet,
        searchSongerGet,
        searchAlbumsGet
    } = props;

    useEffect(() => {
        get_hot_search().then(res => setSearchList(res.data));
    }, []);

    useEffect(() => {
        const bottom = document.querySelector('#songBottom');
        bottom && observer.observe(bottom);
    }, [songs.data, searchLoading]);

    useEffect(() => {
        const bottom = document.querySelector('#playListsBottom');
        bottom && observer.observe(bottom);
    }, [playLists.data, searchLoading]);

    useEffect(() => {
        const bottom = document.querySelector('#albumsBottom');
        bottom && observer.observe(bottom);
    }, [albums.data, searchLoading]);

    const observer = new IntersectionObserver(entries => {
        const bottom = document.querySelector('#albumsBottom');

        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                if (!searchLoading) {
                    switch (Number(tab)) {
                        case 2:
                            searchSongsGet({ name: value, type: seatchKey[Number(tab)], limit: songs.limit, offset: songs.offset });
                            break;
                        case 3:
                            searchPlayListsGet({ name: value, type: seatchKey[Number(tab)], limit: playLists.limit, offset: playLists.offset });
                            break;
                        case 4:
                            searchSongerGet({ name: value, type: seatchKey[Number(tab)], limit: 20, offset: 0 });
                            break;
                        case 5:
                            console.log(albums.offset, albums.allCount);
                            albums.offset < albums.allCount && searchAlbumsGet({ name: value, type: seatchKey[Number(tab)], limit: 20, offset: albums.offset });
                            break;
                        default:
                            break;
                    }
                }

                if (songs.allCount <= songs.data.length) {
                    // observer.unobserve(bottom);
                }
            }
        });
    }, {
            root: null, // 父级元素
            rootMargin: '0px 0px 0px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
        });


    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function handleSearchKeyWord() {
        setTab('1');
        setLoading(true);
        get_search_detail({ name: value, type: 1018, limit: 20, offset: 0 }).then(res => { setAllData(res.result); setLoading(false) });
    }

    function handleTabChange(num: number) {
        setTab(num.toString());
        switch (Number(num)) {
            case 2:
                searchSongsGet({ name: value, type: seatchKey[num], limit: 20, offset: 0 });
                break;
            case 3:
                searchPlayListsGet({ name: value, type: seatchKey[num], limit: 20, offset: 0 });
                break;
            case 4:
                searchSongerGet({ name: value, type: seatchKey[num], limit: 20, offset: 0 });
                break;
            case 5:
                searchAlbumsGet({ name: value, type: seatchKey[num], limit: 20, offset: 0 });
                break;
            default:
                break;
        }
    }

    function handleGetSong(id: number) {
        playSongGeciGet(id);
        playSongInfoGet(id);
        musicStatusSet({ isPlay: true, isShow: true });
        changeSongOrder({ all: 1, now: 1 });
    }

    function handleGetPlayList(id: number) {
        history.push(`/list/${id}`);
    }

    function handleGetSonger(id: number) {
        history.push(`/songer/${id}`);
    }

    function handleGetAlbums(id: number) {
        history.push(`/album/${id}`);
    }

    function handleHotSearch(str: string) {
        setValue(str);
        setTab('1');
        setLoading(true);
        get_search_detail({ name: str, type: 1018, limit: 20, offset: 0 }).then(res => { setAllData(res.result); setLoading(false) });
    }

    const history = useHistory();
    return (
        <div className="searchRoot">
            <section className="head">
                <Input
                    placeholder="请搜索"
                    onChange={handleSearch}
                    className="searchInput"
                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={value}
                />
                <span onClick={handleSearchKeyWord}>搜索</span>
                <span onClick={() => { history.push('/home') }}>取消</span>
            </section>
            <RunIcon style={{ display: loading ? '' : 'none', background: 'red' }} top={12} />
            <Tabs defaultActiveKey="1" style={{ display: value !== '' && allData.song ? '' : 'none' }} activeKey={tab} onChange={handleTabChange}>
                <TabPane tab="综合" key="1">
                    <CompreComp goMore={(num: number) => handleTabChange(num)} data={allData} isShow={!loading} getSong={handleGetSong} getPlayList={handleGetPlayList} />
                </TabPane>
                <TabPane tab="单曲" key="2">
                    <SongsComp data={songs.data} getSong={handleGetSong} />
                    <div id="songBottom" style={{ border: '1px solid transparent' }}></div>
                    <RunIcon style={{ background: 'red', display: searchLoading ? '' : 'none' }} />
                </TabPane>
                <TabPane tab="歌单" key="3">
                    <PlayListComp data={playLists.data} getPlayList={handleGetPlayList} />
                    <div id="playListsBottom" style={{ border: '1px solid transparent' }}></div>
                    <RunIcon style={{ background: 'red', display: searchLoading ? '' : 'none' }} />
                </TabPane>
                <TabPane tab="歌手" key="4">
                    <SongersComp data={songers} getSonger={handleGetSonger} />
                    <RunIcon style={{ background: 'red', display: searchLoading ? '' : 'none' }} />
                </TabPane>
                <TabPane tab="专辑" key="5">
                    <AlbumsComp data={albums.data} getAlbums={handleGetAlbums} />
                    <div id="albumsBottom" style={{ border: '1px solid transparent' }}></div>
                    <RunIcon style={{ background: 'red', display: searchLoading ? '' : 'none' }} />
                </TabPane>
            </Tabs>
            <HostSeatch data={searchList} isShow={allData.song === undefined} onChoose={handleHotSearch} />
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { search } = state;
    return {
        songs: search.songs,
        playLists: search.playLists,
        songers: search.songer,
        albums: search.albums,
        searchLoading: search.loading
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        searchSongsGet: (obj: SearchFilter) => {
            dispatch(getSearchSongs(obj));
        },
        searchPlayListsGet: (obj: SearchFilter) => {
            dispatch(getSearchPlayLists(obj));
        },
        searchSongerGet: (obj: SearchFilter) => {
            dispatch(getSearchSonger(obj));
        },
        searchAlbumsGet: (obj: SearchFilter) => {
            dispatch(getSearchAlbums(obj));
        },
        musicStatusSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        },
        playSongGeciGet: (id: number) => {
            dispatch(getPlaySongGeci(id));
        },
        playSongInfoGet: (id: number) => {
            dispatch(getPlaySongInfo(id));
        },
        changeSongOrder: (obj: { all: number, now: number }) => {
            dispatch(actions.setAllAndThisSong(obj));
        }
    };
};
const conSearechPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearechPage);
export default conSearechPage;