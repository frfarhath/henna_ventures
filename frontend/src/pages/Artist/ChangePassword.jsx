import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import "../../css/artist.css";
import SideBar from "../../components/Artist/SideBar";
import PasswordChange from "../../components/Artist/PasswordChange";
export default function ChangePassword() {
  return (
    <div>
      <NewNav />
      <h2 className="font-comic text-4xl mb-[-10px] text-left pl-8">Artist Dashboard</h2>
      <div className="art">
        <SideBar />
        <PasswordChange />
      </div>
      <Footer />
    </div>
  );
}
