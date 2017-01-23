import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import createLogger from 'redux-logger';
import appReducer from './reducers/app';
import { seedStore } from './utils/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const logger = createLogger();
const store = Redux.createStore(
  appReducer,
  seedStore(),
  Redux.applyMiddleware(logger));

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('app-root')
);
