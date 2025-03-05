import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (process.env.NODE_ENV === 'production') {
  const noop = () => {};
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}
