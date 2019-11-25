import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Icon } from 'antd';
const { Search } = Input;
import './index.less';

interface IProps {

}

const SearechPage: React.FC<IProps> = props => {

    function fangdou(fun: Function, delay: number) {
        let timeout: any = null;
        return function () {
            if (timeout != null) {
                console.log(12);
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                fun();
            }, delay * 500);
        }()
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        fangdou(function () {
            console.log(11);
        }, 2)
    }

    const history = useHistory();
    return (
        <div className="searchRoot">
            <Input
                placeholder="请搜索"
                onChange={handleSearch}
                style={{ width: '60vw' }}
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <span onClick={() => { history.push('/home') }}>取消</span>
        </div>
    )
}
export default SearechPage;