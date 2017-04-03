import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import todoAppReducers from './reducers/index.js';
import { todoAppReducers } from './reducers/index.js';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

let store = createStore(todoAppReducers);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
