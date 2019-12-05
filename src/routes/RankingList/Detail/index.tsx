import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RunIcon, CircleIcon } from '@src/components/RunIcon/index';
import actions, { getToplistDetail } from '@src/actions/music';
import { Icon } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import List from '@src/components/SongList/index';
import './index.less';

interface IProps {
    songList: any;
    music: any;
    musicStatusSet: Function,
    loading: boolean;
    toplistDetailGet: (id: number) => void;
}
const Toplist: React.FC<IProps> = props => {

    const { songList, music, musicStatusSet, loading, toplistDetailGet } = props;
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const id = location.pathname.split('/')[2];
        if (id && id != songList.id) {
            toplistDetailGet(Number(id));
        }
    }, []);

    return (
        <div
            className="topListDetailRoot"
        >
            <div>
                <div className="bgImg" style={{
                    backgroundImage: `url(${songList.tracks && songList ?.tracks[0] ?.al ?.picUrl})`,
                    display: loading ? 'none' : ''
                }} />
                <div className="body" style={{
                    display: loading ? 'none' : ''
                }}>
                    <header>
                        <Icon type="left" onClick={() => { history.goBack() }} />
                        <span style={{ fontSize: '4vw' }}>榜单详情</span>
                        <div style={{ display: 'flex' }} onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
                            <Icon type="align-left" rotate={-90} style={{ display: music.isPlay ? 'none' : 'blick' }} />
                            <RunIcon style={{ display: !music.isPlay ? 'none' : 'blick', background: '#fff' }} />
                        </div>
                    </header>
                    <section className="content">
                        <section className="listDetail">
                            <div className="left" style={{ backgroundImage: `url(${songList.coverImgUrl})` }} />
                            <div className="right">
                                <span style={{ color: '#fff' }}>最近更新：{new Date(songList.createTime).toLocaleDateString()}</span>
                                <div className="description">
                                    <p style={{ '-webkit-box-orient': 'vertical' }}>
                                        {songList.description || '暂无简介'}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <List data={songList.tracks} title="listRoot" ratio={songList.trackIds} />
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
        toplistDetailGet: (id: number) => {
            dispatch(getToplistDetail(id));
        }
    };
};
const ConToplist = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toplist);

export default ConToplist;

