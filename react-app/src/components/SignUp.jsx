import React, { useState } from "react";
//import lock from "../assets/lock.svg";
//import person from "../assets/person.svg";
import "../styles/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (inputErrors[name]) {
      setInputErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });

      //czysci komunikat glowny tylko raz przy pierwszym poprawieniu
      if (errorMessage) {
        setErrorMessage("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //walidacja danych
    const errors = getSignupFormErrors(formData);

    //jesli sa bledy
    if (errors.length > 0) {
      setErrorMessage(errors.join(". "));
      return;
    }

    //pomyslna rejestracja
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", //kluczowe dla sesji
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Rejestracja nie powiodła się");
      }

      const data = await response.text(); // lub .json() jeśli zwracasz JSON
      console.log("Sukces:", data);
      navigate("/encryption"); // przejdź dalej
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  //funkcja sprawdzajaca bledy w Signup
  function getSignupFormErrors({
    firstname,
    lastname,
    email,
    password,
    repeatPassword,
  }) {
    let errors = [];
    let fieldErrors = {};

    if (!firstname) {
      errors.push("Firstname is required");
      fieldErrors.firstname = true;
    }

    if (!lastname) {
      errors.push("Lastname is required");
      fieldErrors.lastname = true;
    }

    if (!email) {
      errors.push("Email is required");
      fieldErrors.email = true;
    }

    if (!password) {
      errors.push("Password is required");
      fieldErrors.password = true;
    } else {
      if (password.length < 8) {
        errors.push("Password must have at least 8 characters");
        fieldErrors.password = true;
        fieldErrors.repeatPassword = true;
      }

      if (password !== repeatPassword) {
        errors.push("Passwords do not match");
        fieldErrors.password = true;
        fieldErrors.repeatPassword = true;
      }
    }

    setInputErrors(fieldErrors); // aktualizacja błędów

    return errors;
  }

  return (
    <div className="wrapper">
      <h1>Sign Up</h1>
      <p className="error-message" style={{ color: "red" }}>
        {errorMessage}
      </p>
      <form id="form" onSubmit={handleSubmit} autoComplete="on">
        {/*add fieldset maybe*/}
        {/*react automatycznie escapuje, broni przed XSS przy poborze danych*/}
        <div className={inputErrors.firstname ? "incorrect" : ""}>
          <label htmlFor="firstname-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname-input"
            placeholder="Firstname"
            value={formData.firstname}
            onChange={handleChange}
          ></input>
        </div>

        <div className={inputErrors.lastname ? "incorrect" : ""}>
          <label htmlFor="lastname-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname-input"
            placeholder="Lastname"
            value={formData.lastname}
            onChange={handleChange}
          ></input>
        </div>

        <div className={inputErrors.email ? "incorrect" : ""}>
          <label htmlFor="email-input">
            <span>@</span>
          </label>
          <input
            type="email"
            name="email"
            id="email-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
          ></input>
        </div>

        <div className={inputErrors.password ? "incorrect" : ""}>
          <label htmlFor="password-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
            </svg>
          </label>
          <input
            type="password"
            name="password"
            id="password-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          ></input>
        </div>

        <div className={inputErrors.repeatPassword ? "incorrect" : ""}>
          <label htmlFor="repeatPassword-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
            </svg>
          </label>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword-input"
            placeholder="Repeat Password"
            value={formData.repeatPassword}
            onChange={handleChange}
            autoComplete="new-password"
          ></input>
        </div>
        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an Account? <Link to="/Login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;
