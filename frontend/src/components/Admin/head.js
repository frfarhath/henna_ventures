import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../style/dashboard.css";

import { FaUser } from "react-icons/fa6";
import { ImSwitch } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";


class Head extends Component {

    constructor(props) {
        super(props)
    }


    render() {

        return (

            <div className='conhead'>

                <div style={{ marginTop: 10 }}>
                    <h2 className='welcometxt'>WELCOME TO ADMIN DASHBOARD !</h2>
                </div>

                <div className='welcomeicons'>

                    <Link className='siderow' to='/'>
                        <AiFillHome size={23} className="icon4" />
                    </Link>
                    <Link className='siderow' to='/'>
                        <FaUser size={20} className="icon4" />
                    </Link>
                    <Link className='siderow' to='/'>
                        <ImSwitch size={20} className="icon4" />
                    </Link>

                </div>
                
            </div>

        )

    }

};

export default Head;