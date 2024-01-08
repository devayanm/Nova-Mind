// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <UserAuthContextProvider>
      <App />
    </UserAuthContextProvider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
