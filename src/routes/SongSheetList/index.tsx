import React, { useEffect, useState } from 'react';
import { Icon } from 'antd';
import { useHistory } from 'react-router-dom';
import actions from '@src/actions/music';
import sheetAction, { getSheetHotType, getSheetList, getSheetType } from '@src/actions/songSheet';
import './index.less';
import { connect } from 'react-redux';
import { RunIcon, CircleIcon } from '@src/components/RunIcon/index';
import SongSheet from '@src/components/SongSheet';

interface IProps {
    data: any;
    music: {
        isPlay: boolean,
        isShow: boolean
    };

    hotType: Array<any>;
    types: {
        [props: string]: string
    };
    list: {
        offset: number,
        total: number,
        data: Array<any>
    };
    loading: boolean;
    musicStatusSet: Function,
    getHotType: () => void;
    getMoreType: () => void;
    getSheetList: (obj: { offset: number, text: string }) => void;
}

const SongSheetList: React.FC<IProps> = props => {
    const { data, music, musicStatusSet, getHotType, hotType, getMoreType, types, getSheetList, list, loading } = props;
    const history = useHistory();

    const [tag, setTag] = useState<string>('华语');
    const [showMore, setShowMore] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);

    useEffect(() => {
        hotType.length === 0 && getHotType();
        list.offset === 0 && getSheetList({ text: '华语', offset: 0 });
        setTag(list.type);
    }, []);

    function handleGetSheet(name: string) {
        setIsSearch(true);
        setShowMore(false);
        setTag(name);
        getSheetList({ text: name, offset: 0 });
    }

    function handleGetMoreTag() {
        setShowMore(true);
        Object.keys(types).length === 0 && getMoreType();
    }

    useEffect(() => {
        const bottom = document.querySelector('#sheetListsBottom');
        bottom && observer.observe(bottom);
        setIsSearch(false);
    }, [list, loading]);

    const observer = new IntersectionObserver(entries => {
        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                if (!loading && list.offset !== 0) {
                    getSheetList({ text: tag, offset: list.offset });
                }
                observer.unobserve(item.target);
            }
        });
    }, {
        root: null, // 父级元素
        rootMargin: '0px 0px 0px 0px'
    });

    return (
        <div className="songSheetListRoot">
            <header className="header" style={{ display: !showMore ? '' : 'none' }}>
                <Icon type="left" onClick={() => { history.push('/'); }} />
                <span style={{ fontSize: '4vw' }}>歌单广场</span>
                <div style={{ display: 'flex' }} onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
                    <Icon type="align-left" rotate={-90} style={{ display: music.isPlay ? 'none' : 'block' }} />
                    <RunIcon style={{ display: !music.isPlay ? 'none' : 'block', background: '#000' }} />
                </div>
            </header>
            <section className="moreTags" style={{ display: showMore ? '' : 'none' }}>
                <Icon type="close" style={{ float: 'right', fontSize: '5vw', position: 'relative', top: '-4vh' }} onClick={() => setShowMore(false)} />
                <div style={{ marginTop: '8vh' }}>
                    {
                        Object.keys(types).length > 0 ? Object.keys(types).map(item => {
                            return (
                                <div style={{ margin: '1vh 0' }}>
                                    <h4>{item}</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {
                                            types[item].map(key => {
                                                return (
                                                    <span onClick={() => { handleGetSheet(key.name) }} className={`tag ${tag === key.name ? 'active' : ''}`}>
                                                        {
                                                            key.hot ? <React.Fragment>
                                                                <Icon type="fire" theme="filled" style={{ color: 'red' }} /> {key.name}
                                                            </React.Fragment> : key.name
                                                        }
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }) : <>
                                <RunIcon style={{ background: 'red' }}>
                                    <span style={{ marginLeft: 12 }}>加载中...</span>
                                </RunIcon>
                            </>
                    }
                </div>
            </section>
            <section className="tags" style={{ display: !showMore ? '' : 'none' }}>
                <h4>热门分类</h4>
                <Icon type='appstore' className="more" onClick={handleGetMoreTag} />
                <div>
                    {
                        hotType.map(item => {
                            return (
                                <span onClick={() => { handleGetSheet(item.name) }} className={`tag ${tag === item.name ? 'active' : ''}`}>{item.name}</span>
                            )
                        })
                    }
                </div>
            </section>
            <section style={{ display: !showMore ? '' : 'none' }}>
                <SongSheet data={list.data} />
                <RunIcon style={{ background: 'red', display: loading ? '' : 'none' }}>
                    <span style={{ marginLeft: 12, display: loading ? '' : 'none' }}>加载中...</span>
                </RunIcon>
                <div id="sheetListsBottom" style={{ border: '1px solid transparent', display: loading ? 'none' : '' }}></div>
            </section>
            <CircleIcon style={{
                position: 'absolute',
                top: '30vh',
                left: '46%',
                display: isSearch ? '' : 'none'
            }} />
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { music, songSheet } = state;
    return {
        music: music.musicStatus,
        hotType: songSheet.hotType,
        types: songSheet.type,
        list: songSheet.sheets,
        loading: songSheet.loading
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        musicStatusSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        },
        getHotType: () => {
            dispatch(getSheetHotType());
        },
        getMoreType: () => {
            dispatch(getSheetType());
        },
        getSheetList: (obj: { offset: number, text: string }) => {
            dispatch(getSheetList(obj));
        }
    };
};
const ConSongSheetList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongSheetList);

export default ConSongSheetList;