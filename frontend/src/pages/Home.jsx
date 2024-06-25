import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/pricingCard.css";
import "../css/home.css";
import "../css/portfolio.css";
import "../css/service.css";
import "../css/services.css";
import service from "../images/service1.jpg";
import design from "../images/service2.jpg";
import hena from "../images/product.jpg";
import photo from "../images/hands.jpg";
import about from "../images/about.jpg";
import NewNav from "../components/NewNav";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ"; 
import Rating from "../components/Rating";
function Home() {
  return (
    <div>
      <NewNav />
      <header>
        <div className="overlay">
          <h1>Welcome to Henna Ventures</h1>
          <h2>Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h2>
          <br />
          <a href="signup">
            <button1>Sign Up Now</button1>
          </a>
        </div>
        
      </header>

      {/* <div className="hometitle">
        Embrace Moments with Expertise in <br /> Mehendi, Henna Products!
      </div> */}

      <div
        className="flex flex-col justify-center items-center md:flex-row"
        style={{ marginTop: 50, marginBottom: 50 }}
      >
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            style={{ width: 350, height: 450 }}
            className="aboutimg"
            src={about}
            alt="image description"
          />
        </div>
        <div className="w-full md:w-2/3 justify-start items-center">
          <p className="description">
            <div className="abouttitle">At Henna Ventures,</div>
            we are passionate about celebrating the art of mehendi and creating
            memorable experiences for our customers. As the ultimate online
            destination for seamless mehendi customization, we blend tradition
            with innovation to offer a diverse range of designs and high-quality
            henna products. <br />
            <br /> Our team of expert artists and designers are dedicated to
            bringing your vision to life, whether it's for a special occasion or
            everyday moments. <br />
            <br />
            With a commitment to excellence and customer satisfaction, we invite
            you to explore our world of mehendi artistry and make every moment
            truly special with Henna Ventures!
          </p>
        </div>
      </div>

      <h1 className="title">Our Services</h1>
      <div className="our-services">
        <div className="cardcontainer">
          <a
            href="#"
            className="serviceCard flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="serviceimg object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={service}
              alt=""
            ></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Custom Mehendi Designs
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              visualize and customize mehendi designs in real-time, ensuring satisfaction before application.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/threedmodel"
                  className="mehendi-color hover:mehendi-dark text-white font-bold py-2 px-4 rounded mt-4"
                >
                  View More
                </Link>
              </div>
            </div>
          </a>
        </div>
        <div className="cardcontainer">
          <a
            href="#"
            className="serviceCard flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="serviceimg object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={design}
              alt=""
            ></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mehendi design collections
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              browse and explore a diverse collection of mehendi designs.
Design categories are available for different styles, and preferences

              </p>
              <div className="flex justify-center">
                <Link
                  to="/MehendiDesignRepository"
                  className="mehendi-color hover:mehendi-dark text-white font-bold py-2 px-4 rounded mt-4"
                >
                  View More
                </Link>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="our-services">
        <div className="cardcontainer">
          <a
            href="#"
            className="serviceCard flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="serviceimg object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={hena}
              alt=""
            ></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Henna Products
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                High-quality henna products such as natural henna cones, henna
                powder, and henna kits for at-home application and professional
                use.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/AddToCart"
                  className="mehendi-color hover:mehendi-dark text-white font-bold py-2 px-4 rounded mt-4"
                >
                  View More
                </Link>
              </div>
            </div>
          </a>
        </div>
        <div className="cardcontainer">
          <a
            href="#"
            className="serviceCard flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="serviceimg object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={photo}
              alt=""
            ></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Customizing giftbox
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              curate a selection of henna products to create a thoughtful and customized gift package for themselves or their loved ones.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/Artists"
                  className="mehendi-color hover:mehendi-dark text-white font-bold py-2 px-4 rounded mt-4"
                >
                  View More
                </Link>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="our-services">
        <div className="cardcontainer">
          <a
            href="#"
            className="serviceCard flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="serviceimg object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={service}
              alt=""
            ></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Expert Artists
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Quick and convenient mehendi application services for busy
              individuals, offering intricate designs in a short time frame.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/Design"
                  className="mehendi-color hover:mehendi-dark text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Book now
                </Link>
              </div>
            </div>
          </a>
        </div>
        
      </div>
      {/* Add the FAQ component here */}
      <FAQ />
      <Rating />
      <Footer />
    </div>
  );
}

export default Home;
