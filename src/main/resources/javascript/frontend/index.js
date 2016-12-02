import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import todoApp from "./reducers";
import App from "./components/app";
import {addTodo} from "./actions/index";
// サーバサイドレンダリング用
import ejs from "ejs";
import ReactDOMServer from "react-dom/server";

function isStandardBrowserEnv() {
  return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined' &&
      typeof document.createElement === 'function'
  );
}

if (isStandardBrowserEnv()) {
  let store = createStore(todoApp);

  // サーバサイドでhtml内に埋め込んだ初期データをフロントエンドレンダリング時にも使用する
  // これをやらないと、サーバサイドレンダリングした内容が無視され全て差分と認識されてしまう
  store.dispatch(addTodo(window.myapp.initialData));

  render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
  );
} else {
  // browserifyを使った場合、bundleされたjsは即時関数で包まれている
  // サーバサイドレンダリング時に参照出来ないので、globalなオブジェクトに紐付ける
  window.ejs = ejs;
  window.React = React;
  window.ReactDOMServer = ReactDOMServer;

  // その他のサーバサイドレンダリング時に使用するものもglobalなオブジェクトに紐付ける
  //
  // 使用している箇所
  // ・src/main/resources/javascript/serverside/render.js
  // ・src/main/resources/templates/index.ejs
  window.myapp = window.myapp || {};
  window.myapp.Provider = Provider;
  window.myapp.createStore = createStore;
  window.myapp.todoApp = todoApp;
  window.myapp.addTodo = addTodo;
  window.myapp.App = App;
}
