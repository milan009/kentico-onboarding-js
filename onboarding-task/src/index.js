import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App.jsx';
import { listApp } from './reducers/listApp.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

let store = createStore(listApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
