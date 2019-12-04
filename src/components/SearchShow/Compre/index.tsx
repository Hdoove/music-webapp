import React from 'react';
import { message } from 'antd';
import { IAlbum } from '../Albums/index';
import { IPlayList } from '../PlayList/index';
import { ISongers } from '../Songers/index';
import { ISongs } from '../Songs/index';
import './index.less';

interface IProps {
    data: any;
    isShow: boolean;
    getSong: (id: number) => void;
    getPlayList: (id: number) => void;
    goMore: (key: number) => void;
    getSonger: (key: number) => void;
    getAlbums: (key: number) => void;
}

const SearechPage: React.FC<IProps> = props => {

    const { data, isShow, getSong, getPlayList, goMore, getSonger, getAlbums } = props;

    return (
        <div className="compreRoot" style={{ display: isShow ? '' : 'none' }}>
            <div className="songs">
                <span className="title">单曲</span>
                <ul>
                    {
                        data ?.song ?.songs.map((song: ISongs) => {
                            const canPlay = song.fee === 1 || song.fee === 4;
                            return (
                                <li onClick={() => { canPlay ? message.info('此歌曲为vip专享') : getSong(song.id); }}>
                                    <span className="songName">{song.name}</span>
                                    <span className="songerName">
                                        <span className="vip" style={{ display: canPlay ? '' : 'none' }}>vip</span>

                                        {
                                            song.ar.map((item, index: number) => {
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
                    <span onClick={() => goMore(2)} className="moreText">{data ?.song ?.moreText}</span>
                </ul>
            </div>
            <div className="songers">
                <span className="title">歌手</span>
                <ul>
                    {
                        data && data.artist && data.artist.artists.map((songer: ISongers) => {
                            return (
                                <li onClick={() => getSonger(songer.id)}>
                                    <div className="img" style={{ backgroundImage: `url(${songer.picUrl || songer.img1v1Url})` }}></div>
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
            <div className="album">
                <span className="title">专辑</span>
                <ul>
                    {
                        data ?.album ?.albums.map((album: IAlbum) => {
                            return (
                                <li onClick={() => { getAlbums(album.id) }}>
                                    <img src={album.picUrl || album.blurPicUrl} alt="" />
                                    <div style={{ display: 'inline-block', marginLeft: '2vw' }}>
                                        <span style={{ color: '#000000', display: 'block' }}>{album.name}</span>
                                        <span style={{ color: '#607685', fontSize: '3vw' }}>
                                            {
                                                album.artist ?.name
                                            }
                                        </span>
                                        <span style={{ color: '#858687', fontSize: '2vw' }}>
                                            {
                                                new Date(album.publishTime).toLocaleDateString()
                                            }
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    }
                    <span className="moreText" onClick={() => goMore(5)}>{data ?.album ?.moreText}</span>
                </ul>
            </div>
            <div className="playList">
                <span className="title">歌单</span>
                <ul>
                    {
                        data ?.playList ?.playLists.map((playList: IPlayList) => {
                            return (
                                <li onClick={() => getPlayList(playList.id)}>
                                    <img src={playList.coverImgUrl} alt="" />
                                    <div style={{ display: 'inline-block', marginLeft: '2vw' }}>
                                        <span style={{ color: '#000000', display: 'block' }}>{playList.name}</span>
                                        <span style={{ color: '#858687', fontSize: '3vw' }}>
                                            {
                                                `
                                                    ${playList.trackCount}首 by ${playList.creator.nickname} 播放 ${Math.ceil(playList.playCount / 10000)} 万次
                                                `
                                            }
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    }
                    <span className="moreText" onClick={() => goMore(3)}>{data ?.playList ?.moreText}</span>
                </ul>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}
export default SearechPage;