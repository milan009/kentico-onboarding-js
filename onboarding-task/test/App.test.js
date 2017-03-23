import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.jsx';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { rootReducer } from '../src/reducers/rootReducer.js';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div);
});
