import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Animal from './pages/Animal';

export default function Routes({ match }) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/register" exact component={Register}></Route>
                <Route path="/forgot-password" exact component={ForgotPassword}></Route>
                <Route path="/reset-password" exact component={ResetPassword}></Route>
                <Route path="/animal/:animalId" component={Animal}></Route>
            </Switch>
        </BrowserRouter>
    );
}