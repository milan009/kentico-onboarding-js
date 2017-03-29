import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import App from './App.tsx';
import { listApp } from './reducers/listApp.ts';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const logger = createLogger();
let store = createStore(
  listApp,
  applyMiddleware(logger, thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
