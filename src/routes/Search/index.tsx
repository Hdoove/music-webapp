import React, { ChangeEvent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Icon, Tabs } from 'antd';
const { Search } = Input;
const { TabPane } = Tabs;
import { get_hot_search, get_search_detail } from '@src/apis/home';
import HostSeatch from './component/HotSearch/index';
import CompreComp from '@src/components/SearchShow/Compre/index';
import { RunIcon } from '@src/components/RunIcon/index'
import './index.less';

interface IProps {

}

const SearechPage: React.FC<IProps> = props => {

    const [searchList, setSearchList] = useState([]);
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        get_hot_search().then(res => setSearchList(res.data));
    }, []);

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function handleSearchKeyWord() {
        setLoading(true);
        get_search_detail(value, 1018, 0, 0).then(res => { setAllData(res.result); setLoading(false) });
    }

    const history = useHistory();
    return (
        <div className="searchRoot">
            <section className="head">
                <Input
                    placeholder="请搜索"
                    onChange={handleSearch}
                    className="searchInput"
                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
                <span onClick={handleSearchKeyWord}>搜索</span>
                <span onClick={() => { history.push('/home') }}>取消</span>
            </section>
            <RunIcon style={{ display: loading ? '' : 'none', background: 'red' }} top={12} />
            <Tabs defaultActiveKey="1" style={{ display: value !== '' && allData.song ? '' : 'none' }}>
                <TabPane tab="综合" key="1">
                    <CompreComp data={allData} isShow={!loading} />
                </TabPane>
                <TabPane tab="单曲" key="2">
                    单曲
                </TabPane>
                <TabPane tab="歌单" key="3">
                    歌单
                </TabPane>
                <TabPane tab="歌手" key="4">
                    歌手
                </TabPane>
                <TabPane tab="专辑" key="5">
                    专辑
                </TabPane>
            </Tabs>
            <HostSeatch data={searchList} isShow={allData.song === undefined} />
        </div>
    )
}
export default SearechPage;