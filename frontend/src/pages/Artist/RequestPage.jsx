import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import "../../css/artist.css";
import SideBar from "../../components/Artist/SideBar";
import Requests from "../../components/Artist/Requests";

export default function RequestPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <NewNav />
      <h2 className="font-comic text-4xl mb-[-10px] text-left pl-8">Artist Dashboard</h2>
      <div className="art">
        <SideBar onDateChange={handleDateChange} />
        <Requests />
      </div>
      <Footer />
    </div>
  );
}
