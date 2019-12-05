import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import playIcon from '../../../public/assets/images/play.png';
import imgLoading from '../../../public/assets/images/imgLoading.png';
import './index.less';

interface IProps {
    data: any;
}

const SongSheet: React.FC<IProps> = props => {

    const history = useHistory();
    const { data } = props;

    useEffect(() => {
        const imgs = document.querySelectorAll('.bgPic');
        imgs.forEach(item => {
            // 监听目标元素
            observer.observe(item);
        });
    }, [data]);

    const observer = new IntersectionObserver(entries => {
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

    return (
        <div className="songSheetRoot">
            <div style={{ textAlign: 'center' }}>
                {
                    data.map((item: { playCount: number, picUrl: string, name: string, id: number, coverImgUrl?: string }) => {
                        return (
                            <div className="playlist" onClick={() => { history.push(`/list/${item.id}`) }}>
                                <div className="playsInfo">
                                    <header>
                                        <img src={playIcon} />
                                        <span>{Math.ceil(item.playCount / 10000)}万</span>
                                    </header>
                                    <img data-src={item.picUrl || item.coverImgUrl} src={imgLoading} className="bgPic" />
                                </div>
                                <span className="playsTitle" style={{ '-webkit-box-orient': 'vertical' }}>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SongSheet;