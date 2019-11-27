import React, { useState, useEffect } from 'react';
import './index.less';

interface IProps {
    data: any;
    isShow: boolean;
}

const SearechPage: React.FC<IProps> = props => {

    const { data, isShow } = props;

    return (
        <div className="compreRoot" style={{ display: isShow ? '' : 'none' }}>
            <div className="songs">
                <span className="title">单曲</span>
                <ul>
                    {
                        data.song && data.song.songs.map(song => {
                            return (
                                <li>
                                    <span className="songName">{song.name}</span>
                                    <span className="songerName">
                                        {
                                            song.ar.map((item, index) => {
                                                return index === song.ar.length - 1 ? item.name : `${item.name}/`
                                            })
                                        }
                                        -
                                        {song.al.name}
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="songers">
                <span className="title">歌手</span>
                <ul>
                    {
                        data.artist && data.artist.artists.map(songer => {
                            return (
                                <li>
                                    <img src={songer.picUrl || songer.img1v1Url} alt="" />
                                    <span>
                                        <span style={{ color: '#607685' }}>{songer.name}</span>
                                        <span style={{ color: '#818284' }}>
                                            {
                                                songer.alias.length ? `(${songer.alias[0]})` : ''
                                            }
                                        </span>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}
export default SearechPage;