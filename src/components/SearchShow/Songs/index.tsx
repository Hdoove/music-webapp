import React, { useEffect } from 'react';
import { message } from 'antd';
import './index.less';

export interface IProps {
    data: any;
    getSong: (id: number) => void;
}

const Songs: React.FC<IProps> = props => {

    const { data, getSong } = props;

    return (
        <div className="songsRoot">
            <ul>
                {
                    data && data.map(song => {
                        const canPlay = song.fee === 1;
                        return (
                            <li onClick={() => { canPlay ? message.info('此歌曲为vip专享') : getSong(song.id); }}>
                                <span className="songName">{song.name}</span>
                                <span className="songerName">
                                    <span className="vip" style={{ display: canPlay ? '' : 'none' }}>vip</span>
                                    {
                                        song.artists.map((item, index) => {
                                            return index === song.artists.length - 1 ? item.name : `${item.name}/`
                                        })
                                    }
                                    -
                                        {song.artists.name}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Songs;