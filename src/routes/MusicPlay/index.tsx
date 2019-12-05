import React, { useEffect, useState, useRef } from 'react';
import { changeTime } from '@src/utilities/changeTime';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircleIcon } from '@src/components/RunIcon/index';
import changpianIcon from '../../../public/assets/images/changpian.jpg';
import actions, { getPlaySongGeci, getPlaySongInfo } from '../../actions/music';
import { Icon, message } from 'antd';
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
    clearMusicInfo: () => void;
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

interface IGeci {
    time: number,
    text: string
}[];
const Music: React.FC<IProps> = props => {
    const [playLen, setPlayLen] = useState<number>(0);// 播放进度条
    const [bufferLen, setBufferLen] = useState<number>(0); // 缓存时长    
    const [currentTime, setCurrentTiem] = useState<number>(0); // 歌曲总时长歌曲播放时长
    const [allTime, setAllTime] = useState<number>(0); // 歌曲总时长
    const [playStatus, setPlayStatus] = useState<number>(0);// 0顺序播放  1 单独播放 2 随机播放
    const [selectGeciNum, setSelectGeciNum] = useState<number>(-1);
    const [geci, setGeci] = useState<(IGeci)[]>([]);
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
        changeSongOrder,
        clearMusicInfo
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
            const timeBuffered = timeRanges.length > 0 && timeRanges.end(timeRanges.length - 1);
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

    function changeTimeToSplit(time: string): number {
        if (time) {
            const [minute, secont] = time.slice(1).split(':');
            return Number(minute) * 60 + parseFloat(secont);
        }
        return 0;
    }

    useEffect(() => {
        const gecisplit = songGeci.lyric ?.split('\n');
        if (gecisplit) {
            let newArr: any = [];
            for (let i = 0; i < gecisplit.length; i++) {
                let list = gecisplit[i].split(']');
                if (list.length > 2) {
                    for (let j = 0, len = list.length - 1; j < len; j++) {
                        if (list[list.length - 1] !== '' && list[list.length - 1] !== undefined) {
                            newArr.push({
                                time: changeTimeToSplit(list[j].replace('[', '')),
                                text: list[list.length - 1]
                            })
                        }
                    }
                } else {
                    if (list[1] !== '' && list[1] !== undefined) {
                        newArr.push({
                            time: changeTimeToSplit(list[0].replace('[', '')),
                            text: list[1]
                        });
                    }
                }
            }
            newArr.sort((a, b) => a.time - b.time);
            setGeci(newArr);
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
        musicinfoSet({ ...music, isPlay: true });
        clearMusicInfo();
        changeSongOrder({ ...orderSongs, now: songIndex });
        playSongGeciGet(songId);
        playSongInfoGet(songId);
    }

    function handleLastSong() {
        let lastNum: number = 0;
        if (playStatus === 0) {
            lastNum = orderSongs.now > 0 ? orderSongs.now - 1 : orderSongs.all
        } else if (playStatus === 1) {
            lastNum = orderSongs.now;
        } else if (playStatus === 2) {
            lastNum = Math.round(Math.random() * orderSongs.all);
        }
        vip(lastNum);
        function vip(num: number) {
            if (songList.tracks[lastNum].fee !== 8 && songList.tracks[lastNum].fee !== 0) {
                lastNum = lastNum === 0 ? orderSongs.all - 1 : lastNum - 1;
                vip(lastNum);
            }
        }
        publicChangeSong(songList.tracks[lastNum].id, lastNum);
    }

    function handleNextSong() {
        let nextNum: number = 0;
        if (playStatus === 0) {
            nextNum = orderSongs.all > orderSongs.now ? orderSongs.now + 1 : 0;
        } else if (playStatus === 1) {
            nextNum = orderSongs.now - 1;
        } else if (playStatus === 2) {
            nextNum = Math.round(Math.random() * orderSongs.all);
        }
        vip(nextNum);
        function vip(num: number) {
            const choose = songList.tracks[nextNum];
            if (choose ?.fee !== 8 && choose ?.fee !== 0) {
                nextNum = nextNum === orderSongs.all - 1 ? 0 : nextNum + 1;
                vip(nextNum);
            }
        }
        publicChangeSong(songList.tracks[nextNum].id, nextNum);
    }

    function handlePlay(id: number, index: number) {
        publicChangeSong(id, index);
        if (!music.isPlay) {
            musicinfoSet({ ...music, isPlay: true });
        }
    }

    function handlePlayAll() {
        publicChangeSong(songList.tracks[0].id, 0);
        if (!music.isPlay) {
            musicinfoSet({ ...music, isPlay: true });
        }
    }

    function handleNoSupport() {
        alert('开发中..敬请期待');
    }

    const moveTip = (selectGeciNum + 1) > center ? selectGeciNum - center + 1 : 0;

    useEffect(() => {
        for (let i = 0, len = geci.length; i < len; i++) {
            if (geci[i] && geci[i].time <= currentTime && geci[i + 1] && geci[i + 1].time > currentTime) {
                i !== selectGeciNum ? setSelectGeciNum(i) : '';
            }
            if (currentTime > geci[geci.length - 1].time) {
                i !== geci.length - 1 ? setSelectGeciNum(geci.length - 1) : '';
            }
        }
    }, [currentTime]);

    function handleGoSonger(id: number) {
        // history.push(`/songer/${id}`);
        // musicinfoSet({ ...music, isShow: false });
    }

    return (
        <div
            className="musicRoot"
        >
            <div className="bg" style={{ backgroundImage: `url(${musicInfo[0] ?.al ?.picUrl})` }} />
            <div className="body" >
                <header className="musicPlayHead">
                    <Icon
                        type="left"
                        className="icon"
                        onClick={() => { musicinfoSet({ ...music, isShow: false }); setIsShowList(false); }}
                    />
                    <div>
                        <span>{musicInfo[0] ?.name}</span>
                        {/* <span onClick={() => { handleGoSonger(musicInfo[0] ?.ar[0] ?.id); }}>{musicInfo[0] ?.ar[0] ?.name} > </span> */}
                        <span>
                            {
                                musicInfo[0] ?.ar && musicInfo[0] ?.ar.map((ars, index: number) => {
                                    return index === musicInfo[0].ar.length - 1 ? ars.name : `${ars.name}/`
                                })
                            }
                        </span>
                    </div>
                    <Icon type="share-alt" className="icon" onClick={handleNoSupport} />
                </header>
                <div className="content">
                    <div style={{ display: isShowGeci ? 'none' : '' }}>
                        <img className="changpian" src={changpianIcon} alt="" style={{ transform: `translate(42%) rotate(${music.isPlay ? 30 : 0}deg)` }} />
                        <div className='cricle' onClick={() => { setIsShowGeci(!isShowGeci) }}>
                            <img className="animation" src={musicInfo[0] ?.al ?.picUrl} style={{ animationPlayState: music.isPlay ? 'running' : 'paused' }} />
                        </div>
                    </div>
                    <div style={{ display: !isShowGeci ? 'none' : '' }} onClick={() => { setIsShowGeci(!isShowGeci) }}>
                        {
                            geci && geci.map((item: { text: string }, index: number) => {
                                return (
                                    <p
                                        className={`nomal ${index === selectGeciNum ? 'active' : ''}`}
                                        style={{
                                            top: `${index * 2.8 - (moveTip) * 2.8}rem`
                                        }}
                                    >
                                        {item ?.text}
                                    </p>
                                )
                            })
                        }
                    </div>

                </div>
                <div className="btns">
                    <Icon onClick={handleNoSupport} type="heart" style={{ color: '#fff' }} />
                    <Icon onClick={handleNoSupport} type="cloud-download" style={{ color: '#fff' }} />
                    <Icon onClick={handleNoSupport} type="form" style={{ color: '#fff' }} />
                    <Icon onClick={handleNoSupport} type="dash" style={{ color: '#fff' }} rotate={90} />
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
                        type={allTime > 0 ? music.isPlay ? 'pause' : 'play-circle' : 'play-circle'}
                        style={{ color: '#fff', fontSize: '6vh' }}
                    />
                    <Icon type="right" style={{ color: '#fff' }} onClick={handleNextSong} />
                    <Icon type="bars" style={{ color: '#fff' }} onClick={() => setIsShowList(true)} />
                </footer>
            </div>
            <div className="goBack" style={{ display: orderSongs.now === -1 ? 'flex' : 'none' }}>
                <span>先去挑一首自己喜欢的歌吧~</span>
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
                status={playStatus}
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
            dispatch(getPlaySongGeci(id));
        },
        playSongInfoGet: (id: number) => {
            dispatch(getPlaySongInfo(id));
        },
        changeSongOrder: (obj: { all: number, now: number }) => {
            dispatch(actions.setAllAndThisSong(obj));
        },
        clearMusicInfo: () => {
            dispatch(actions.setPlayMusicInfo({}));
        }
    };
};
const ConMusic = connect(
    mapStateToProps,
    mapDispatchToProps
)(Music);

export default ConMusic;
