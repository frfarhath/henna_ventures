import React, { useState, useEffect, useContext } from 'react';
import { Button, Navbar, Dropdown, Avatar } from 'flowbite-react';
import { FaUserCircle } from 'react-icons/fa';
import logotrans from '../images/logo_trans.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

const NewNav = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [fullname, setFullname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const res = await axios.get('http://localhost:8000/api/v1/user/profile', config);
        const data = res.data;

        setFullname(data.fullname);
        setProfileImage(data.profileImage);
        setUser(data);
        setUserData(data); // Set the user data in the state
        setIsAuthenticated(true); // Set authentication status to true
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsAuthenticated(false); // Set authentication status to false in case of error
      }
    };

    fetchProfile();
  }, [setUser]);

  return (
    
    <Navbar fluid rounded className='navcom' style={{ backgroundColor: 'white' }}>
      <Navbar.Brand href="/">
        <img src={logotrans} className="navlogo mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" className='names'>
          Home
        </Navbar.Link>
        <Navbar.Link href="aboutus" className='names'>About</Navbar.Link>
        <Navbar.Link href="services" className='names'>Services</Navbar.Link>
        <Navbar.Link href="portfolio" className='names'>Portfolio</Navbar.Link>
        <Navbar.Link href="contact" className='names'>Contact</Navbar.Link>
        {isAuthenticated ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar img={profileImage || '/images/default_avatar.png'} rounded={true} />} // Use default avatar if profileImage is empty
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {fullname}
              </span>
              <span className="block truncate text-sm font-medium">
                {userData.role}
              </span>
            </Dropdown.Header>
            <Dropdown.Item href={userData.role === 'artist' ? '/artistdashboard' : '/profile'}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              // handle logout logic
              localStorage.removeItem('token');
              setIsAuthenticated(false);
              navigate('/signin');
            }}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <a href="signin">
            <Button className='navbutton'>Login</Button>
          </a>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NewNav;
