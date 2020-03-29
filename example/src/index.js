import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'nuomi';

ReactDOM.render((
  <Router type="browser">
    <App />
  </Router>
), document.querySelector('#root'));
