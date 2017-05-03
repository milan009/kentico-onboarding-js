import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.jsx';

// This test is ignored because the App element should be wrapped inside the Provider element
xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
