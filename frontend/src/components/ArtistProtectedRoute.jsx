import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ArtistProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  
  if (!token || userType !== 'artist') {
    // Redirect to artist login if not authenticated or not an artist
    return <Navigate to="/artistlogin" replace />;
  }

  // If authenticated and is an artist, render the child routes
  return <Outlet />;
};

export default ArtistProtectedRoute;