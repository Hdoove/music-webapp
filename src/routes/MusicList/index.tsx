import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CircleIcon } from '@src/components/RunIcon/index';
import actions, { getSongDetail } from '@src/actions/music';
import { Icon } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Detail from './Detail/index';
import playIcon from '../../../public/assets/images/play.png';
import List from '@src/components/SongList/index';
import Header from '@src/components/Header/index';
import './index.less';

interface IProps {
    songList: any;
    music: {
        isShow: boolean;
        isPlay: boolean;
    };
    musicStatusSet: Function,
    songListGet: (id: number) => void,
    loading: boolean;
}
const MusicList: React.FC<IProps> = props => {

    const { songList, music, musicStatusSet, songListGet, loading } = props;
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const id = location.pathname.split('/')[2];
        if (id && id != songList.id) {
            songListGet(Number(id));
        }
    }, []);

    function handleClose() {
        setIsShowDetail(false);
    }

    return (
        <div
            className="musicListRoot"
        >
            <div style={{ display: isShowDetail ? 'none' : '' }}>
                <div className="bgImg" style={{
                    backgroundImage: `url(${songList.coverImgUrl})`,
                }} />
                <div className="body">
                    <Header title="歌单" isPlay={music.isPlay} goBack={() => { musicStatusSet({ ...music, isShow: false }); history.goBack(); }} goMusic={() => { musicStatusSet({ ...music, isShow: true }) }} />
                    <section className="content" style={{
                        display: loading ? 'none' : ''
                    }}>
                        <section className="listDetail" onClick={() => { setIsShowDetail(true) }}>
                            <div className="left" style={{ backgroundImage: `url(${songList.coverImgUrl})` }}>
                                <div className="listenNum">
                                    <img src={playIcon} />
                                    <span>{songList.playCount ? Math.ceil(songList.playCount / 10000) : 0}万</span>
                                </div>
                            </div>
                            <div className="right">
                                <p className="title" style={{ '-webkit-box-orient': 'vertical' }}>
                                    {songList.name || '暂无数据'}
                                </p>
                                <div className="createor">
                                    <img src={songList.creator ?.avatarUrl} alt="" />
                                    <span>{songList.creator ?.nickname || '暂无数据'}</span>
                                    <Icon type="right" />
                                </div>
                                <div className="description">
                                    <p style={{ '-webkit-box-orient': 'vertical' }}>
                                        {songList.description || '暂无简介'}
                                    </p>
                                    <Icon type="right" />
                                </div>
                            </div>
                        </section>
                        <List data={songList.tracks} title="listRoot" />
                    </section>
                </div>
                <CircleIcon style={{
                    position: 'absolute',
                    top: '46%',
                    left: '46%',
                    display: !loading ? 'none' : ''
                }} />
            </div>

            <Detail data={songList} isShow={isShowDetail} onClose={handleClose} />
        </div >
    );
}

const mapStateToProps = (state: any) => {
    const { music } = state;
    return {
        songList: music.songListDetail,
        music: music.musicStatus,
        loading: music.loading
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        musicStatusSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        },
        songListGet: (id: number) => {
            dispatch(getSongDetail(id));
        }
    };
};
const ConMusicList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicList);

export default ConMusicList;

