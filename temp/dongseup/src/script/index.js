import React from 'react';
import ReactDOM from 'react-dom';

import '../style/style.scss';
import App from './components/App';

const rootElement = document.getElementById('root');
console.log(rootElement);
ReactDOM.render(<App/>, rootElement);
