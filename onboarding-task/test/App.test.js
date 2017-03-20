import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../src/reducers/rootReducer.ts';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import App from '../src/App.jsx';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});
