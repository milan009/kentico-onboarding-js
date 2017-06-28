import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as Reducers from './reducers';

const reducer = combineReducers({
  changeItemReducer: Reducers.changeItemReducer,
  addItemReducer: Reducers.addItemReducer,
  deleteItemReducer: Reducers.deleteItemReducer,
});

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);
