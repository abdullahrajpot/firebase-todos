import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';
import Auth from './Auth';
import Dashboard from './Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Frontend from './Frontend';

export default function Index() {
  const { state } = useAuthContext();

  return (
    <Routes>
      <Route path="/*" element={<Frontend />} />
      <Route path="auth/*" element={!state.isAuthenticated ? <Auth /> : <Navigate to="/dashboard" />} />
      <Route path="dashboard/*" element={<PrivateRoute Component={Dashboard} />} />
    </Routes>
  );
}
