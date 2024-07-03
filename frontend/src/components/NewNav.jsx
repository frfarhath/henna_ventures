import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Navbar } from 'flowbite-react';
import { MDBBtn } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import logotrans from '../images/logo.png';
import profileImage from '../images/profile.jpg'; // Replace with the correct path to your profile image

function NewNav() {
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const token = useMemo(() => cookies?.access_token, [cookies]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/individual/getProfile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data;
                setUserData(userData);
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    const logout = () => {
        removeCookie("access_token");
        navigate("/login");
    };

    return (
        <Navbar fluid rounded className='navcom' style={{ backgroundColor: '#ffffff', border: '1px solid #f5f0eb' }}>
            <Navbar.Brand href="https://flowbite-react.com">
                <img src={logotrans} className="navlogo mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/" className='names'>Home</Navbar.Link>
                <Navbar.Link href="aboutus" className='names'>About</Navbar.Link>
                <Navbar.Link href="services" className='names'>Services</Navbar.Link>
                <Navbar.Link href="portfolio" className='names'>Portfolio</Navbar.Link>
                <Navbar.Link href="contact" className='names'>Contact</Navbar.Link>
                {!token ? (
                    <Link to="/signin">
                        <Button className='navbutton'>Login</Button>
                    </Link>
                ) : userData !== null ? (
                    <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            {userData.fullname}
                            {userData.avatar ? (
                                <img src={userData.avatar} alt="Profile Avatar" className="avatar h-8 w-8 rounded-full ml-2" />
                            ) : (
                                <img src={profileImage} className="h-8 w-8 rounded-full ml-2" alt="Profile" />
                            )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className="profilebox" href="#">
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item className="profilebox" href="#">
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item className="profilebox" href="#" onClick={logout}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <span>Loading...</span>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NewNav;
