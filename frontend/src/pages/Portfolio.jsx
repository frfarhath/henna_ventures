import React from 'react'
import img from '../images/portfolio/1.jpg'
import img1 from '../images/portfolio/2.jpg'
import img2 from '../images/portfolio/3.jpg'
import img3 from '../images/portfolio/4.jpg'
import img4 from '../images/portfolio/5.jpg'
import img5 from '../images/portfolio/16.jpg'
import img6 from '../images/portfolio/17.jpg'
import img7 from '../images/portfolio/8.jpg'
import img8 from '../images/portfolio/9.jpg'
import img9 from '../images/portfolio/10.jpg'
import img10 from '../images/portfolio/19.jpg'
import img11 from '../images/portfolio/12.jpg'
import img12 from '../images/portfolio/13.jpg'
import img13 from '../images/portfolio/14.jpg'
import img14 from '../images/portfolio/18.jpg'
import NewNav from '../components/NewNav'
import Footer from '../components/Footer'

function Portfolio() {
    return (
        <div className="Portfolio-page" style={{ backgroundColor: 'white' }}>
            <NewNav />
            <header className="service-header">
                <div className="service-overlay">
                
                    <h1>Our Portfolio</h1>
                    <h4> Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h4>
                    <br></br>

                </div>
            </header>
            {/* <div className='portfolioTitle'>
                <div className='inner'>
                    Photo <span>Gallery</span>
                </div>
            </div> */}
            <div className="hometitle">
      Embrace Moments with Expertise in  <br></br> Mehendi, Henna Products!
      </div>
            <div className='imgContainer'>
                <img className='image' src={img} alt="Girl" width="220" height="600"></img>
                <img className='image' src={img1} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img2} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img3} alt="Girl" width="220" height="600"></img>
                <img className='image' src={img4} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img5} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img6} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img7} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img8} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img9} alt="Girl" width="220" height="600"></img>
                <img className='image' src={img10} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img11} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img12} alt="Girl" width="220" height="600"></img>
                <img className='image' src={img13} alt="Girl " width="220" height="600"></img>
                <img className='image' src={img14} alt="Girl " width="220" height="600"></img>
               </div>
            <div className='portfolioBtn'>
                <a href='#'>More Photos</a>
            </div>
            <Footer />
        </div>
    )
}

export default Portfolio
