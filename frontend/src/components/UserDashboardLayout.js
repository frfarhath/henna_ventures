import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './User Dashboard/Sidebar';
import NewNav from "../components/NewNav";
import Footer from "../components/Footer";
const UserDashboardLayout = () => {
  return (
    <div>
      <NewNav />
    <div className="flex "style={{ backgroundColor: '#ffffff' }}>
      
      <Sidebar />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    
    </div>
    <Footer />
    </div>
  );
};

export default UserDashboardLayout;
