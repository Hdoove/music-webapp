import React, { useState } from 'react';
import './index.less';

interface IProps {
    data: any;
    isShow: false;
}

const HotSearch: React.FC<IProps> = props => {

    const { data, isShow } = props;
    return (
        <div className="hotRoot" style={{ display: isShow ? '' : 'none' }}>
            <section className="content">
                <span className="title">热搜榜</span>
                <ul className="searchList">
                    {
                        data.map((item, index) => {
                            return (
                                <li>
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