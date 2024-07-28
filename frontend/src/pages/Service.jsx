import React from 'react';
import NewNav from '../components/NewNav';
import Footer from '../components/Footer';

// Import images from the src folder
import Img1 from '../images/services/1.jpg'; 
import Img2 from '../images/services/2.jpg';   
import Img3 from '../images/services/3.jpeg';  
import Img4 from '../images/services/4.jpg'; 
import Img5 from '../images/services/5.jpg';   
import Img6 from '../images/services/6.jpg';        
const services = [
  {
    title: "Henna Packages",
    description: "Explore our tailored Mehendi packages for weddings, festivals, and special events. Each package offers expertly applied designs, blending traditional elegance with personalized touches to ensure a memorable and enchanting experience.",
    imageUrl: Img2,
  },
  {
    title: "Henna Product Sales",
    description: "Explore our range of high-quality Henna products, including pre-mixed cones, pure Henna powder, design stencils, and comprehensive kits. Perfect for DIY enthusiasts or professional artists, each product ensures vibrant color and lasting impressions.",
    imageUrl: Img1,
  },
  {
    title: "Gift Box Customization",
    description: "Elevate your gifting experience with our personalized Henna gift boxes. From custom-designed sets for weddings and festivals to unique corporate gifts, each box is curated with care to delight and commemorate special occasions.",
    imageUrl: Img5,
  },
  {
    title: " Design Customization",
    description: "Experience the convenience of virtual Henna design customization with our 3D hand model. Choose from a diverse library of designs, customize both front and back hand patterns, and visualize your unique Mehendi creations with ease.",
    imageUrl: Img3,
  },
  {
    title: "Appointment Scheduling",
    description: "implify your Henna experience with our seamless appointment scheduling. Whether you prefer in-home services, studio appointments, or need a Henna artist for an event, our flexible booking options ensure personalized and professional service.",
    imageUrl: Img4,
  },
  {
    title: " Design Collection",
    description: "Explore our diverse Mehendi Design Collection featuring traditional and contemporary patterns. Crafted by skilled artists, our designs cater to bridal celebrations, festivals, and personal preferences, ensuring each application is a masterpiece of cultural artistry and beauty.",
    imageUrl: Img6,
  },
  // Add 3 more services here with appropriate image imports
];

const Services = () => {
  return (
    <div className="services-page" style={{ backgroundColor: 'white' }}>
      <NewNav />
      <header className="service-header">
        <div className="service-overlay">
          <h1>Our Services</h1>
          <h4>Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h4>
          <br />
        </div>
      </header>
      <div className="hometitle">
      Embrace Moments with Expertise in  <br></br> Mehendi, Henna Products!
      </div>
      <div className="py-12">
        <div className="text-center mb-12">
        
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
             <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-transparent rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.imageUrl})`, borderTopLeftRadius: "50%", borderTopRightRadius: "50%" }}></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-2xl mb-2 font-bold text-brown-800">{service.title}</h3>
                <p className="text-gray-600 mb-1">{service.description}</p>
                <button className="mt-4 px-6 py-2 bg-yellow-800 text-white rounded">MORE</button>
            </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
