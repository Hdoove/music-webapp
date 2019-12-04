import React from 'react';
import './index.less';

export interface IProps {
    data: any;
    getAlbums: (id: number) => void;
}

export interface IAlbum {
    id: number,
    picUrl: string,
    blurPicUrl: string,
    name: string,
    artist: {
        name: string
    },
    publishTime: number,
    size: number
}

const Albums: React.FC<IProps> = props => {

    const { data, getAlbums } = props;
    console.log(data);

    return (
        <div className="albumsRoot">
            <ul style={{ padding: '0 6vw' }}>
                {
                    data && data.map((album: IAlbum) => {
                        return (
                            <li onClick={() => { getAlbums(album.id) }} key={album.id}>
                                <img src={album ?.picUrl || album ?.blurPicUrl} alt="" />
                                <div style={{ display: 'inline-block', marginLeft: '2vw' }}>
                                    <span style={{ color: '#000000', display: 'block' }}>{album ?.name}</span>
                                    <span style={{ color: '#607685', fontSize: '3vw' }}>
                                        {
                                            album ?.artist ?.name
                                            }
                                    </span>
                                    <span style={{ color: '#858687', fontSize: '2vw' }}>
                                        {
                                            new Date(album ?.publishTime).toLocaleDateString()
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

export default Albums;