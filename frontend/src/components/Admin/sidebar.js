import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../style/dashboard.css";

import dp from "../../images/logo.png";
import { IoMdList } from "react-icons/io";
import { MdOutlineInventory } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";

class SideBar extends Component {
  render() {
    return (
      <div className="AdminSidebar">
        <div className='sidehead'>
          <div className="imgdp mt-5">
            <img src={dp} alt="" className='logo' />
          </div>
          <h4 className='sidetitle'>ADMIN DASHBOARD</h4>
        </div>
        <div className='sidebody'>
          <Link className='siderow' to='/Products'>
            <BsFillGridFill size={22} className="icon3" />
            <h5 className='siderowtxt'>PRODUCTS</h5>
          </Link>
          <Link className='siderow' to='/Appoinment'>
            <IoCalendar size={22} className="icon3" />
            <h5 className='siderowtxt'>APPOINTMENTS</h5>
          </Link>
          <Link className='siderow' to='/Order'>
            <BsCartPlusFill size={22} className="icon3" />
            <h5 className='siderowtxt'>ORDERS</h5>
          </Link>
          <Link className='siderow' to='/Repository'>
            <MdOutlineInventory size={22} className="icon3" />
            <h5 className='siderowtxt'>REPOSITORY</h5>
          </Link>
          <Link className='siderow' to='/Artist'>
            <FaUserPlus size={22} className="icon3" />
            <h5 className='siderowtxt'>ARTIST</h5>
          </Link>
          <Link className='siderow' to='/Summary'>
            <IoMdList size={22} className="icon3" />
            <h5 className='siderowtxt'>SUMMARY</h5>
          </Link>
          <Link className='siderow' to='/Review'>
            <FaRegStar size={22} className="icon3" />
            <h5 className='siderowtxt'>REVIEWS</h5>
          </Link>
          <Link className='siderow' to='/DisplayMessages'>
            <MdContactMail size={22} className="icon3" />
            <h5 className='siderowtxt'>MESSAGES</h5>
          </Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
