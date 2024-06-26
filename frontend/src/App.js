import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/style.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ContactUs from "./pages/ContactUs";
import Portfolio from "./pages/Portfolio";
import ArtistSignin from "./pages/ArtistSignin";
import ArtistRegister from "./pages/ArtistRegister";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import AddToCart from "./pages/AddToCart";
import Artists from "./pages/Artists";
import Designs from "./pages/Designs";
import Package from "./pages/package";
import ProductPage from './pages/ProductPage';
import CartPage from "./pages/CartPage";
import CustomizeGift from "./pages/CustomizeGift";
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

import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import Orders from './components/Order';
import Appointment from './components/Appointment';
import AppointmentForm from './components/AppointmentForm';
import Rating from './components/RatingAndReview';
import PackageForm from './components/PackageForm';
import MyCollection from './components/MyCollection';
import './App11.css'; 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


// import HelloWorld from './HelloWorld';

function App() {
  return (
    // <HelloWorld/>

    <BrowserRouter>
      <Routes>
    
          {/* Sidebar routes */}
          <Route path="/profile" element={
            <div className="flex w-full">
              <Sidebar />
              <div className="flex-grow">
                <Profile />
              </div>
            </div>
          } />
          <Route path="/orders" element={
            <div className="flex w-full">
              <Sidebar />
              <div className="flex-grow">
                <Orders />
              </div>
            </div>
          } />
        <Route path="/" element={<Home />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="contactus" element={<ContactUs />}></Route>
        <Route path="portfolio" element={<Portfolio />}></Route>
        <Route path="artistlogin" element={<ArtistSignin />}></Route>
        <Route path="artistregister" element={<ArtistRegister />}></Route>
        <Route path="aboutus" element={<AboutUs />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="services" element={<Service />}></Route>
        <Route path="addtocart" element={<AddToCart/>}></Route>
        <Route path="Artists" element={<Artists />}></Route>
        <Route path="package" element={<Package />}></Route>
        <Route path="Designs" element={<Designs/>}></Route>
        <Route path="" element={<Service />}></Route>
        <Route path="/product" element={<ProductPage />} />
        <Route path="gift" element={<CustomizeGift/>}></Route>
            
        <Route path="/Sidebar" element={<Sidebar />} />    
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/individual" element={<AppointmentForm />} />
        <Route path="/ratings" element={<Rating />} />
        <Route path="/packages" element={<Package />} />
        <Route path="PackageForm" element={<PackageForm />} />
        <Route path="/mycollection" element={<MyCollection />} />
            
      <Route path="product" element={<ProductPage />} />
        <Route path="giftbox" element={<SelectGiftBox />}></Route>
        <Route path="selectgift" element={<SelectGift />}></Route>
        <Route path="selectcard" element={<SelectCard />}></Route>
        <Route path="message" element={<Message />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="checkoutinfo" element={<CheckoutInfo />}></Route>
        <Route path="artistdashboard" element={<ArtistDashboard />}></Route>
        <Route path="requestpage" element={<RequestPage />}></Route>
        <Route path="changepassword" element={<ChangePassword />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
