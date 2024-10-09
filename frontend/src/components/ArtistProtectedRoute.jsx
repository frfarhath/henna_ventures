import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ArtistProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to artist login if not authenticated
    return <Navigate to="/artistlogin" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ArtistProtectedRoute;