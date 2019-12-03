import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RunIcon, CircleIcon } from '@src/components/RunIcon/index';
import actions, { getSongDetail } from '@src/actions/music';
import { getAlbumInfo } from '@src/actions/songerDetail';
import { Icon } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Detail from './Detail/index';
import List from '@src/components/SongList/index';
import './index.less';

interface IProps {
    songList: any;
    music: any;
    musicStatusSet: Function,
    songListGet: (id: number) => void,
    playSong: any;
    loading: boolean;
    albumInfo: (obj: { id: number }) => void;
    albuminfo: any;
}

const Album: React.FC<IProps> = props => {

    const { songList, music, musicStatusSet, loading, albumInfo, albuminfo } = props;
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const id = location.pathname.split('/')[2];
        if (id && id != songList.id) {
            albumInfo({ id: Number(id) });
        }
    }, []);

    function handleClose() {
        setIsShowDetail(false);
    }

    return (
        <div
            className="albumRoot"
        >
            <div style={{ display: isShowDetail ? 'none' : '' }}>
                <div className="bgImg" style={{
                    backgroundImage: `url(${albuminfo ?.album ?.picUrl})`,
                    display: loading ? 'none' : ''
                }} />
                <div className="body" style={{
                    display: loading ? 'none' : ''
                }}>
                    <header>
                        <Icon type="left" onClick={() => { history.goBack() }} />
                        <span style={{ fontSize: '4vw' }}>专辑</span>
                        <div style={{ display: 'flex' }} onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
                            <Icon type="align-left" rotate={-90} style={{ display: music.isPlay ? 'none' : 'blick' }} />
                            <RunIcon style={{ display: !music.isPlay ? 'none' : 'blick', background: '#fff' }} />
                        </div>
                    </header>
                    <section className="content">
                        <section className="listDetail" onClick={() => { setIsShowDetail(true) }}>
                            <div className="left" style={{ backgroundImage: `url(${albuminfo ?.album ?.picUrl})` }} />
                            <div className="right">
                                <p className="title" style={{ '-webkit-box-orient': 'vertical' }}>
                                    {albuminfo ?.album ?.name}
                                </p>
                                <div className="createor">
                                    <span>歌手：{albuminfo ?.album ?.artist ?.name}</span>
                                    <Icon type="right" />
                                </div>
                                <div className="createor">
                                    <span>发行时间：{new Date(albuminfo ?.album ?.publishTime).toLocaleDateString()}</span>
                                </div>
                                <div className="description">
                                    <p style={{ '-webkit-box-orient': 'vertical' }}>
                                        {albuminfo ?.album ?.description}
                                    </p>
                                    <Icon type="right" />
                                </div>
                            </div>
                        </section>
                        <List data={albuminfo.songs} title="listRoot" />
                    </section>
                </div>
                <CircleIcon style={{
                    position: 'absolute',
                    top: '46%',
                    left: '46%',
                    display: !loading ? 'none' : ''
                }} />
            </div>

            <Detail data={albuminfo.album} isShow={isShowDetail} onClose={handleClose} />
        </div >
    );
}

const mapStateToProps = (state: any) => {
    const { music, songerDetail } = state;
    return {
        songList: music.songListDetail,
        music: music.musicStatus,
        playSong: music.playMusicInfo,
        loading: songerDetail.loading,
        albuminfo: songerDetail.albumInfo
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        musicStatusSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        },
        songListGet: (id: number) => {
            dispatch(getSongDetail(id));
        },
        albumInfo: (obj: { id: number }) => {
            dispatch(getAlbumInfo(obj));
        }
    };
};
const ConAlbum = connect(
    mapStateToProps,
    mapDispatchToProps
)(Album);

export default ConAlbum;

