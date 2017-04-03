import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import manageItems from './reducers/manageItems';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);
