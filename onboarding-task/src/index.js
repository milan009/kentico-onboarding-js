import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

import App from './App.jsx';
import { listApp } from './reducers/listApp.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const logger = createLogger();
let store = createStore(
  listApp,
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
