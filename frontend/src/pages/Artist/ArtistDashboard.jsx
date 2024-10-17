import React from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import "../../css/artist.css";
import SideBar from "../../components/Artist/SideBar";
import Appointments from "../../components/Artist/Appointments";

export default function ArtistDashboard() {

  return (
    <div>
      <NewNav />
      <h2 className="font-comic text-4xl mb-8 text-left pl-8">Artist Dashboard</h2>
      <div className="art">
        <SideBar />
        <Appointments/>
      </div>
      <Footer />
    </div>
  );
}
