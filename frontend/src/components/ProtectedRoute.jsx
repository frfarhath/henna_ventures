import { useContext } from 'react';
import UserContext from './UserContext';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/signin" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;
