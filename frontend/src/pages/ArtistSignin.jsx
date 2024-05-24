import React from 'react'
import NewNav from '../components/NewNav'
import Footer from '../components/Footer'
import logo from '../images/logo_trans.png'

function ArtistSignin() {
    return (
        <div>
            <NewNav />

            <div className='signContainer'>
                <div className='formgrid'>
                    <img className="h-auto w-52" src={logo} alt="Henna Ventures Logo" />
                    <form>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block py-2.5 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="email"
                                className="font-bold peer-focus:font-medium absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block py-2.5 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="password"
                                className="font-bold peer-focus:font-medium absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600"
                            >
                                Password
                            </label>
                        </div>
                        <div className='subButton'>
                            <button type="submit" className="button text-base">Sign In</button>
                        </div>
                        <p className="text-white mt-6">
                            Don't have an account?{' '}
                            <a href="artistregister" className="inline-flex items-center font-medium text-blue-600 hover:underline">
                                Click here to register
                                <svg className="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                       </p>
                       
                    </form>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default ArtistSignin
