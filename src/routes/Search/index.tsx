import React, { ChangeEvent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Icon, Tabs } from 'antd';
const { Search } = Input;
const { TabPane } = Tabs;
import { get_hot_search, get_search_detail } from '@src/apis/home';
import HostSeatch from './component/HotSearch/index';
import CompreComp from '@src/components/SearchShow/Compre/index';
import SongsComp from '@src/components/SearchShow/Songs/index';
import PlayListComp from '@src/components/SearchShow/PlayList/index';
import { RunIcon } from '@src/components/RunIcon/index';
import { connect } from 'react-redux';
import { getSearchSongs, getSearchPlayLists } from '@src/actions/search';
import actions, { getPlaySongGeci, getPlaySongInfo, getSongDetail } from '@src/actions/music';

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
    songs: any;
    playLists: any;
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
        searchPlayListsGet 
    } = props;

    useEffect(() => {
        get_hot_search().then(res => setSearchList(res.data));
        get_search_detail({ name: '张杰', type: 1018, limit: 0, offset: 0 }).then(res => { setAllData(res.result); setLoading(false) });
    }, []);

    useEffect(() => {
        const bottom = document.querySelector('#songBottom');
        bottom && observer.observe(bottom);
    }, [songs.data, searchLoading]);

    useEffect(() => {
        const bottom = document.querySelector('#playListsBottom');
        bottom && observer.observe(bottom);
    }, [playLists.data, searchLoading]);

    const observer = new IntersectionObserver(entries => {
        // const bottom = document.querySelector('#songBottom');

        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                if (!searchLoading) {
                    switch (Number(tab)) {
                        case 2:
                            searchSongsGet({ name: '张杰', type: 1, limit: songs.limit, offset: songs.offset });
                            break;
                        case 3:
                            searchPlayListsGet({ name: '张杰', type: 1000, limit: playLists.limit, offset: playLists.offset });
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
        setLoading(true);
        get_search_detail({ name: '张杰', type: 1018, limit: 0, offset: 0 }).then(res => { setAllData(res.result); setLoading(false) });
        // get_search_detail(value, 1018, 0, 0).then(res => { setAllData(res.result); setLoading(false) });
    }

    function handleTabChange(num: number) {
        setTab(num.toString());
        switch (Number(num)) {
            case 2:
                songs.data.length === 0 && searchSongsGet({ name: '张杰', type: seatchKey[num], limit: songs.limit, offset: songs.offset });
                break;
            case 3:
                searchPlayListsGet({ name: '张杰', type: seatchKey[num], limit: playLists.limit, offset: playLists.offset });
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
        history.push(`/list/${id}`)
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
                />
                <span onClick={handleSearchKeyWord}>搜索</span>
                <span onClick={() => { history.push('/home') }}>取消</span>
            </section>
            <RunIcon style={{ display: loading ? '' : 'none', background: 'red' }} top={12} />
            <Tabs defaultActiveKey="1" onChange={handleTabChange} activeKey={tab}>
                {/* <Tabs defaultActiveKey="1" style={{ display: value !== '' && allData.song ? '' : 'none' }}> */}
                <TabPane tab="综合" key="1">
                    <CompreComp goMore={(num: number) =>  setTab(num.toString()) } data={allData} isShow={!loading} getSong={handleGetSong} getPlayList={handleGetPlayList}/>
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
                    歌手
                </TabPane>
                <TabPane tab="专辑" key="5">
                    专辑
                </TabPane>
            </Tabs>
            {/* <HostSeatch data={searchList} isShow={allData.song === undefined} /> */}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { search } = state;
    return {
        songs: search.songs,
        playLists: search.playLists,
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