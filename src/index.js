import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// You don't have to use `fetch` btw, use whatever you want
// const getCounters = () =>
//   fetch('/api/v1/counter', { method: 'get' })
//     .then(res => res.json());

ReactDOM.render(<App />, document.getElementById('root'));
