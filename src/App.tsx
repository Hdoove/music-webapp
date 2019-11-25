import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import LazyLoad from './components/LazyLoad';
import PrivateRoute from './components/PrivateRoute';
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
  return (
    <div>
      <div className="bofangqi" style={{ visibility: music.isShow ? 'visible' : 'hidden' }}>
        <Music />
      </div>
      <div style={{ display: !music.isShow ? '' : 'none' }}>
        <Router>
          <React.Fragment>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route
                exact
                path="/home"
                component={LazyLoad(() => import('./routes/Home/index'))}
              />
              <Route
                exact
                path="/list/:id"
                component={LazyLoad(() => import('./routes/MusicList/index'))}
              />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    </div>

  );
}

const mapStateToProps = (state: any) => {
  const { music } = state;
  return {
    music: music.musicStatus
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    // getUserinfo: () => {
    //   dispatch(userinfo());
    // }
  };
};
const connectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default hot(module)(withRouter(connectApp));
