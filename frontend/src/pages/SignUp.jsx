import React from "react";
import "../css/signup.css";
import NewNav from "../components/NewNav";
import RegistrationForm from "../components/Registration/RegistrationForm";
import Footer from "../components/Footer";


function SignUp() {
  return (
    <div>
      <NewNav />

      <section>
        <RegistrationForm />
      </section>

      <Footer />
    </div>
  );
}

export default SignUp;
