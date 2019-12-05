import React, { useState, useEffect } from 'react';
import './index.less';
import { get_toplist } from '@src/apis/home';
import { useHistory } from 'react-router-dom';
import { RunIcon } from '@src/components/RunIcon/index';
import { Icon } from 'antd';
import imgLoading from '../../../public/assets/images/imgLoading.png';
import { connect } from 'react-redux';
import actions from '@src/actions/music';

interface IProps {
    music: any;
    musicStatusSet: Function,
}
interface IArr {
    [name: string]: number;
}
const contentId: IArr = {
    '云音乐新歌榜': 0,
    '云音乐热歌榜': 1,
    '网易原创歌曲榜': 2,
    '云音乐飙升榜': 3,
    '云音乐电音榜': 4,
    'UK排行榜周榜': 5,
    '美国Billboard周榜': 6,
    'KTV嗨榜': 7,
    'iTunes榜': 8,
    'Hit FM Top榜': 9,
    '日本Oricon周榜': 10,
    '韩国Melon排行榜周榜': 11,
    '韩国Mnet排行榜周榜': 12,
    '韩国Melon原声周榜': 13,
    '中国TOP排行榜(港台榜)': 14,
    '中国TOP排行榜(内地榜)': 15,
    '香港电台中文歌曲龙虎榜': 16,
    '华语金曲榜': 17,
    '中国嘻哈榜': 18,
    '法国 NRJ EuroHot 30周榜': 19,
    '台湾Hito排行榜': 20,
    'Beatport全球电子舞曲榜': 21,
    '云音乐ACG音乐榜': 22,
    '云音乐说唱榜': 23,
    '云音乐古典音乐榜': 24,
    // '云音乐电音榜': 25,
    '抖音排行榜': 26,
    '新声榜': 27,
    '云音乐韩语榜': 28,
    '英国Q杂志中文版周榜': 29,
    '电竞音乐榜': 30,
    '云音乐欧美热歌榜': 31,
    '云音乐欧美新歌榜': 32,
    '说唱TOP榜': 33
}

const Ranking: React.FC<IProps> = props => {
    const [topList, setTopList] = useState([]);
    const history = useHistory();
    const { music, musicStatusSet } = props;

    useEffect(() => {
        get_toplist().then(res => setTopList(res.list));
    }, []);

    useEffect(() => {
        const imgs = document.querySelectorAll('.bgPic');
        imgs.forEach(item => {
            // 监听目标元素
            observer.observe(item);
        });
    }, [topList]);

    const observer = new IntersectionObserver(entries => {
        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                // 替换目标元素Url
                item.target.src = item.target.dataset.src;
                // 取消监听此目标元素
                observer.unobserve(item.target);
            }
        });
    }, {
            root: null, // 父级元素
            rootMargin: '0px 0px 0px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
        });

    return (
        <div className="rangkingRoot">
            <section className="playlists">
                <header>
                    <Icon type="left" onClick={() => { history.goBack() }} />
                    <span style={{ fontSize: '4vw' }}>榜单</span>
                    <div style={{ display: 'flex' }} onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
                        <Icon type="align-left" rotate={-90} style={{ display: music.isPlay ? 'none' : 'block' }} />
                        <RunIcon style={{ display: !music.isPlay ? 'none' : 'block', background: '#fff' }} />
                    </div>
                </header>
                <div style={{ textAlign: 'center', marginTop: '8vh' }}>
                    {
                        topList.map((item: { playCount: number, picUrl: string, name: string, id: number }) => {
                            return (
                                <div className="playlist" onClick={() => { history.push(`/ranking/${contentId[item.name]}`) }}>
                                    <div className="playsInfo">
                                        <img data-src={item.coverImgUrl} src={imgLoading} className="bgPic" />
                                    </div>
                                    <span className="playsTitle" style={{ '-webkit-box-orient': 'vertical' }}>{item.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
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
        musicStatusSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        },
    };
};
const ConRanking = connect(
    mapStateToProps,
    mapDispatchToProps
)(Ranking);

export default ConRanking;