  import React from 'react';
  import { Navigate, Outlet } from 'react-router-dom';
  
  const  AdminProtectedRoute= () => {
    const isAdmin = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.isAdmin;
    };
  
    return isAdmin() ? <Outlet /> : <Navigate to="/signin" replace />;
  };
  
  
export default AdminProtectedRoute;
