import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Animal from './pages/Animal';
import Weapon from './pages/Weapon';

export default function Routes({ match }) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/register" exact component={Register}></Route>
                <Route path="/weapon" exact component={Weapon}></Route>
                <Route path="/animal/:animalId" component={Animal}></Route>
            </Switch>
        </BrowserRouter>
    );
}