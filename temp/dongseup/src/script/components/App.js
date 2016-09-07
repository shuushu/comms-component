import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Contact from './Contact';

class App extends React.Component {
    render(){
        return (
            <Contact/>
        );
    }
}

export default App; 