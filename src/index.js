import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { CompatRouter } from 'react-router-dom-]v5-compat';
import './assets/main.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    {/* <CompatRouter> */}
    <App />
    {/* </CompatRouter> */}
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
