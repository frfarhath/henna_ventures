import React from 'react'
import NewNav from '../components/NewNav'
import Footer from '../components/Footer'

function Service() {
    const articleStyle = {
        maxWidth: '450px', // Adjust the max-width as needed
        margin: '0 auto', // Center the articles
        backgroundColor: '#ffffff', // Background color for articles
    };

    const articlesContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px', // Adjust gap between articles
    };

    return (
        <div className="services-page">
            <NewNav />
            <header className="service-header">
                <div className="service-overlay">
                    <h1>Our Services</h1>
                    <h2>Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h2>
                    <br></br>
                </div>
            </header>

            <div className="hometitle">
                Embrace Moments with Expertise in  <br></br> Mehendi, Henna Products!
            </div>

            <section style={articlesContainerStyle}>
                <article>
                    <div style={articleStyle}>
                        <figure>
                            <img src="https://cdn.pixabay.com/photo/2021/01/07/12/09/woman-5897055_640.jpg" alt="" />
                        </figure>
                        <div className="article-body">
                            <h2>Henna Party Packages</h2>
                            <p>
                                Customizable henna party packages for bridal showers, weddings, birthdays, and other celebrations, including on-site henna services and group discounts.
                            </p>
                        </div>
                    </div>
                </article>
                <article>
                    <div style={articleStyle}>
                        <figure>
                            <img src="https://images.pexels.com/photos/7176390/pexels-photo-7176390.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        </figure>
                        <div className="article-body">
                            <h2>Express Mehendi Services</h2>
                            <p>
                                Quick and convenient mehendi application services for busy individuals, offering intricate designs in a short time frame.
                            </p>
                        </div>
                    </div>
                </article>
                <article>
                    <div style={articleStyle}>
                        <figure>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/441001113251193.6023fb0e43e1b.jpg" alt="" />
                        </figure>
                        <div className="article-body">
                            <h2>Henna Products</h2>
                            <p>
                                High-quality henna products such as natural henna cones, henna powder, and henna kits for at-home application and professional use.
                            </p>
                        </div>
                    </div>
                </article>
                <article>
                    <div style={articleStyle}>
                        <figure>
                            <img src="https://cdn.pixabay.com/photo/2017/10/14/06/03/mehndi-2849864_960_720.jpg" alt="" />
                        </figure>
                        <div className="article-body">
                            <h2>Custom Mehendi Designs</h2>
                            <p>
                                Personalized mehendi designs tailored to individual preferences and occasions, including bridal mehendi, festival designs, and special events.
                            </p>
                        </div>
                    </div>
                </article>
            </section>
            <Footer />
        </div>
    )
}

export default Service
