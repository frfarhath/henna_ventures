import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/ArtistRegister.css';

function RegistrationForm() {
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("submit", "signup");
  };

  return (
    <div className="signContainer flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-xl p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg">
        <form onSubmit={(e) => submitForm(e)}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="full_name"
              id="full_name"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="full_name"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="phone"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contact Number
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="previous_works"
              className="peer-focus:font-medium text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
            >
              Previous Works
            </label>
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              name="previous_works"
              id="previous_works"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="E-certificate"
              className="peer-focus:font-medium text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0]"
            >
              E-certificate
            </label>
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              name="E-certificate"
              id="E-certificate"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="location"
              id="location"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="location"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Location
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="flex items-center">
              <input type="checkbox" name="nearest_customers" className="form-checkbox" />
              <span className="ml-2 text-white">Can go to the nearest customer's area to put henna</span>
            </label>
          </div>
          <div className="subButton">
            <button type="submit" className="button bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Register here
            </button>
          </div>

          <p className="text-white mt-5">
            Already have an account?{" "}
            <a
              href="artistlogin"
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Click here to Sign In
              <svg
                className="w-4 h-4 ml-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
