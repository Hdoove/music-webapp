import React, { useEffect, useState, useRef, RefObject } from 'react';
import { connect } from 'react-redux';
import actions, { getPlaySongGeci, getPlaySongInfo, getSongDetail } from '@src/actions/music';
import { Icon, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { get_geci } from '@src/apis/home';
import playIcon from '../../../public/assets/images/play.png';
import './index.less';

interface IProps {
    songList: {
        id: number
    };
    music: {
        isShow: boolean;
        isPlay: boolean;
    };
    orderSongs: {
        all: number,
        now: number
    };
    playSong: any;
    loading: boolean;
    data: any;
    title: string;
    ratio?: { ratio: number }[];
    musicStatusSet: Function,
    playSongGeciGet: (id: number) => void;
    playSongInfoGet: (id: number) => void;
    changeSongOrder: (obj: { all: number, now: number }) => void,

}
const List: React.FC<IProps> = props => {

    const { songList, music, playSongGeciGet, playSongInfoGet, musicStatusSet, playSong, loading, changeSongOrder, data, title, ratio, orderSongs } = props;
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        let head: any = document.querySelector('.fixedTop');
        let reference: any = document.querySelector('.reference');

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
        changeSongOrder({ all: data.length - 1, now: songIndex });
    }

    function handlePlayMusic(id: number, index: number) {
        if (id === playSong[0] ?.id) {
            musicStatusSet({ isPlay: true, isShow: true });
        } else {
            publicPlay(id, index, true, true);
        }
    }

    function handlePlayAll() {
        const copyData = JSON.parse(JSON.stringify(data));
        const okPlay = copyData.filter((item: { fee: number, index: number }, index: number) => {
            item['index'] = index;
            return item.fee === 8 || item.fee === 0
        });
        if (orderSongs.now === 0 && sessionStorage.getItem('listId') == location.pathname.split('/')[2]) {
            return '';
        } else {
            publicPlay(okPlay[0].id, okPlay[0].index, true, false);
            sessionStorage.setItem('listId', location.pathname.split('/')[2]);
        }
    }

    return (
        <section className={title} style={{ borderRadius: title === '' ? 'none' : '6vw 6vw 0 0' }}>
            <div className="reference"></div>
            <div className="fixedTop" >
                <div className="left">
                    <Icon type="play-circle" onClick={handlePlayAll} />
                    <span>播放全部</span>
                    <span>(共{`${data ?.length || 0}首`})</span>
                </div>
            </div>
            <ul className="songs">
                {
                    data && data.map((item: { name: string, ar: { name: string }[], al: { name: string }, fee: number, id: number }, index: number) => {
                        const canPlay = item.fee === 8 || item.fee === 0;
                        const isThis = playSong[0] ?.id === item.id;
                        return (
                            <li
                                style={{ background: !canPlay ? 'rgb(153, 153, 153, .1)' : '#fff' }}
                                onClick={() => { canPlay ? handlePlayMusic(item.id, index) : message.info('此歌曲为vip专享') }}
                            >
                                <span className="index" style={{ color: index < 3 ? 'red' : '' }}>{index + 1}</span>
                                <p className="songName" style={{ color: isThis ? 'red' : '', '-webkit-box-orient': 'vertical' }}>
                                    {item.name}
                                </p>
                                <p className="nowrap" style={{ '-webkit-box-orient': 'vertical' }}>
                                    {
                                        ratio !== undefined && ratio[index].ratio !== undefined &&
                                        <span className="ratio">
                                            <Icon type="arrow-up" />
                                            {`${ratio[index].ratio}%`}
                                        </span>
                                    }
                                    <span className="vip" style={{ display: !canPlay ? '' : 'none' }}>vip</span>
                                    <span style={{ color: isThis ? 'red' : '' }} className="songerName">
                                        {
                                            item.ar && item.ar.map((ars, index: number) => {
                                                return index === item.ar.length - 1 ? ars.name : `${ars.name}/`
                                            })
                                        }
                                    </span>
                                    <span className="line" style={{ color: isThis ? 'red' : '' }}>-</span>
                                    <span className="albumName" style={{ color: isThis ? 'red' : '' }}>{item.al ?.name}</span>
                                </p>
                                {/* <Icon type="dash" className="more" rotate={90} /> */}
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    );
}

const mapStateToProps = (state: any) => {
    const { music } = state;
    return {
        songList: music.songListDetail,
        music: music.musicStatus,
        playSong: music.playMusicInfo,
        loading: music.loading,
        orderSongs: music.orderSongs
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
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
const ConList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default ConList;

