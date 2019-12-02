import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';
import configureStore, { history, sagaMiddleware } from './utilities/appStore';
import './index.less';
import rootSaga from './sagas';
import 'typeface-roboto';
import 'moment/locale/zh-cn';
import App from './App';
import 'antd/dist/antd.css';

const store = configureStore();
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);