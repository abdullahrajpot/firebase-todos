import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

export default function PrivateRoute({ Component }) {
    const { state } = useAuthContext();

    // console.log("Is Authenticated (PrivateRoute):", isAuthenticated);

    if (!state.isAuthenticated) return <Navigate to='/auth/login' />;
    return <Component />;
}
