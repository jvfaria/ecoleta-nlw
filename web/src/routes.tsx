import React from 'react';
import { Route, BrowserRouter }  from 'react-router-dom';

import Home from './pages/home';
import index from './pages/CreatePoint';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={index} path="/create-point" exact />
        </BrowserRouter>

    );

}

export default Routes;