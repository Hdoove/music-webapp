import React, { useEffect } from 'react';
import { RunIcon } from '@src/components/RunIcon/index';
import musicIcon from '../../../public/assets/images/music.png';
import goMusicIcon from '../../../public/assets/images/goMusic.png';
import searchIcon from '../../../public/assets/images/search.png';
import { useHistory } from 'react-router-dom';
import actions, { getBanners, getSongSheet, getPlaySongGeci, getPlaySongInfo } from '@src/actions/music';
import { getSearchDefault } from '@src/actions/search';
import { connect } from 'react-redux';
import { Carousel, Icon } from 'antd';
import SongSheet from '@src/components/SongSheet';
import './index.less';

interface IProps {
  musicStatusSet: Function;
  bannersSet: () => void;
  songSheetSet: () => void;
  music: {
    isShow: boolean,
    isPlay: boolean
  };
  banners: any;
  songSheet: any;
  searchDefault: {
    realkeyword: string,
    showKeyword: string
  };
  getDefault: () => void;
  playSongGeciGet: (id: number) => void;
  playSongInfoGet: (id: number) => void;
  changeSongOrder: (obj: { all: number, now: number }) => void;
}

interface Ibuttons { img: string, title: string, path: string };

const buttons: Ibuttons[] = [
  {
    img: 'appstore',
    title: '歌单',
    path: '/songsheetlist'
  },
  {
    img: 'rise',
    title: '排行榜',
    path: '/ranking'
  },
  {
    img: 'user',
    title: '歌手',
    path: '/songerlist'
  }
];

const Home: React.FC<IProps> = props => {
  const history = useHistory();
  const {
    musicStatusSet,
    music,
    bannersSet,
    songSheetSet,
    banners,
    songSheet,
    playSongGeciGet,
    playSongInfoGet,
    changeSongOrder,
    getDefault,
    searchDefault
  } = props;

  useEffect(() => {
    if (banners.length === 0 || songSheet.length === 0) {
      bannersSet();
      songSheetSet();
    }
    getDefault();
  }, []);

  function handleGoMisic(item: any) {
    if (item.song) {
      const id = item.song.id;
      playSongGeciGet(id);
      playSongInfoGet(id);
      musicStatusSet({ isPlay: true, isShow: true });
      changeSongOrder({ all: 1, now: 0 });
    }
  }

  return (
    <div
      className="loginRoot"
    >
      <header className="header">
        <img src={musicIcon} alt="" />
        <input onClick={() => { history.push('/search') }} type="text" placeholder={searchDefault.showKeyword} style={{ backgroundImage: `url(${searchIcon})` }} />
        <div onClick={() => { musicStatusSet({ ...music, isShow: true }) }}>
          <img style={{ display: music.isPlay ? 'none' : 'block' }} src={goMusicIcon} alt="" />
          <RunIcon style={{ display: !music.isPlay ? 'none' : 'block' }} />
        </div>
      </header>
      <section className="banners">
        <Carousel>
          {
            banners.map((item: { pic: string }) => {
              return (
                <img src={item.pic} onClick={() => { handleGoMisic(item) }} />
              )
            })
          }
        </Carousel>
      </section>
      <section className="buttons">
        {
          buttons.map((item: Ibuttons) => {
            return (
              <div className="buttonItem" onClick={() => history.push(item.path)}>
                <div className="imgDiv">
                  <Icon type={item.img} />
                </div>
                <span>{item.title}</span>
              </div>
            )
          })
        }
      </section>
      <hr />
      <section className="playlists">
        <h3 style={{ fontSize: '4vw', marginTop: '2vh' }}>推荐歌单</h3>
        <SongSheet data={songSheet} />
      </section>
    </div >
  );
}
const mapStateToProps = (state: any) => {
  const { music, search } = state;
  const { musicStatus, banners, songSheet } = music;

  return {
    music: musicStatus,
    banners: banners,
    songSheet: songSheet,
    searchDefault: search.default
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
    },
    playSongGeciGet: (id: number) => {
      dispatch(getPlaySongGeci(id));
    },
    playSongInfoGet: (id: number) => {
      dispatch(getPlaySongInfo(id));
    },
    changeSongOrder: (obj: { all: number, now: number }) => {
      dispatch(actions.setAllAndThisSong(obj));
    },
    getDefault: () => {
      dispatch(getSearchDefault());
    }
  };
};
const conHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default conHome;
