import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../src/App.jsx';
import { listApp } from '../src/reducers/listApp.ts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let store = createStore(listApp);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
