import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Animal from './pages/Animal';
import Weapon from './pages/Weapon';
import Equipament from './pages/Equipament';
import Search from './pages/Search';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/register" exact component={Register}></Route>
                <Route path="/forgot-password" exact component={ForgotPassword}></Route>
                <Route path="/reset-password" exact component={ResetPassword}></Route>
                <Route path="/weapon" exact component={Weapon}></Route>
                <Route path="/animal/:animalId" component={Animal}></Route>
                <Route path="/equipament" exact component={Equipament}></Route>
                <Route path="/search" exact component={Search}></Route>
            </Switch>
        </BrowserRouter>
    );
}