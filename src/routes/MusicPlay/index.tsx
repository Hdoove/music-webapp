import React, { useEffect, useState, useRef } from 'react';
import { changeTime } from '@src/utilities/changeTime';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircleIcon } from '@src/components/RunIcon/index';
import changpianIcon from '../../../public/assets/images/changpian.jpg';
import actions, { getSongDetail, getPlaySongGeci, getPlaySongInfo } from '../../actions/music';
import { Icon } from 'antd';
import onlySong from '../../../public/assets/images/only.png';
import sortSong from '../../../public/assets/images/sort.png';
import xunhuanSong from '../../../public/assets/images/xunhuan.png';
import SongList from "./components/songList";

import './index.less';

interface IProps {
    musicinfoSet: Function;
    playSongGeciGet: (id: number) => void;
    playSongInfoGet: (id: number) => void;
    setIsShowList: (isShow: boolean) => void;
    changeSongOrder: (obj: { all: number, now: number }) => void;
    music: {
        isShow: boolean;
        isPlay: boolean;
    };
    songList: any;
    isShowList: boolean;
    songGeci: any;
    musicInfo: any;
    orderSongs: {
        all: number,
        now: number
    },
    onPlay: (id: number, index: number) => void;
    onPlayAll: () => void;
}
const Music: React.FC<IProps> = props => {

    const [playLen, setPlayLen] = useState<number>(0);// 播放进度条
    const [bufferLen, setBufferLen] = useState<number>(0); // 缓存时长    
    const [currentTime, setCurrentTiem] = useState<number>(0); // 歌曲总时长歌曲播放时长
    const [allTime, setAllTime] = useState<number>(0); // 歌曲总时长
    const [playStatus, setPlayStatus] = useState<number>(0);// 0顺序播放  1 单独播放 2 随机播放
    const [selectGeciNum, setSelectGeciNum] = useState<number>(-1);
    const [geci, setGeci] = useState<({ time: number, text: string } | undefined)[]>([]);
    const [isShowGeci, setIsShowGeci] = useState<boolean>(false); // 显示歌词还是转盘
    const audioRef = useRef<any>();

    const { music,
        musicinfoSet,
        playSongGeciGet,
        playSongInfoGet,
        songList,
        isShowList,
        setIsShowList,
        songGeci,
        musicInfo,
        orderSongs,
        changeSongOrder
    } = props;

    const width: number = document.documentElement.clientWidth;
    const height: number = document.documentElement.clientHeight;
    let center: number = 0;
    if (height <= 667) {
        center = 5;
    } else if (height > 667 && height <= 812) {
        center = 6;
    } else {
        center = 9;
    }
    const history = useHistory();


    function timeupdate() {
        const current = audioRef.current;
        if (current) {
            sessionStorage.getItem('isMove') === '0' ? setPlayLen(current.duration && current.currentTime * 78 / current.duration) : '';
            setCurrentTiem(current.currentTime);
            //获取以缓冲部分的timeRanges对象
            const timeRanges = current.buffered;
            //获取已缓存时间
            const timeBuffered = timeRanges.end(timeRanges.length - 1);
            //获取缓存进度
            const bufferPercent = timeBuffered / current.duration;
            setBufferLen(bufferPercent * 78);
        }
    };

    useEffect(() => {
        sessionStorage.setItem('isMove', '0');
        const current = audioRef.current;
        if (current) {
            current.addEventListener('canplay', function () {
                setAllTime(current.duration);
            });
            current.addEventListener('timeupdate', function () { timeupdate(); });
        }
    }, []);

    useEffect(() => {
        const current = audioRef.current;
        if (current) {
            current.removeEventListener("ended", function () {
                handleNextSong();
            });
            current.addEventListener("ended", function () {
                handleNextSong();
            });
        }
    }, [orderSongs]);

    useEffect(() => {
        const gecisplit = songGeci.lyric ?.split('\n');
        if (gecisplit) {
            const newGeci = gecisplit.map(item => {
                const [time, text] = item.split(']');
                const [minute, secont] = time.slice(1).split(':');
                if (text !== undefined && minute !== undefined && secont !== undefined) {
                    return {
                        time: Number(minute) * 60 + parseFloat(secont),
                        text
                    }
                }
            });
            newGeci.pop();
            setGeci(newGeci);
        }
    }, [songGeci]);

    useEffect(() => {
        setPlayLen(0);
        setBufferLen(0);
        setCurrentTiem(0);
        setAllTime(0);
        setSelectGeciNum(-1);
    }, [musicInfo]);

    function handleTouchStart() {
        sessionStorage.setItem('isMove', '1');
    }

    function handleTouchMove(e: any) {
        const ev = e || window.event;
        const oLeft = ev.targetTouches[0].clientX;
        if (oLeft < width * 0.094) {
            setPlayLen(0);
        } else if (oLeft > width * 0.894) {
            setPlayLen(78);
        } else {
            setPlayLen((oLeft - width * 0.094) * 100 / width);
        }
    }
    function handleTouchEnd() {
        const current = audioRef.current;
        current.currentTime = allTime * (playLen / 78);
        sessionStorage.setItem('isMove', '0');
    }

    function handleCloseList() {
        setIsShowList(false);
    }

    function handleChangePlayStatus() {
        setPlayStatus((playStatus + 1) > 2 ? 0 : (playStatus + 1));
    }

    function publicChangeSong(songId: number, songIndex: number) {
        changeSongOrder({ ...orderSongs, now: songIndex });
        playSongGeciGet(songId);
        playSongInfoGet(songId);
    }

    function handleLastSong() {
        let lastNum: number = 0;
        if (playStatus === 0 || playStatus === 1) {
            lastNum = orderSongs.now === 0 ? orderSongs.all - 1 : orderSongs.now - 1;
        } else if (playStatus === 2) {
            lastNum = Math.round(Math.random() * orderSongs.all);
        }
        publicChangeSong(songList.tracks[lastNum].id, lastNum);
    }

    function handleNextSong() {
        let nextNum: number = 0;
        if (playStatus === 0 || playStatus === 1) {
            nextNum = orderSongs.all > orderSongs.now ? orderSongs.now + 1 : 0;
        } else if (playStatus === 2) {
            nextNum = Math.round(Math.random() * orderSongs.all);
        }
        publicChangeSong(songList.tracks[nextNum].id, nextNum);
    }

    function handlePlay(id: number, index: number) {
        publicChangeSong(id, index);
    }

    function handlePlayAll() {
        publicChangeSong(songList.tracks[0].id, 0);
    }

    // console.log(musicInfo[0]);
    const moveTip = (selectGeciNum + 1) > center ? selectGeciNum - center + 1 : 0;

    useEffect(() => {
        for (let i = 0, len = geci.length; i < len; i++) {
            if (geci[i] && geci[i].time <= currentTime && geci[i + 1] && geci[i + 1].time > currentTime) {
                i !== selectGeciNum ? setSelectGeciNum(i) : '';
            }
        }
    }, [currentTime]);

    return (
        <div
            className="musicRoot"
        >
            <div className="bg" style={{ backgroundImage: `url(${musicInfo[0] ?.al ?.picUrl})` }} />
            <div className="body" style={{ display: allTime <= 0 ? 'none' : '' }}>
                <header className="musicPlayHead">
                    <Icon
                        type="left"
                        className="icon"
                        onClick={() => { musicinfoSet({ ...music, isShow: false }); setIsShowList(false); }}
                    />
                    <div>
                        <span>{musicInfo[0] ?.name}</span>
                        <span>{musicInfo[0] ?.al ?.name} > </span>
                    </div>
                    <Icon type="share-alt" className="icon" />
                </header>
                <div className="content" onClick={() => { setIsShowGeci(!isShowGeci) }}>
                    <div style={{ display: isShowGeci ? 'none' : '' }}>
                        <img className="changpian" src={changpianIcon} alt="" style={{ transform: `translate(42%) rotate(${music.isPlay ? 30 : 0}deg)` }} />
                        <div className='cricle' >
                            <img className="animation" src={musicInfo[0] ?.al ?.picUrl} style={{ animationPlayState: music.isPlay ? 'running' : 'paused' }} />
                        </div>
                    </div>
                    <div style={{ display: !isShowGeci ? 'none' : '' }}>
                        {
                            geci && geci.map((item: { text: string }, index: number) => {
                                return (
                                    <p
                                        className={`nomal ${index === selectGeciNum ? 'active' : ''}`}
                                        style={{
                                            top: `${index * 2.8 - (moveTip) * 2.8}rem`
                                        }}
                                    >
                                        {item.text}
                                    </p>
                                )
                            })
                        }
                    </div>

                </div>
                <div className="btns">
                    <Icon type="heart" style={{ color: '#fff' }} />
                    <Icon type="cloud-download" style={{ color: '#fff' }} />
                    <Icon type="form" style={{ color: '#fff' }} />
                    <Icon type="dash" style={{ color: '#fff' }} rotate={90} />
                </div>
                <div className="prosessControl">
                    <audio autoplay='autoplay' ref={audioRef} src={`https://music.163.com/song/media/outer/url?id=${musicInfo[0] ?.id}.mp3`}></audio>
                    <div className="process" style={{ background: '#fff', width: `${playLen}%`, zIndex: 10 }}></div>
                    <div className="process" style={{ background: '#333', width: `${bufferLen}%`, zIndex: 9 }}></div>
                    <div className="process"></div>
                    <div
                        className="dropBtn"
                        style={{ left: `${playLen}%`, zIndex: 11 }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    />
                    <span className="currentTime">{changeTime(currentTime)}</span>
                    <span className="allTime">{changeTime(allTime)}</span>
                </div>
                <footer>
                    <img src={playStatus === 0 ? xunhuanSong : playStatus === 1 ? onlySong : sortSong} style={{
                        width: '4vh',
                        height: '4vh'
                    }}
                        onClick={handleChangePlayStatus}
                    />
                    <Icon type="left" style={{ color: '#fff' }} onClick={handleLastSong} />
                    <Icon
                        onClick={() => {
                            !music.isPlay ? audioRef.current.play() : audioRef.current.pause();
                            musicinfoSet({ ...music, isPlay: !music.isPlay })
                        }}
                        type={!music.isPlay ? 'play-circle' : 'pause'}
                        style={{ color: '#fff', fontSize: '6vh' }}
                    />
                    <Icon type="right" style={{ color: '#fff' }} onClick={handleNextSong} />
                    <Icon type="bars" style={{ color: '#fff' }} onClick={() => setIsShowList(true)} />
                </footer>
            </div>
            <div className="goBack" style={{ display: orderSongs.now === -1 ? 'flex' : 'none' }}>
                <span>请先去音乐库寻找自己的歌曲~</span>
                <Icon type="left" onClick={() => { musicinfoSet({ ...music, isShow: false }); }} />
            </div>

            <CircleIcon style={{
                position: 'absolute',
                top: '46%',
                left: '46%',
                display: orderSongs.now === -1 ? 'none' : allTime > 0 ? 'none' : ''
            }} />
            <SongList
                playId={musicInfo[0] ?.id}
                songList={songList}
                isShow={isShowList}
                onClose={handleCloseList}
                onPlay={handlePlay}
                onPlayAll={handlePlayAll}
            />
        </div >
    );
}
const mapStateToProps = (state: any) => {
    const { music } = state;
    return {
        music: music.musicStatus,
        songGeci: music.playMusicGeci,
        musicInfo: music.playMusicInfo,
        songList: music.songListDetail,
        isShowList: music.isShowList,
        orderSongs: music.orderSongs
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        musicinfoSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        },
        setIsShowList: (isShow: boolean) => {
            dispatch(actions.setIsShowList(isShow));
        },
        playSongGeciGet: (id: number) => {
            // console.log(actions);
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
const ConMusic = connect(
    mapStateToProps,
    mapDispatchToProps
)(Music);

export default ConMusic;
