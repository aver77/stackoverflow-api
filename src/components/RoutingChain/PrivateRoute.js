import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({auth: {isAuth}}) => {
    return (
        isAuth? <Outlet/> : <Navigate to='/'/>
    );
};

export default PrivateRoute;