import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer.ts';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './sticky-footer.css';
import './index.css';
import './loader.css';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
