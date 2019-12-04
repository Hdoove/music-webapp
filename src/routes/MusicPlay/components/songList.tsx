import React from 'react';
import { Icon, message } from 'antd';
import './index.less';

interface IProps {
    songList: any;
    isShow: boolean;
    onClose: () => void;
    playId: number;
    onPlay: (id: number, index: number) => void;
    onPlayAll: () => void;
    status: number;
}

interface IArr {
    [props: number]: string
}

const statustext: IArr = {
    0: '列表循环',
    1: '单曲循环',
    2: '随机播放'
}

const SongList: React.FC<IProps> = props => {
    const { songList, isShow, onClose, playId, onPlay, onPlayAll, status } = props;
    return (
        <div
            className="SongList"
            style={{ bottom: isShow ? 0 : '-70vh' }}
        >
            {
                songList.tracks ?.length ? <>
                    <header className="listHeader">
                        <div className="left" onClick={() => { onPlayAll() }}>
                            <Icon type="reload" />
                            <span>{`${statustext[status]}(${songList.tracks && songList.tracks.length})`}</span>
                        </div>
                        {/* <div className="right">
                            <Icon type="folder-add" />
                            <span>收藏全部</span>
                            <Icon type="delete" />
                        </div> */}
                    </header>
                    <section className="content">
                        <ul>
                            {
                                songList.tracks && songList.tracks.map((item: { name: string, ar: { name: string }[], id: number }, index: number) => {
                                    const canPlay = item.fee === 1;
                                    const isThis = playId === item.id;
                                    return (
                                        <li onClick={() => { !canPlay ? onPlay(item.id, index) : message.info('此歌曲为vip专享'); onClose() }}>
                                            <p className="nowrap" style={{ '-webkit-box-orient': 'vertical' }}>
                                                <Icon type="sound" className="sound" style={{ color: isThis ? 'red' : '', display: isThis ? '' : 'none' }} />
                                                <span className="songName" style={{ color: isThis ? 'red' : '' }}>{item.name}</span>
                                                <span className="vip" style={{ display: canPlay ? '' : 'none' }}>vip</span>
                                                <span style={{ margin: '0 0.25rem', color: isThis ? 'red' : '' }}>-</span>
                                                <span className="songerName" style={{ color: isThis ? 'red' : '' }}>{item.ar[0].name}</span>
                                            </p>
                                            {/* <Icon className="right icon" type="close" /> */}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                </> : <span className="noneData">暂无列表</span>
            }
            <footer onClick={() => onClose()}>
                <span>关闭</span>
            </footer>

        </div >
    );
}

export default SongList;

