import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Icon, Tabs } from 'antd';
const { TabPane } = Tabs;
import { get_hot_search, get_search_detail } from '@src/apis/home';
import HostSeatch from './component/HotSearch/index';
import SeatchSuggest from './component/Suggest';
import CompreComp from '@src/components/SearchShow/Compre/index';
import SongsComp from '@src/components/SearchShow/Songs/index';
import PlayListComp from '@src/components/SearchShow/PlayList/index';
import SongersComp from '@src/components/SearchShow/Songers/index';
import AlbumsComp from '@src/components/SearchShow/Albums/index';
import { RunIcon } from '@src/components/RunIcon/index';
import { connect } from 'react-redux';
import searchActions, { getSearchSongs, getSearchPlayLists, getSearchSonger, getSearchAlbums, getSearchDefault, getSearchSuggest } from '@src/actions/search';
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
    suggest: any;
    searchDefault: {
        realkeyword: string,
        showKeyword: string
    };
    searchLoading: boolean;
    getSuggest: (text: string) => void;
    playSongGeciGet: (id: number) => void;
    playSongInfoGet: (id: number) => void;
    getDefault: () => void;
    musicStatusSet: Function,
    changeSongOrder: (obj: { all: number, now: number }) => void;
    clearSuggest: () => void;
}

let timer: any = null;

function debounce(fn: Function, text: string) {
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(text);
        }, 500);
    }
}

