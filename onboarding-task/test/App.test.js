import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { app } from '../src/reducers/reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={createStore(app, applyMiddleware(logger))} ><App /></Provider>, div);
});
