import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/style.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Portfolio from "./pages/Portfolio";
import ArtistSignin from "./pages/ArtistSignin";
import ArtistRegister from "./pages/ArtistRegister";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Artists from "./pages/Artists";
import Designs from "./pages/Designs";
import Package from "./pages/Package";
import MehendiDesignRepository from "./pages/MehendiDesignRepository";
import ThreeDModel from './components/ThreeDModel';
// import ProductPage from './pages/ProductPage';


import ProductPage from "./pages/Product/ProductPage";
import SelectGift from "./pages/CustomizedGift/SelectGift";
import SelectGiftBox from "./pages/CustomizedGift/SelectGiftBox";
import SelectCard from "./pages/CustomizedGift/SelectCard";
import Message from "./pages/CustomizedGift/Message";
import Cart from "./pages/Product/Cart";
import CheckoutInfo from "./pages/Product/CheckoutInfo";
import ArtistDashboard from "./pages/Artist/ArtistDashboard";
import RequestPage from "./pages/Artist/RequestPage";
import ChangePassword from "./pages/Artist/ChangePassword";

import Sidebar from './components/User Dashboard/Sidebar';
import Profile from './components/User Dashboard/Profile';
import Orders from './components/User Dashboard/Order';
import Appointment from './components/User Dashboard/Appointment';
import AppointmentForm from './components/User Dashboard/AppointmentForm';
import Rating from './components/User Dashboard/RatingAndReview';
import PackageForm from './components/User Dashboard/PackageForm';
import MyCollection from './components/User Dashboard/MyCollection';
// import './App11.css'; 



// import HelloWorld from './HelloWorld';

function App() {
  return (
    // <HelloWorld/>

    <BrowserRouter>
      <Routes>
        
        {/* faisa */}
        <Route path="/" element={<Home />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="/threedmodel" element={<ThreeDModel />}></Route>
        <Route path="portfolio" element={<Portfolio />}></Route>
        <Route path="artistlogin" element={<ArtistSignin />}></Route>
        <Route path="artistregister" element={<ArtistRegister />}></Route>
        <Route path="aboutus" element={<AboutUs />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="services" element={<Service />}></Route>
        <Route path="Artists" element={<Artists />}></Route>
        <Route path="package" element={<Package />}></Route>
        <Route path="Designs" element={<Designs />}></Route>
        <Route path="" element={<Service />}></Route>
        {/* farhath */}
        <Route path="product" element={<ProductPage />} />
        <Route path="giftbox" element={<SelectGiftBox />}></Route>
        <Route path="selectgift" element={<SelectGift />}></Route>
        <Route path="selectcard" element={<SelectCard />}></Route>
        <Route path="message" element={<Message />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="checkoutinfo" element={<CheckoutInfo />}></Route>
        <Route path="artistdashboard" element={<ArtistDashboard />}></Route>
        <Route path="requestpage" element={<RequestPage />}></Route>
        <Route path="changepassword" element={<ChangePassword />}></Route>
        <Route path="/MehendiDesignRepository" element={<MehendiDesignRepository />}></Route>

        {/* sameera */}
        <Route path="sidebar" element={<Sidebar />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="appointment" element={<Appointment />}></Route>
        <Route path="appointmentForm" element={<AppointmentForm />}></Route>
        <Route path="rating" element={<Rating />}></Route>
        <Route path="packageForm" element={<PackageForm />}></Route>
        <Route path="myCollection" element={<MyCollection />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
