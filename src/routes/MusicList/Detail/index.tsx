import React from 'react';
import { Icon } from 'antd';
import './index.less';

interface IProps {
    data: {
        coverImgUrl: string,
        name: string,
        tags: Array<string>,
        description: string
    };
    isShow: boolean;
    onClose: () => void;
}
const ListDetail: React.FC<IProps> = props => {

    const { data, isShow, onClose } = props;

    return (
        <div className="listDetailRoot" style={{ display: isShow ? '' : 'none' }}>
            <div className="bg" style={{ backgroundImage: `url(${data.coverImgUrl})` }} />
            <div className="info">
                <Icon type="close" onClick={() => { onClose() }} />
                <div className="top">
                    <img className="cover" src={data.coverImgUrl} alt="" />
                    <p className="title">{data.name}</p>
                </div>
                <div className="bottom">
                    <div className="tags">
                        <span className="tagTitle">标签:</span>
                        {
                            data.tags.length > 0 ? data.tags.map((item: string) => {
                                return (
                                    <span className="tag">{item}</span>
                                )
                            }) : <span className="tagTitle">暂无</span>
                        }
                    </div>
                    <div className="text">
                        {
                            data.description
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}


export default ListDetail;

