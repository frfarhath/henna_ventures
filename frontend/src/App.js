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
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import Orders from './components/Order';


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
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;
