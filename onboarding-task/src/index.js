import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as Reducers from './reducers/itemReducers';

const reducer = combineReducers({
  items: Reducers.itemsReducer,
});

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
