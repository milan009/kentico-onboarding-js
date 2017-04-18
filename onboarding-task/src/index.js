import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer.ts';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { getItems } from './actions/actionCreatorsItems.ts';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));
store.dispatch(getItems());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('app-root')
);
