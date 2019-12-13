import React, { useEffect } from 'react';
import { Icon } from 'antd';
import './index.less';

interface IProps {
    isShow: boolean;
    data: any;
    search: (str: string) => void;
}

const Suggest: React.FC<IProps> = props => {

    const { isShow, data, search } = props;
    return (
        <div className="searchSuggest" style={{ display: isShow ? '' : 'none' }} >
            <ul>
                {
                    data && data.length > 0 ? data.map(item => {
                        return <li onClick={() => { search(item.keyword) }}> <Icon type="search" /> {item.keyword} </li>
                    }) : ''
                }
            </ul>
        </div>
    )
}

export default Suggest;