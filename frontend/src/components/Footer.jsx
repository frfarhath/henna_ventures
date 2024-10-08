// Footer.jsx
import React from "react";
import Logo from "../images/logo.png";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const Services = [
    { name: "Henna products", link: "/product" },
    { name: "Customize designs", link: "/threedmodel" },
    { name: "Packages", link: "/package" },
    { name: "Mehendi designs", link: "/MehendiDesignRepository" },
  ];

  const QuickLinks = [
    { id: "home", name: "Home", link: "/" },
    { id: "about", name: "About", link: "/aboutus" },
    { id: "portfolio", name: "Portfolio", link: "/portfolio" },
    { id: "contact", name: "Contact", link: "/contact" },
  ];

  const SocialMedia = [
    {
      id: "phone",
      icon: <FaPhoneAlt size={20} />,
      title: "Whatsapp",
      link: "https://l.instagram.com/?u=https%3A%2F%2Fchat.whatsapp.com%2FDfNCe5vRfVcJ9yHEVQvJvU&e=AT2FHHwyToqDDjDfAm24rp01geOCo5jRuQw37fZIhmTQkXnzaa1njiTfxpIRLwFS1BXIPPv4Q5upSyWXBj0Sz6BkkpfJpo23",
    },
    {
      id: "email",
      icon: <MdEmail size={20} />,
      title: "Email",
      link: "",
    },
    {
      id: "facebook",
      icon: <FaFacebook size={20} />,
      title: "Facebook",
      link: "",
    },
    {
      id: "instagram",
      icon: <FaInstagram size={20} />,
      title: "Instagram",
      link: "https://www.instagram.com/henna_ventures/",
    },
  ];

  return (
    <footer className="bg-[#543310] text-white">
      <div className="footerContent grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
        {/*logo*/}
        <div>
          <img src={Logo} alt="Henna Ventures Logo" className="max-w-full max-h-10" />
        </div>

        {/*links*/}
        <div>
          <ul>
            <h1 className="footerText mb-2 text-lg font-semibold uppercase">
              Quick Links
            </h1>
            {QuickLinks.map((link) => (
              <li key={link.id}>
                <a
                  className="footerText text-white py-3 hover:text-gray-300 duration-300 text-sm cursor-pointer leading-6"
                  href={link.link}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/*services*/}
        <div>
          <ul>
            <h1 className="footerText mb-2 text-lg font-semibold">SERVICES</h1>
            {Services.map((service) => (
              <li key={service.name}>
                <a
                  className="footerText text-white py-3 hover:text-gray-300 duration-300 text-sm cursor-pointer leading-6"
                  href={service.link}
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/*contact*/}
        <div>
          <ul>
            <h1 className="footerText mb-2 font-semibold uppercase text-lg">
              Contact Us
            </h1>
            {SocialMedia.map((link) => (
              <li key={link.id}>
                <div className="flex justify-start">
                  <a
                    className="footerText text-white font-semibold py-2 hover:text-gray-300 duration-300 cursor-pointer leading-6"
                    href={link.link}
                  >
                    {link.icon}
                  </a>
                  <a
                    className="footerText text-white ml-4 my-1 pt-1 hover:text-gray-300 duration-300 text-sm cursor-pointer leading-6"
                    href={link.link}
                  >
                    {link.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*social icons*/}
      <div className="text-center pt-2 text-white text-sm pb-8">
        <span>© 2024 Henna Ventures. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
