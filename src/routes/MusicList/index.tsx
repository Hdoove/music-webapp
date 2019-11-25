import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { RunIcon, CircleIcon } from '@src/components/RunIcon/index';
import actions, { getPlaySongGeci, getPlaySongInfo, getSongDetail } from '@src/actions/music';
import { Icon, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { get_geci } from '@src/apis/home';
import Detail from './Detail/index';
import playIcon from '@src/images/play.png';
import './index.less';

interface IProps {
    songList: any;
    music: any;
    playSongGeciGet: (id: number) => void;
    playSongInfoGet: (id: number) => void;
    musicStatusSet: Function,
    songListGet: (id: number) => void,
    changeSongOrder: (obj: { all: number, now: number }) => void,
    playSong: any;
    loading: boolean;
}
const MusicList: React.FC<IProps> = props => {

    const { songList, music, playSongGeciGet, playSongInfoGet, musicStatusSet, songListGet, playSong, loading, changeSongOrder } = props;
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        let head: any = document.querySelector('.fixedTop');
        let reference: any = document.querySelector('.reference');
        const id = location.pathname.split('/')[2];
        if (id && id != songList.id) {
            songListGet(Number(id));
        }

        new IntersectionObserver(entries => {
            let item = entries[0];
            let top = item.boundingClientRect.top;

            // 当参照元素的的top值小于屏幕高度的0.08，也就是在视窗的顶部的时候，开始吸顶，否则移除吸顶
            if (top && top < document.documentElement.clientHeight * 0.079) {
                head.classList.add("fixed");
            } else {
                head.classList.remove("fixed");
            }

        }).observe(reference);
    }, []);

    function handleClose() {
        setIsShowDetail(false);
    }

    function publicPlay(songId: number, songIndex: number, play: boolean, show: boolean) {
        playSongGeciGet(songId);
        playSongInfoGet(songId);
        musicStatusSet({ isPlay: play, isShow: show });
        changeSongOrder({ all: songList.tracks.length - 1, now: songIndex });
    }

    function handlePlayMusic(id: number, index: number) {
        if (id === playSong[0] ?.id) {
            musicStatusSet({ isPlay: true, isShow: true });
        } else {
            publicPlay(id, index, true, true);
        }
    }

    function handlePlayAll() {
        publicPlay(songList.tracks[0].id, 0, true, false);
    }

    return (
        <div
            className="musicListRoot"
        >
            <div style={{ display: isShowDetail ? 'none' : '' }}>
                <div className="bgImg" style={{
                    backgroundImage: `url(${songList.coverImgUrl})`,
                    display: loading ? 'none' : ''
                }} />
                <div className="body" style={{
                    display: loading ? 'none' : ''
                }}>
                    <header>
                        <Icon type="left" onClick={() => { history.push('/home') }} />
                        <span style={{ fontSize: '4vw' }}>歌单</span>
                        <div style={{ display: 'flex' }} onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
                            <Icon type="align-left" rotate={-90} style={{ display: music.isPlay ? 'none' : 'blick' }} />
                            <RunIcon style={{ display: !music.isPlay ? 'none' : 'blick', background: '#fff' }} />
                        </div>
                    </header>
                    <section className="content">
                        <section className="listDetail" onClick={() => { setIsShowDetail(true) }}>
                            <div className="left" style={{ backgroundImage: `url(${songList.coverImgUrl})` }}>
                                <div className="listenNum">
                                    <img src={playIcon} />
                                    <span>{Math.ceil(songList.playCount / 10000)}万</span>
                                </div>
                            </div>
                            <div className="right">
                                <p className="title" style={{ '-webkit-box-orient': 'vertical' }}>
                                    {songList.name}
                                </p>
                                <div className="createor">
                                    <img src={songList.creator ?.avatarUrl} alt="" />
                                    <span>{songList.creator ?.nickname}</span>
                                    <Icon type="right" />
                                </div>
                                <div className="description">
                                    <p style={{ '-webkit-box-orient': 'vertical' }}>
                                        {songList.description}
                                    </p>
                                    <Icon type="right" />
                                </div>
                            </div>
                        </section>
                        <section className="list">
                            <div className="reference"></div>
                            <div className="fixedTop">
                                <div className="left">
                                    <Icon type="play-circle" onClick={handlePlayAll} />
                                    <span>播放全部</span>
                                    <span>(共 {`${songList.tracks && songList.tracks.length} 首`})</span>
                                </div>
                                <div className="right">
                                    <Icon type="plus" />
                                    <span>
                                        收藏({`${songList.commentCount}`})
                                </span>
                                </div>
                            </div>
                            <ul className="songs">
                                {
                                    songList.tracks && songList.tracks.map((item: { name: string, ar: { name: string }[], al: { name: string } }, index: number) => {
                                        const canPlay = item.fee === 1;
                                        const isThis = playSong[0] ?.id === item.id;
                                        return (
                                            <li
                                                style={{ background: canPlay ? 'rgb(153, 153, 153, .1)' : '#fff' }}
                                                onClick={() => { !canPlay ? handlePlayMusic(item.id, index) : message.info('此歌曲为vip专享') }}
                                            >
                                                <span className="index">{index + 1}</span>
                                                <p className="songName" style={{ color: isThis ? 'red' : '', '-webkit-box-orient': 'vertical' }}>
                                                    {item.name}
                                                    <span className="vip" style={{ display: canPlay ? '' : 'none' }}>vip</span>
                                                </p>
                                                <p className="nowrap" style={{ '-webkit-box-orient': 'vertical' }}>
                                                    <span className="songerName" style={{ color: isThis ? 'red' : '' }}>{item.ar[0] ?.name}</span>
                                                    <span className="line">-</span>
                                                    <span className="albumName" style={{ color: isThis ? 'red' : '' }}>{item.al ?.name}</span>
                                                </p>
                                                <Icon type="dash" className="more" rotate={90} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
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

            <Detail data={songList} isShow={isShowDetail} onClose={handleClose} />
        </div >
    );
}

const mapStateToProps = (state: any) => {
    const { music } = state;
    return {
        songList: music.songListDetail,
        music: music.musicStatus,
        playSong: music.playMusicInfo,
        loading: music.loading
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        musicStatusSet: (item: { isShow: false }) => {
            dispatch(actions.setMusicStatus(item));
        },
        playSongGeciGet: (id: number) => {
            // console.log(actions);
            dispatch(getPlaySongGeci(id));
        },
        playSongInfoGet: (id: number) => {
            dispatch(getPlaySongInfo(id));
        },
        songListGet: (id: number) => {
            dispatch(getSongDetail(id));
        },
        changeSongOrder: (obj: { all: number, now: number }) => {
            dispatch(actions.setAllAndThisSong(obj));
        }
    };
};
const ConMusicList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicList);

export default ConMusicList;

