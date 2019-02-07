import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home/Home';
import Result from './Result/Result';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/result" component={Result} />
    </Switch>
</ BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
