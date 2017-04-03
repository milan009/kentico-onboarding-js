import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer.ts';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('app-root')
);
