import React, { useEffect, useState, useRef } from 'react';
import { Icon } from 'antd';
import './index.less';

interface IProps {
    data: any;
    isShow: boolean;
    onClose: () => void;
}
const AlbumDetail: React.FC<IProps> = props => {

    const { data, isShow, onClose } = props;
    return (
        <div className="listDetailRoot" style={{ display: isShow ? '' : 'none' }}>
            <div className="bg" style={{ backgroundImage: `url(${data ?.picUrl})` }} />
            <div className="info">
                <Icon type="close" onClick={() => { onClose() }} />
                <div className="top">
                    <img className="cover" src={data ?.picUrl} alt="" />
                    <p className="title">{data ?.name}</p>
                </div>
                <div className="bottom">
                    <div className="tags">
                        <span className="tagTitle">发行公司:{data ?.company}</span>
                        <span className="tagTitle">专辑类别:{data ?.subType}</span>
                    </div>
                    <div className="text">
                        {
                            data ?.description
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}


export default AlbumDetail;

