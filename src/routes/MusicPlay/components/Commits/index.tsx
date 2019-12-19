import React, { useEffect, useState } from 'react';
import { Icon } from 'antd';
import { useHistory } from 'react-router-dom';
import actions, { getPlaySongCommit } from '@src/actions/music';
import './index.less';
import { connect } from 'react-redux';
import { RunIcon } from '@src/components/RunIcon/index';

interface IProps {
    music: any,
    loading: boolean;
    isShowCommit: boolean;
    onClose: () => void;
    commitsGet: (item: { id: number, offset: number }) => void;
    data: any;
    commit: {
        hot: Array<any>,
        time: Array<any>,
        offset: number,
        total: number
    }
}

const CommitsList: React.FC<IProps> = props => {
    const { loading, music, isShowCommit, onClose, data, commitsGet, commit } = props;
    const history = useHistory();

    useEffect(() => {
        if (data) {
            commitsGet({ offset: 0, id: data.id });
        }
    }, [data]);


    useEffect(() => {
    }, []);

    useEffect(() => {
        const bottom = document.querySelector('#commitListsBottom');
        bottom && observer.observe(bottom);
    }, [data, loading]);

    const observer = new IntersectionObserver(entries => {
        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                if (!loading) {
                    commitsGet({ offset: commit.offset, id: data.id });
                }
                observer.unobserve(item.target);
            }
        });
    }, {
            root: null, // 父级元素
            rootMargin: '0px 0px 0px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
        });

    return (
        <div className="commitsListRoot" style={{ display: isShowCommit ? '' : 'none' }}>
            <header className="header">
                <Icon type="left" onClick={() => { onClose() }} />
                <span style={{ fontSize: '4vw' }}>{`评论(${commit.total || 0})`}</span>
                <div style={{ display: 'flex' }} onClick={() => { onClose() }}>
                    <Icon type="align-left" rotate={-90} style={{ display: music.isPlay ? 'none' : 'block', color: '#000' }} />
                    <RunIcon style={{ display: !music.isPlay ? 'none' : 'block', background: '#000' }} />
                </div>
            </header>

            <section className="commits">
                <div className="head">
                    <img src={data ?.al ?.picUrl} alt="" />
                    <div style={{ display: 'inline-block', marginLeft: '2vw', textAlign: 'left' }}>
                        <span style={{ color: '#000000', display: 'block' }}>{data ?.name}</span>
                        <span style={{ color: '#858687', fontSize: '3vw' }}>
                            {
                                data ?.ar && data.ar.map((ars, index: number) => {
                                    return index === data.ar.length - 1 ? ars.name : `${ars.name}/`
                                })
                            }</span>
                    </div>
                </div>
                <div className="hr" />
                <div>
                    <h4>精彩评论</h4>
                    <ul>
                        {
                            commit ?.hot && commit.hot.map(item => {
                                return (
                                    <li>
                                        <div className="info">
                                            <img src={item.user.avatarUrl} alt="" />
                                            <div className="userinfo">
                                                <span>{item.user.nickname}</span>
                                                <span>{new Date(item.time).toLocaleString()}</span>
                                            </div>
                                            <span className="count">
                                                {item.likedCount}
                                                <Icon type="like" />
                                            </span>
                                        </div>
                                        <div className="content">
                                            {item.content}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div>
                    <h4>最新评论</h4>
                    <ul>
                        {
                            commit ?.time && commit.time.map(item => {
                                return (
                                    <li>
                                        <div className="info">
                                            <img src={item.user.avatarUrl} alt="" />
                                            <div className="userinfo">
                                                <span>{item.user.nickname}</span>
                                                <span>{new Date(item.time).toLocaleString()}</span>
                                            </div>
                                            <span className="count">
                                                {item.likedCount}
                                                <Icon type="like" />
                                            </span>
                                        </div>
                                        <div className="content">
                                            {item.content}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
            <div id="commitListsBottom" style={{ border: '1px solid transparent' }}></div>
            <RunIcon style={{ background: 'red', display: loading ? '' : 'none' }} />
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { music, songSheet } = state;
    return {
        music: music.musicStatus,
        loading: music.commitLoading,
        commit: music.commits
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        commitsGet: (item: { id: number, offset: number }) => {
            dispatch(getPlaySongCommit(item));
        },
    };
};
const ConCommitsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommitsList);

export default ConCommitsList;