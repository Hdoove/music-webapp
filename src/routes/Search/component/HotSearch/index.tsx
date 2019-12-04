import React, { useState } from 'react';
import './index.less';

interface IProps {
    data: IItem[];
    isShow: boolean;
    onChoose: (str: string) => void;
}
export interface IItem {
    searchWord: string,
    iconUrl: string,
    content: string,
    score: number
}

const HotSearch: React.FC<IProps> = props => {

    const { data, isShow, onChoose } = props;
    return (
        <div className="hotRoot" style={{ display: isShow ? '' : 'none' }}>
            <section className="content">
                <span className="title">热搜榜</span>
                <ul className="searchList">
                    {
                        data.map((item: IItem, index: number) => {
                            return (
                                <li onClick={() => { onChoose(item.searchWord) }}>
                                    <span style={{ color: index < 3 ? '#D74C44' : '#B0B0B2' }} className="index">{index + 1}</span>
                                    <div>
                                        <span className="searchword" style={{ fontWeight: index < 3 ? 'bold' : 'normal' }}>{item.searchWord}<img src={item.iconUrl} alt="" /></span>
                                        <p className="content" style={{ '-webkit-box-orient': 'vertical' }}>{item.content}</p>
                                    </div>
                                    <span className="score">{item.score}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </div>
    )
}
export default HotSearch;