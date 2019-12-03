import React, { useState, useEffect } from 'react';
import './index.less';
import { get_hot_songers, get_songers_list } from '@src/apis/home';
import { useHistory } from 'react-router-dom';
import { RunIcon, CircleIcon } from '@src/components/RunIcon/index';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import actions from '@src/actions/music';

interface IProps {
    music: any;
    musicStatusSet: Function,
}
interface IArr {
    [name: string]: number | string
}
const songerType: IArr = {
    '华语': 10,
    '欧美': 20,
    '日本': 60,
    '韩国': 70,
    '其他': 40,
    '男': '01',
    '女': '02',
    '乐队/组合': '03'
}

const SongerList: React.FC<IProps> = props => {
    const [topList, setTopList] = useState([]);
    const [type, setType] = useState<number>(0);
    const [sex, setSex] = useState<string>('');
    const history = useHistory();
    const { music, musicStatusSet } = props;
    const [songers, setSongers] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        get_hot_songers(offset).then(res => {
            res.code === 200 && setSongers(res.artists);
            setOffset(15);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const bottom = document.querySelector('#playListsBottom');
        bottom && observer.observe(bottom);
    }, [songers, loading]);

    const observer = new IntersectionObserver(entries => {
        const bottom = document.querySelector('#albumsBottom');
        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                setLoading(true);
                if (loading) {
                    console.log(11);
                    // if (isSearch) {
                    //     get_songers_list(type + sex, offset).then(res => {
                    //         res.code === 200 && setSongers(songers.concat(res.artists));
                    //         setOffset(offset + 15);
                    //         setLoading(false);
                    //     });
                    // } else {
                    //     get_hot_songers(offset).then(res => {
                    //         res.code === 200 && setSongers(songers.concat(res.artists));
                    //         setOffset(offset + 15);
                    //         setLoading(false);
                    //     });
                    // }
                }
            }
        });
    }, {
            root: null, // 父级元素
            rootMargin: '0px 0px 0px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
        });

    useEffect(() => {
        setLoading(true);
        setOffset(0);
        if (type !== 0 && sex !== '') {
            !isSearch && setIsSearch(true);
            get_songers_list(type + sex, offset).then(res => {
                res.code === 200 && setSongers(res.artists);
                setOffset(15);
                setLoading(false);
            });
        }

    }, [type, sex]);

    return (
        <div className="songerrsRoot">
            <section className="playlists">
                <header>
                    <Icon type="left" onClick={() => { history.goBack() }} />
                    <span style={{ fontSize: '4vw' }}>歌手分类</span>
                    <div style={{ display: 'flex' }} onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
                        <Icon type="align-left" rotate={-90} style={{ display: music.isPlay ? 'none' : 'blick' }} />
                        <RunIcon style={{ display: !music.isPlay ? 'none' : 'blick', background: '#fff' }} />
                    </div>
                </header>
                <div className="content">
                    <div className="header">
                        {
                            Object.keys(songerType).slice(0, 5).map(item => {
                                return (
                                    <span onClick={() => {
                                        setType(songerType[item] as number);
                                        setSex(sex || '01');
                                    }} style={{ color: songerType[item] === type ? '#FC4843' : '' }}>{item}</span>
                                )
                            })
                        }
                        <br />
                        {
                            Object.keys(songerType).slice(5).map(item => {
                                return (
                                    <span onClick={() => {
                                        setSex(songerType[item] as string);
                                        setType(type || 10);
                                    }} style={{ color: songerType[item] === sex ? '#FC4843' : '' }}>{item}</span>
                                )
                            })
                        }
                    </div>
                    <div style={{ position: 'relative', top: '10vh' }}>
                        <h4>热门歌手</h4>
                        <ul>
                            {
                                songers && songers.map(songer => {
                                    return (
                                        <li key={songer.id} onClick={() => history.push(`/songer/${songer.id}`)}>
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
                            <RunIcon style={{ background: 'red', display: loading ? '' : 'none' }} />
                            <div id="playListsBottom" style={{ border: '1px solid transparent' }}></div>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { music } = state;
    return {
        music
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        musicStatusSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        }
    };
};
const ConSongerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongerList);

export default ConSongerList;