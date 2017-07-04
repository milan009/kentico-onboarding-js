import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, /* combineReducers,*/ applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as Reducers from './reducers';

/* const reducer = combineReducers({
  changeItemReducer: Reducers.changeItemReducer,
  addItemReducer: Reducers.createItemReducer,
  deleteItemReducer: Reducers.deleteItemReducer,
}); */

const reducer = (state, action) => {
  let resState = Reducers.changeItemReducer(state, action);
  resState = Reducers.deleteItemReducer(resState, action);
  resState = Reducers.createItemReducer(resState, action);
  return resState;
};

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
