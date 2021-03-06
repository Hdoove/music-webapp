import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CircleIcon } from '@src/components/RunIcon/index';
import actions, { getSongDetail } from '@src/actions/music';
import { getAlbumInfo } from '@src/actions/songerDetail';
import { Icon } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Detail from './Detail/index';
import List from '@src/components/SongList/index';
import './index.less';
import Header from '@src/components/Header/index';

interface IProps {
    music: {
        isShow: boolean;
        isPlay: boolean;
    };
    albuminfo: any;
    musicStatusSet: Function,
    songListGet: (id: number) => void,
    loading: boolean;
    albumInfo: (obj: { id: number }) => void;
}

const Album: React.FC<IProps> = props => {

    const { music, musicStatusSet, loading, albumInfo, albuminfo } = props;
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const id = location.pathname.split('/')[2];
        if (id && id != albuminfo ?.album ?.id) {
            albumInfo({ id: Number(id) });
        }
    }, []);

    function handleClose() {
        setIsShowDetail(false);
    }

    function goSonger(id: number) {
        history.push(`/songer/${id}`);
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
                    <Header title="专辑" isPlay={music.isPlay} goBack={() => { musicStatusSet({ ...music, isShow: false }); history.goBack(); }} goMusic={() => { musicStatusSet({ ...music, isShow: true }) }} />
                    <section className="content">
                        <section className="listDetail">
                            <div className="left" style={{ backgroundImage: `url(${albuminfo ?.album ?.picUrl})` }} />
                            <div className="right">
                                <p className="title" style={{ '-webkit-box-orient': 'vertical' }}>
                                    {albuminfo ?.album ?.name}
                                </p>
                                <div className="createor">
                                    <span onClick={() => { goSonger(albuminfo ?.album ?.artist ?.id) }}>歌手：{albuminfo ?.album ?.artist ?.name}</span>
                                    <Icon type="right" />
                                </div>
                                <div className="createor">
                                    <span>发行时间：{new Date(albuminfo ?.album ?.publishTime).toLocaleDateString()}</span>
                                </div>
                                <div className="description" onClick={() => { setIsShowDetail(true) }}>
                                    <p style={{ '-webkit-box-orient': 'vertical' }}>
                                        {albuminfo ?.album ?.description || '暂无介绍'}
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
        music: music.musicStatus,
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

