import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../src/App.tsx';
import { listApp } from '../src/reducers/listApp.ts';
import thunkMiddleware from 'redux-thunk';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let store = createStore(
    listApp,
    applyMiddleware(thunkMiddleware));
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
