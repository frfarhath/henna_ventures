import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../style/dashboard.css";

import { FaUser } from "react-icons/fa6";
import { ImSwitch } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";

const Head = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to home page or login page
        navigate('/');
    };

    return (
        <div className='conhead'>
            <div style={{ marginTop: 10 }}>
                <h2 className='welcometxt'>WELCOME TO ADMIN DASHBOARD !</h2>
            </div>

            <div className='welcomeicons'>
                <Link className='siderow' to='/'>
                    <AiFillHome size={23} className="icon4" />
                </Link>
                <Link className='siderow' to='/Admin'>
                    <FaUser size={20} className="icon4" />
                </Link>
                <button className='siderow' onClick={handleLogout}>
                    <ImSwitch size={20} className="icon4" />
                </button>
            </div>
        </div>
    );
};

export default Head;