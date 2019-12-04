import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RunIcon, CircleIcon } from '@src/components/RunIcon/index';
import { getSongerSongs, getSongerAlbum } from '@src/actions/songerDetail';
import actions from '@src/actions/music';
import { Icon, Tabs } from 'antd';
const { TabPane } = Tabs;
import { useHistory, useLocation } from 'react-router-dom';
import List from '@src/components/SongList/index';
import { IAlbum } from '@src/components/SearchShow/Albums/index';
import './index.less';

interface IObj {
    id: number
}
interface IProps {
    songList: any;
    music: {
        isPlay: boolean,
        isShow: boolean
    };
    musicStatusSet: (item: { isShow: boolean, isPlay: boolean }) => void,
    songListGet: (id: number) => void,
    loading: boolean;
    songerSongsGet: (obj: IObj) => void;
    songerAlbumGet: (obj: IObj) => void;
    songerDetail: any;
}
const SongerDetail: React.FC<IProps> = props => {

    const { music, musicStatusSet, loading, songerSongsGet, songerDetail, songerAlbumGet } = props;
    const history = useHistory();
    const location = useLocation();
    const [tab, setTab] = useState<string>('1');

    useEffect(() => {
        const id = location.pathname.split('/')[2];
        if (id) {
            songerSongsGet({ id: Number(id) });
        }
    }, []);

    function handleTabChange(num: number) {
        setTab(num.toString());
        const id = location.pathname.split('/')[2];

        switch (Number(num)) {
            case 1:
                songerDetail.songs.length === 0 && songerSongsGet({ id: Number(id) });
                break;
            case 2:
                songerAlbumGet({ id: Number(id) })
                break;
            default:
                break;
        }
    }

    return (
        <div
            className="songerRoot"
        >
            <div>
                <div className="bgImg" style={{
                    backgroundImage: `url(${songerDetail.info ?.picUrl})`
                }} />
                <div className="body">
                    <header>
                        <Icon type="left" onClick={() => { history.goBack() }} />
                        <span style={{ fontSize: '4vw' }}>歌手</span>
                        <div style={{ display: 'flex' }} onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
                            <Icon type="align-left" rotate={-90} style={{ display: music.isPlay ? 'none' : 'blick' }} />
                            <RunIcon style={{ display: !music.isPlay ? 'none' : 'blick', background: '#fff' }} />
                        </div>
                    </header>
                    <section className="content">
                        <section className="listDetail">
                            <span className="songerName">{songerDetail.info ?.name }</span>
                            <span className="detailName">
                                {`单曲数 ${songerDetail ?.info ?.musicSize || 0} 专辑数 ${songerDetail ?.info ?.albumSize || 0} MV数 ${songerDetail ?.info ?.mvSize || 0}`}
                            </span>
                        </section>
                        <section className="list">
                            <Tabs defaultActiveKey="1" onChange={handleTabChange} activeKey={tab}>
                                <TabPane tab="热门单曲" key="1">
                                    <List data={songerDetail.songs} title="" />
                                </TabPane>
                                <TabPane tab="专辑" key="2">
                                    <ul className="albums">
                                        {
                                            songerDetail.album && songerDetail.album.map((item: IAlbum, index: number) => {
                                                return (
                                                    <li onClick={() => { history.push(`/album/${item.id}`) }}>
                                                        <img src={item.picUrl} alt="" />
                                                        <div style={{ display: 'inline-block', marginLeft: '2vw' }}>
                                                            <span style={{ color: '#000000', display: 'block' }}>{item.name}</span>
                                                            <span style={{ color: '#858687', fontSize: '3vw' }}>
                                                                {
                                                                    `
                                                                    ${new Date(item.publishTime).toLocaleDateString()} ${item.size}首
                                                `
                                                                }
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </TabPane>
                            </Tabs>
                        </section>
                    </section>
                </div>
                <CircleIcon style={{
                    position: 'absolute',
                    top: '46%',
                    left: '46%',
                    display: !loading ? 'none' : ''
                }} />
            </div>
        </div >
    );
}

const mapStateToProps = (state: any) => {
    const { songerDetail, music } = state;
    return {
        songerDetail,
        songList: music.songListDetail,
        music: music.musicStatus,
        loading: songerDetail.loading
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        musicStatusSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        },
        songerSongsGet: (obj: IObj) => {
            dispatch(getSongerSongs(obj));
        },
        songerAlbumGet: (obj: IObj) => {
            dispatch(getSongerAlbum(obj));
        }
    };
};
const ConSongerDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongerDetail);

export default ConSongerDetail;

