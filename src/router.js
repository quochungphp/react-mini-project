import React from 'react';

import NotfoundPage from './backend/containers/NotfoundPage';
import HomePage from './backend/containers/HomePage';
import LoginPage from './backend/containers/LoginPage';


const routes = [
    { 
        path: '/',
        exact: true,
        main: () => <HomePage />
    },

    { 
        path: '/login',
        exact: true,
        main: () => <LoginPage  />
    },
    { 
        path: '',
        exact: true,
        main: () => <NotfoundPage />
    },
];

export default routes;