import React, { useEffect, useState, useRef } from 'react';
import { RunIcon, CircleIcon } from '@src/components/RunIcon/index';
import musicIcon from '../../../public/assets/images/music.png';
import goMusicIcon from '../../../public/assets/images/goMusic.png';
import searchIcon from '../../../public/assets/images/search.png';
import gedanIcon from '../../../public/assets/images/gedan.png';
import paihangbangIcon from '../../../public/assets/images/paihangbang.png';
import diantaiIcon from '../../../public/assets/images/diantai.png';
import playIcon from '../../../public/assets/images/play.png';
import imgLoading from '../../../public/assets/images/imgLoading.png';
import { useHistory } from 'react-router-dom';
import actions, { getBanners, getSongSheet } from '../../actions/music';
import { connect } from 'react-redux';
import { Carousel } from 'antd';
import './index.less';

interface IProps {
  musicStatusSet: Function;
  bannersSet: () => void;
  songSheetSet: () => void;
  music: {
    isShow: boolean,
    isPlay: boolean
  }
  banners: any;
  songSheet: any;
}

const swiperOptions = {
  preloadImages: false,
  autoplay: 1000,
  autoplayDisableOnInteraction: true
};
interface Ibuttons { img: string, title: string };

const buttons: Ibuttons[] = [
  {
    img: gedanIcon,
    title: '歌单'
  },
  {
    img: paihangbangIcon,
    title: '排行榜'
  },
  {
    img: diantaiIcon,
    title: '电台'
  }
];

const Home: React.FC<IProps> = props => {
  const history = useHistory();
  const { musicStatusSet, music, bannersSet, songSheetSet, banners, songSheet } = props;

  useEffect(() => {
    if (banners.length === 0 || songSheet.length === 0) {
      bannersSet();
      songSheetSet();
    }
  }, []);

  useEffect(() => {
    const imgs = document.querySelectorAll('.bgPic');
    imgs.forEach(item => {
      // 监听目标元素
      observer.observe(item);
    });
  }, [songSheet]);

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
    <div
      className="loginRoot"
    >
      <header className="header">
        <img src={musicIcon} alt="" />
        <input onClick={() => { history.push('/search') }} type="text" placeholder="请搜索" style={{ backgroundImage: `url(${searchIcon})` }} />
        <div onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
          <img style={{ display: music.isPlay ? 'none' : 'blick' }} src={goMusicIcon} alt="" />
          <RunIcon style={{ display: !music.isPlay ? 'none' : 'blick' }} />
        </div>
      </header>
      <section className="banners">
        <Carousel>
          {
            banners.map((item: { pic: string }) => {
              return (
                <img src={item.pic} />
              )
            })
          }
        </Carousel>
      </section>
      <section className="buttons">
        {
          buttons.map((item: Ibuttons) => {
            return (
              <div className="buttonItem">
                <div className="imgDiv">
                  <img src={item.img} alt={item.title} />
                </div>
                <span>{item.title}</span>
              </div>
            )
          })
        }
      </section>
      <hr />
      <section className="playlists">
        <h3>推荐歌单</h3>
        <div style={{ textAlign: 'center' }}>
          {
            songSheet.map((item: { playCount: number, picUrl: string, name: string, id: number }) => {
              return (
                <div className="playlist" onClick={() => { history.push(`/list/${item.id}`) }}>
                  <div className="playsInfo">
                    <header>
                      <img src={playIcon} />
                      <span>{Math.ceil(item.playCount / 10000)}万</span>
                    </header>
                    <img data-src={item.picUrl} src={imgLoading} className="bgPic" />
                  </div>
                  <span className="playsTitle" style={{ '-webkit-box-orient': 'vertical' }}>{item.name}</span>
                </div>
              )
            })
          }
        </div>
      </section>
    </div >
  );
}
const mapStateToProps = (state: any) => {
  const { music } = state;
  const { musicStatus, banners, songSheet } = music;
  return {
    music: musicStatus,
    banners: banners,
    songSheet: songSheet
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    musicStatusSet: (item: { isShow: boolean }) => {
      dispatch(actions.setMusicStatus(item));
    },
    bannersSet: () => {
      dispatch(getBanners());
    },
    songSheetSet: () => {
      dispatch(getSongSheet());
    }
  };
};
const conHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default conHome;
