import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import '../style/style.scss';
import App from './components/App';
import List from './components/List';
import Detail from './components/Detail';

const rootElement = document.getElementById('root');
//ReactDOM.render(<App/>, rootElement);

ReactDOM.render(<Router history = {browserHistory}>
    <Route path = "/" component = {App}>
        <IndexRoute component = {List} />
        <Route path = "detail" component = {Detail} />
    </Route> 
</Router>, document.getElementById('root'));