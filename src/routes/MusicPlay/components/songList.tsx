import React, { useEffect, useState } from 'react';
import { Icon } from 'antd';
import './index.less';

interface IProps {
    songList: any;
    isShow: boolean;
    onClose: () => void;
    playId: number;
    onPlay: (id: number, index: number) => void;
    onPlayAll: () => void;
}

const SongList: React.FC<IProps> = props => {
    const { songList, isShow, onClose, playId, onPlay, onPlayAll } = props;
    return (
        <div
            className="SongList"
            style={{ bottom: isShow ? 0 : '-70vh' }}
        >
            <header className="listHeader">
                <div className="left" onClick={() => { onPlayAll() }}>
                    <Icon type="reload" />
                    <span>{`列表循环(${songList.tracks && songList.tracks.length})`}</span>
                </div>
                <div className="right">
                    <Icon type="folder-add" />
                    <span>收藏全部</span>
                    <Icon type="delete" />
                </div>
            </header>
            <section className="content">
                <ul>
                    {
                        songList.tracks && songList.tracks.map((item: { name: string, ar: { name: string }[], id: number }, index: number) => {
                            return (
                                <li onClick={() => { onPlay(item.id, index); onClose() }}>
                                    <Icon type="sound" className="sound" style={{ color: playId === item.id ? 'red' : '', display: playId === item.id ? '' : 'none' }} />
                                    <span className="songName" style={{ color: playId === item.id ? 'red' : '' }}>{item.name}</span>
                                    <span style={{ margin: '0 0.25rem', color: playId === item.id ? 'red' : '' }}>-</span>
                                    <span className="songerName" style={{ color: playId === item.id ? 'red' : '' }}>{item.ar[0].name}</span>
                                    <Icon className="right icon" type="close" />
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <footer onClick={() => onClose()}>
                <span>关闭</span>
            </footer>
        </div >
    );
}

export default SongList;

