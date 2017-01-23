import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.jsx';
import * as Redux from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import appReducer from '../src/reducers/app';
import { seedStore } from '../src/utils/store';

it('renders without crashing', () => {
  const store = Redux.createStore(appReducer, seedStore());

  const div = document.createElement('div');
  ReactDOM.render(
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>,
    div);
});
