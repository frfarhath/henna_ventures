import React from 'react'
import about from '../images/about.jpg'
import NewNav from '../components/NewNav'
import Footer from '../components/Footer'

function AboutUs() {
    return (
        <div>
            <NewNav />
            <header className="service-header">
                <div className="service-overlay">
                   
                    <h1>About Henna Ventures</h1>
                    <h2> Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h2>
                    <br></br>
                    {/* <a href='signup'><button1>Sign Up Now</button1></a> */}
                </div>
            </header>

            <div className="hometitle">
      Embrace Moments with Expertise in  <br></br> Mehendi, Henna Products!
      </div>


            <div className='flex flex-col justify-center items-center md:flex-row' style={{ marginTop: 50, marginBottom: 50 }}>
                <div className='w-full md:w-1/2 flex justify-center items-center'>
                    <img
                        style={{ width: 400, height: 600, }}
                        className="aboutimg"
                        src={about}
                        alt="image description"
                    />
                </div>
                <div className=' w-full md:w-2/3  justify-start items-center'>
                    <p className='description'>
                        <div className='abouttitle'>Who we are?</div>
                        At Henna Ventures, we are passionate about celebrating the art of mehendi and creating memorable experiences for our customers. As the ultimate online destination for seamless mehendi customization, we blend tradition with innovation to offer a diverse range of designs and high-quality henna products.
                        <br></br><br></br>Our team of expert artists and designers are dedicated to bringing your vision to life, whether it's for a special occasion or everyday moments.
                        <br></br><br></br>
                        With a commitment to excellence and customer satisfaction, we invite you to explore our world of mehendi artistry and make every moment truly special with Henna Ventures!
                    </p>
                </div>

            </div>

            <Footer/>

        </div>
    )
}

export default AboutUs
