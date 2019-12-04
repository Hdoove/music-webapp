import React from 'react';
import './index.less';

interface IProps {
    data: any;
    getSonger: (id: number) => void;
}

export interface ISongers {
    id: number,
    picUrl: string,
    img1v1Url: string,
    name: string,
    alias: Array<any>
}

const SongerList: React.FC<IProps> = props => {

    const { data, getSonger } = props;

    return (
        <div className="songers" style={{ padding: '0 6vw' }}>
            <ul>
                {
                    data && data.map((songer: ISongers) => {
                        return (
                            <li onClick={() => { getSonger(songer.id) }}>
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
    )
}

export default SongerList;