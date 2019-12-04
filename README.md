### 仿网易云webApp（持续更新中）

在线访问地址 http://101.200.191.21:8081

### 配置安装

开发环境
```
Node Latest
Npm Latest
```

### Installing
使用npm安装依赖  
  
```npm install —unsafe-perm```

#### 本地服务运行在 http://localhost:8018  

```npm start 或 npm run start```  

#### 打包生产环境  

```npm run build```

## Deployment

线上服务可为静态资源服务器，将root设为 ```/dist``` 路径， 并将子路由$uri重定向至root。

## Built With

### 生产环境依赖
* [react](https://reactjs.org/docs/getting-started.html) - Web框架
* [react-router-dom](https://reacttraining.com/react-router/) - 前端路由
* [connected-react-router](https://github.com/supasate/connected-react-router) - 同步路由至redux
* [redux](https://github.com/reduxjs/redux) 状态管理框架. 
* [react-redux](https://github.com/reduxjs/react-redux) - react官方的redux封装
* [redux-actions](https://github.com/redux-utilities/redux-actions) - action 创建函数
* [redux-saga](https://github.com/redux-saga/redux-saga) - redux中间件
* [axios](https://github.com/axios/axios) 请求库
* [antd](https://ant.design/index-cn) - UI组件库

### 开发环境依赖
  * [less](http://lesscss.org/) - css预处理
  * [webpack](https://webpack.js.org/) - 打包工具
  * [babel](https://babeljs.io/docs/en) - 语法编译
  * [Eslint](https://eslint.org/docs/user-guide/configuring) - 代码检查
  * [prettier](https://github.com/prettier/prettier-vscode) - vscode比编辑器自动格式化工具

## 文件结构
```
+-- configs /全局配置
+-- public /静态资源
+-- src
| +-- actions /全局action
| +-- apis /axios请求文件
| +-- components /公用组件
| | +-- RunIcon 动态图标
| | +-- SearchShow 搜索组件
| | +-- SongList 歌曲列表组件
| +-- reducers /全局reducer
| | +-- index.js /根reducer
| +-- routes /路径文件入口
| | +-- Album 专辑
| | +-- Home 首页
| | +-- MusicList 歌单详情
| | +-- MusicPlay 播放页
| | +-- RankingList 榜单页
| | +-- Search 搜索页
| | +-- SongerDetail 歌手详情页
| | +-- Songers 歌手页
| +-- sagas /全局saga
| +-- utilities 工具
| | +-- index.js /根saga
| +-- App.js /项目入口文件
| +-- index.js /注册根saga, 根reducer等app启动配置
+-- templates /webpack ejs模版
+-- .babelrc.js /babel配置文件
+-- webpack.config.js /webpack配置文件
```

## 代码规范  

代码风格及规范请参考， 具体见 ```.eslintrc.js```
* airbnb javascript style standard (https://github.com/airbnb/javascript)

设置eslint + prettier自动格式化参考链接 
`https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a`

## Webpack配置

 1. babel-loader （所有babel js语法编译 & ie适配的配置 统一通过babel-loader 载入```.babelrc.js```
 2.style-loader/css-loader/less-loader 
 3. url-loader/svg-url-loader (inline 20kb以下图片)
 4. image-webpack-loader （无损压缩图片）
 5. html-loader/ejs-loader (html/ejs模版)
 6. file-loader(字体及其他文件类型)

## Css Module
默认开启CSS module，如需要关闭设置 module为false
```
{
  loader: 'css-loader',
  options: {
    modules: ture
  }
}
```






