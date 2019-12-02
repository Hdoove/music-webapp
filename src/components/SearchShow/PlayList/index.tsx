import React, { useEffect } from 'react';
import { message } from 'antd';
import './index.less';

export interface IProps {
    data: any;
    getPlayList: (id: number) => void;
}

const PlayLists: React.FC<IProps> = props => {

    const { data, getPlayList } = props;

    return (
        <div className="playListsRoot">
            <ul>
                {
                    data && data.map(playList => {
                        return (
                            <li onClick={ () => getPlayList(playList.id) }>
                                <img src={playList.coverImgUrl} alt="" />
                                <div style={{ display: 'inline-block', marginLeft: '2vw' }}>
                                    <span style={{ color: '#000000', display: 'block' }}>{playList.name}</span>
                                    <span style={{ color: '#858687', fontSize: '3vw' }}>
                                        {
                                            `
                                                    ${playList.trackCount}首 by ${playList.creator.nickname} 播放 ${Math.floor(playList.playCount / 10000)} 万次
                                                `
                                        }
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default PlayLists;