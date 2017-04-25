import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { app } from '../src/reducers/reducers';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

const store = createStore(app, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
