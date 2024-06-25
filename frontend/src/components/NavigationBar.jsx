import React from 'react';
import { Button, Navbar } from 'flowbite-react';
import logotrans from '../images/logo_trans.png';
import profileImage from '../images/profile.jpg'; // Replace with the correct path to your profile image

function NewNav({ isLoggedIn }) {
    return (
        <Navbar fluid rounded className='navcom'>
            <Navbar.Brand href="/">
                <img src={logotrans} className="navlogo mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/" className='names'>Home</Navbar.Link>
                <Navbar.Link href="/aboutus" className='names'>About</Navbar.Link>
                <Navbar.Link href="/services" className='names'>Services</Navbar.Link>
                <Navbar.Link href="/portfolio" className='names'>Portfolio</Navbar.Link>
                 <Navbar.Link href="/contact" className='names'>Contact</Navbar.Link>
                {isLoggedIn ? (
                    <a href="/profile">
                        <img src={profileImage} className="h-8 w-8 rounded-full" alt="Profile" />
                    </a>
                ) : (
                    <a href="/signin"><Button className='navbutton'>Login</Button></a>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NewNav;
