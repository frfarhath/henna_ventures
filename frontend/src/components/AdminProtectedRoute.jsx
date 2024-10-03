import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check if user is authenticated and has an admin role
  if (!token || user.role !== 'admin') {
    // Redirect to login if the user is not authenticated or is not an admin
    return <Navigate to="/signin" />;
  }

  // If authenticated and user is admin, allow access
  return children;
};

export default AdminProtectedRoute;
