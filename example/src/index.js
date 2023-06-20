import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import logger from 'redux-logger';
import { globalStore } from 'nuomi';

globalStore.applyMiddleware(logger);

ReactDOM.render((
  <App />
), document.querySelector('#root'));
