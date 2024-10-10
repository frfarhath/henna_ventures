import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserProvider } from "./components/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ArtistProtectedRoute from './components/ArtistProtectedRoute';
import "./css/style.css";
import VerifyOTP from "./components/verifyOTP";
import ForgotPassword from "./components/ForgotPassword";
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
import Package from "./pages/package";
import IndPackage from "./pages/individual-packages";
import MehendiDesignRepository from "./pages/MehendiDesignRepository";
import ThreeDModel from "./components/ThreeDModel";
import ProductPage from "./pages/Product/ProductPage";
import Cart from "./pages/Product/Cart";
import CheckoutInfo from "./pages/Product/CheckoutInfo";
import ArtistDashboard from "./pages/Artist/ArtistDashboard";
import RequestPage from "./pages/Artist/RequestPage";
import ChangePassword from "./pages/Artist/ChangePassword";
import UserDashboardLayout from "./components/UserDashboardLayout";
import Profile from "./components/User Dashboard/Profile";
import Orders from "./components/User Dashboard/Order";
import Appointment from "./components/User Dashboard/Appointment";
import AppointmentForm from "./components/User Dashboard/AppointmentForm";
import Rating from "./components/User Dashboard/RatingAndReview";
import PackageForm from "./components/User Dashboard/PackageForm";
import MyCollection from "./components/User Dashboard/MyCollection";

import Dashboard from "./pages/Admin/dashboard";
import AppointmentDetails from './pages/Admin/appoinment';
import Product from "./pages/Admin/product";
import Order from "./pages/Admin/orders";
import Repository from "./pages/Admin/repository";
import Artist from "./pages/Admin/artist";
import Summary from "./pages/Admin/summary";
import Review from "./pages/Admin/rating";
import DisplayMessages from "./pages/Admin/DisplayMessages";
import CustomGiftBox from "./pages/CustomizedGift/CustomGiftBox";
function App() {
  return (
    <UserProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="/threedmodel" element={<ThreeDModel />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="artistlogin" element={<ArtistSignin />} />
            <Route path="artistregister" element={<ArtistRegister />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Service />} />
            <Route path="Artists" element={<Artists />} />
            <Route path="individual-package" element={<IndPackage />} />
            <Route path="package" element={<Package />} />
            <Route path="Designs" element={<Designs />} />
            <Route path="product" element={<ProductPage />} />

           
            <Route element={<ArtistProtectedRoute />}>
            <Route path="artistdashboard" element={<ArtistDashboard />} />
            <Route path="requestpage" element={<RequestPage />} />
            <Route path="changepassword" element={<ChangePassword />} />
            </Route>
            <Route
              path="/MehendiDesignRepository"
              element={<MehendiDesignRepository />}
            />

            {/* Admin Protected Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/Admin" element={<Dashboard />} />
              <Route path="/Products" element={<Product />} />
              <Route path="/Order" element={<Order />} />
              <Route path="/AppointmentDetails" element={<AppointmentDetails />} />
              <Route path="/Repository" element={<Repository />} />
              <Route path="/Artist" element={<Artist />} />
              <Route path="/Summary" element={<Summary />} />
              <Route path="/Review" element={<Review />} />
              <Route path="/DisplayMessages" element={<DisplayMessages />} />
            </Route>

            <Route element={<ProtectedRoute />}>
           
            <Route path="giftbox" element={<CustomGiftBox />} />

            <Route path="cart" element={<Cart />} />
            <Route path="checkoutinfo" element={<CheckoutInfo />} />
            <Route element={<UserDashboardLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="appointment" element={<Appointment />} />
              <Route
                path="/appointment/individual"
                element={<AppointmentForm />}
              />
              <Route path="/appointment/packages" element={<PackageForm />} />
              <Route path="ratings" element={<Rating />} />
              <Route path="collection" element={<MyCollection />} />
            </Route>
            </Route>
          </Routes>
        </Router>
      </DndProvider>
    </UserProvider>
  );
}

export default App;
