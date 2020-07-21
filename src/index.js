import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Header from './common/header/Header';
import * as serviceWorker from './serviceWorker';
import Login from './screens/login/Login'

ReactDOM.render(
    <Login/>,document.getElementById('root')
);

serviceWorker.unregister();
