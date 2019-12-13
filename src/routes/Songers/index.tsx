import React, { useState, useEffect } from 'react';
import './index.less';
import { useHistory, withRouter } from 'react-router-dom';
import { RunIcon } from '@src/components/RunIcon/index';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import actions, { getSongers, getTopSongers } from '@src/actions/music';
import { ISongers } from '@src/components/SearchShow/Songers/index';
import imgLoading from '../../../public/assets/images/imgLoading.png';
import Header from '@src/components/Header/index';

interface IProps {
    music: any;
    musicStatusSet: Function;
    songers: any;
    loading: boolean;
    songerGet: (num: number) => void;
    topSongerGet: (obj: { type: string, offset: number }) => void;
    clearSonger: () => void;
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
    const [type, setType] = useState<number>(0);
    const [sex, setSex] = useState<string>('');
    const history = useHistory();
    const { music, musicStatusSet, songerGet, songers, loading, topSongerGet, clearSonger } = props;
    const [isSearch, setIsSearch] = useState<boolean>(false);

    useEffect(() => {
        songerGet(songers.offset);
        sessionStorage.removeItem('type');
        sessionStorage.removeItem('isSearch');
    }, []);

    useEffect(() => {
        const imgs = document.querySelectorAll('.bgPic');
        imgs.forEach(item => {
            // 监听目标元素
            observer1.observe(item);
        });
    }, [songers]);

    const observer1 = new IntersectionObserver(entries => {
        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                // 替换目标元素Url
                item.target.src = item.target.dataset.src;
                // 取消监听此目标元素
                observer.unobserve(item.target);
            }
        });
    }, {
            root: null, // 父级元素
            rootMargin: '0px 0px 0px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
        });

    useEffect(() => {
        const bottom = document.querySelector('#playListsBottom');
        bottom && observer.observe(bottom);
    }, [songers, loading]);

    const observer = new IntersectionObserver(entries => {
        // 发生交叉目标元素集合
        entries.forEach((item: any) => {
            // 判断是否发生交叉
            if (item.isIntersecting) {
                if (!loading) {
                    if (sessionStorage.getItem('isSearch')) {
                        topSongerGet({ type: sessionStorage.getItem('type') as string, offset: songers.offset });
                    } else {
                        songerGet(songers.offset);
                    }
                }
            }
        });
    }, {
            root: null, // 父级元素
            rootMargin: '0px 0px 0px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
        });

    useEffect(() => {
        if (type !== 0 && sex !== '') {
            !isSearch && setIsSearch(true);
            sessionStorage.setItem('type', type + sex);
            sessionStorage.setItem('isSearch', true);
            topSongerGet({ type: type + sex, offset: 0 });
        }

    }, [type, sex]);

    return (
        <div className="songerrsRoot">
            <section className="playlists">
                <Header title="歌手分类" isPlay={music.isPlay} goBack={() => { console.log(1); musicStatusSet({ ...music, isShow: false }), clearSonger() }} goMusic={() => { musicStatusSet({ ...music, isShow: true }) }} />
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
                    <div style={{ position: 'relative', top: '10vh', height: '82vh', overflow: 'auto' }} >
                        <h4>热门歌手</h4>
                        <ul>
                            {
                                songers && songers.data.map((songer: ISongers) => {
                                    return (
                                        <li key={songer.id} onClick={() => history.push(`/songer/${songer.id}`)}>
                                            <img alt="" data-src={songer.picUrl || songer.img1v1Url} src={imgLoading} className="bgPic" />
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
                        <RunIcon style={{ background: 'red', display: loading ? '' : 'none' }} />
                        <div id="playListsBottom" style={{ border: '1px solid transparent' }}></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { music } = state;
    return {
        music: music.musicStatus,
        songers: music.songers,
        loading: music.loading
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        musicStatusSet: (item: { isShow: boolean }) => {
            dispatch(actions.setMusicStatus(item));
        },
        songerGet: (num: number) => {
            dispatch(getSongers(num));
        },
        topSongerGet: (obj: { type: string, offset: number }) => {
            dispatch(getTopSongers(obj));
        },
        clearSonger: () => {
            dispatch(actions.setSongers({ offset: 0, data: [] }));
        }
    };
};
const ConSongerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongerList);

export default ConSongerList;