const SearechPage: React.FC<IProps> = props => {

    const [searchList, setSearchList] = useState([]);
    const [allData, setAllData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [tab, setTab] = useState<string>('1');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [timer, setTimer] = useState<any>(null);

    const inputRef = useRef(null);

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
        searchAlbumsGet,
        searchDefault,
        getDefault,
        getSuggest,
        suggest,
        clearSuggest
    } = props;

    useEffect(() => {
        getDefault();
        get_hot_search().then(res => setSearchList(res.data));
    }, []);

    useEffect(() => {
        const bottom = document.querySelector('#songBottom');
        bottom && observer.observe(bottom);
    }, [songs.data, songs.data ?.length > 10 ? searchLoading : '' ]);

    useEffect(() => {
        const bottom = document.querySelector('#playListsBottom');
        bottom && observer.observe(bottom);
    }, [playLists.data, searchLoading]);

    useEffect(() => {
        const bottom = document.querySelector('#albumsBottom');
        bottom && observer.observe(bottom);
    }, [albums.data, searchLoading]);

    const observer = new IntersectionObserver(entries => {
        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                if (!searchLoading) {
                    switch (Number(tab)) {
                        case 2:
                            searchSongsGet({ name: value || searchDefault.realkeyword, type: seatchKey[Number(tab)], limit: songs.limit, offset: songs.offset });
                            break;
                        case 3:
                            searchPlayListsGet({ name: value || searchDefault.realkeyword, type: seatchKey[Number(tab)], limit: playLists.limit, offset: playLists.offset });
                            break;
                        case 5:
                            searchAlbumsGet({ name: value || searchDefault.realkeyword, type: seatchKey[Number(tab)], limit: albums.limit, offset: albums.offset });
                            break;
                        default:
                            break;
                    }
                }
                observer.unobserve(item.target);
            }
        });
    }, {
        root: null, // 父级元素
        rootMargin: '0px 0px 0px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
    });


    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        isSearch && setIsSearch(false);
        setValue(e.target.value);
        let fn = debounce(getSuggests, e.target.value);
        fn();
    }

    function getSuggests(value: string) {
        value && getSuggest(value);
    }

    function handleSearchKeyWord() {
        inputRef.current.blur();
        setIsFocus(false);
        Search(value || searchDefault.realkeyword);
    }

    function Search(text: string) {
        setTab('1');
        setLoading(true);
        setIsSearch(true);
        get_search_detail({ name: text, type: 1018, limit: 20, offset: 0 }).then(res => { setAllData(res.result); setLoading(false) });
    }

    function handleTabChange(num: number) {
        setTab(num.toString());
        switch (Number(num)) {
            case 2:
                searchSongsGet({ name: value || searchDefault.realkeyword, type: seatchKey[num], limit: 20, offset: 0 });
                break;
            case 3:
                searchPlayListsGet({ name: value || searchDefault.realkeyword, type: seatchKey[num], limit: 20, offset: 0 });
                break;
            case 4:
                searchSongerGet({ name: value || searchDefault.realkeyword, type: seatchKey[num], limit: 20, offset: 0 });
                break;
            case 5:
                searchAlbumsGet({ name: value || searchDefault.realkeyword, type: seatchKey[num], limit: 20, offset: 0 });
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
        Search(str);
    }

    function handleBlur() {
        setTimeout(() => {
            setIsFocus(false);
        }, 0);
    }

    function handleFocus() {
        setIsFocus(true);
    }

    function handleSuggest(text: string) {
        clearSuggest();
        setValue(text);
        setIsFocus(false);
        Search(text);
    }

    const history = useHistory();

    return (
        <div className="searchRoot">
            <section className="head">
                <Input
                    placeholder={searchDefault.showKeyword}
                    onChange={handleSearch}
                    className="searchInput"
                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={value}
                    onPressEnter={handleSearchKeyWord}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    ref={inputRef}
                    allowClear={true}
                />
                <span onClick={() => { history.push('/home') }}>取消</span>
            </section>
            {
                allData ? (
                    <Tabs defaultActiveKey="1" style={{ display: isSearch && !isFocus ? '' : 'none' }} activeKey={tab} onChange={handleTabChange}>
                        <TabPane tab="综合" key="1">
                            <CompreComp
                                goMore={(num: number) => handleTabChange(num)}
                                data={allData}
                                isShow={!loading}
                                getSong={handleGetSong}
                                getPlayList={handleGetPlayList}
                                getSonger={handleGetSonger}
                                getAlbums={handleGetAlbums}
                            />
                            <RunIcon style={{ background: 'red', display: loading ? '' : 'none' }}>
                                <span style={{ marginLeft: 12 }}>加载中...</span>
                            </RunIcon>
                        </TabPane>
                        <TabPane tab="单曲" key="2">
                            <SongsComp data={songs.data} getSong={handleGetSong} />
                            <div id="songBottom" style={{ border: '1px solid transparent' }}></div>
                            <RunIcon style={{ background: 'red', display: searchLoading ? '' : 'none' }}>
                            <span style={{ marginLeft: 12, display: searchLoading ? '' : 'none' }}>加载中...</span>
                            </RunIcon>
                        </TabPane>
                        <TabPane tab="歌单" key="3">
                            <PlayListComp data={playLists.data} getPlayList={handleGetPlayList} />
                            <div id="playListsBottom" style={{ border: '1px solid transparent' }}></div>
                            <RunIcon style={{ background: 'red', display: searchLoading ? '' : 'none' }}>
                            <span style={{ marginLeft: 12, display: searchLoading ? '' : 'none' }}>加载中...</span>
                            </RunIcon>
                        </TabPane>
                        <TabPane tab="歌手" key="4">
                            <SongersComp data={songers} getSonger={handleGetSonger} />
                            <RunIcon style={{ background: 'red', display: searchLoading ? '' : 'none' }}>
                                <span style={{ marginLeft: 12, display: searchLoading ? '' : 'none' }}>加载中...</span>
                            </RunIcon>
                        </TabPane>
                        <TabPane tab="专辑" key="5">
                            <AlbumsComp data={albums.data} getAlbums={handleGetAlbums} />
                            <div id="albumsBottom" style={{ border: '1px solid transparent' }}></div>
                            <RunIcon style={{ background: 'red' }}>
                                <span style={{ marginLeft: 12, display: searchLoading ? '' : 'none' }}>加载中...</span>
                            </RunIcon>
                        </TabPane>
                    </Tabs>
                ) : <p style={{ marginTop: '6vh', textAlign: 'center', display: isSearch ? '' : 'none' }}>暂无数据</p>
            }
            <SeatchSuggest isShow={isFocus} data={suggest} search={handleSuggest} />
            <HostSeatch data={searchList} isShow={!isSearch && !isFocus} onChoose={handleHotSearch} />
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { search } = state;
    const { songs, playLists, songer, albums, loading, suggest } = search;
    return {
        songs: songs,
        playLists: playLists,
        songers: songer,
        albums: albums,
        searchLoading: loading,
        searchDefault: search.default,
        suggest
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
        },
        getDefault: () => {
            dispatch(getSearchDefault());
        },
        clearSuggest: () => {
            dispatch(searchActions.setSearchSuggest());
        },
        getSuggest: (text: string) => {
            dispatch(getSearchSuggest(text));
        }
    };
};
const conSearechPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearechPage);
export default conSearechPage;