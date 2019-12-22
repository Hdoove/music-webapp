import React, { useMemo } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import LazyLoad from './components/LazyLoad';
import Music from './routes/MusicPlay/index';
import './App.css';

export interface AppProps {
  location: {
    pathname: string;
  };
  history: any;
  music: {
    isShow: boolean
  }
}

const App: React.FC<AppProps> = AppProps => {

  const { music } = AppProps;

  const Routers = useMemo(() => {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route
              exact
              path="/home"
              component={LazyLoad(() => import('./routes/Home/index'))}
            />
            <Route
              exact
              path="/songer/:id"
              component={LazyLoad(() => import('./routes/SongerDetail/index'))}
            />
            <Route
              exact
              path="/list/:id"
              component={LazyLoad(() => import('./routes/MusicList/index'))}
            />
            <Route
              exact
              path="/search"
              component={LazyLoad(() => import('./routes/Search/index'))}
            />
            <Route
              exact
              path="/album/:id"
              component={LazyLoad(() => import('./routes/Album/index'))}
            />
            <Route
              exact
              path="/ranking"
              component={LazyLoad(() => import('./routes/RankingList/index'))}
            />
            <Route
              exact
              path="/ranking/:id"
              component={LazyLoad(() => import('./routes/RankingList/Detail/index'))}
            />
            <Route
              exact
              path="/songerlist"
              component={LazyLoad(() => import('./routes/Songers/index'))}
            />
            <Route
              exact
              path="/songsheetlist"
              component={LazyLoad(() => import('./routes/SongSheetList/index'))}
            />
          </Switch>
        </Router>
      </div>
    )
  }, []);

  return (
    <div>
      <div className="bofangqi" style={{ visibility: music.isShow ? 'visible' : 'hidden' }}>
        <Music />
      </div>
      {Routers}
    </div>

  );
}

const mapStateToProps = (state: any) => {
  const { music } = state;
  return {
    music: music.musicStatus
  };
};
const mapDispatchToProps = () => {
  return {};
};
const connectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default hot(module)(connectApp);
