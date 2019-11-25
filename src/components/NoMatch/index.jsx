import React, { Component } from 'react';
import notMatchImg from './404.png';
import './index.less';

export default class NoMatch extends Component {
  render() {
    return (
      <div id="noMatch">
        <img src={notMatchImg} />
        <p>哎呀!页面不见了。。</p>
      </div>
    );
  }
}
