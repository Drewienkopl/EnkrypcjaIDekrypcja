import React, { useState } from "react";
import "../styles/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    //logowanie pomyslne
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", //kluczowe dla sesji
      });

      if (!response.ok) {
        const status = response.status;
        const errorText = await response.text();

        if (status === 401) {
          throw new Error("Account does not exist or password is incorrect");
        }

        throw new Error(errorText || "Login failed");
      }

      const data = await response.text(); // lub .json() jeśli zwracasz JSON
      console.log("Zalogowano:", data);
      navigate("/encryption");
    } catch (err) {
      console.error("Błąd logowania:", err);
      setErrorMessage(err.message);
    }
  };

  //funkcja sprawdzajaca bledy w Login
  function getSignupFormErrors({ email, password }) {
    let errors = [];
    let fieldErrors = {};

    if (!email) {
      errors.push("Email is required");
      fieldErrors.email = true;
    }

    //wymagania co do hasla
    if (!password) {
      errors.push("Password is required");
      fieldErrors.password = true;
    } else {
      if (password.length < 8) {
        errors.push("Password must have at least 8 characters");
        fieldErrors.password = true;
        fieldErrors.repeatPassword = true;
      }
    }

    setInputErrors(fieldErrors); //aktualizacja bledow

    return errors;
  }

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <p className="error-message" style={{ color: "red" }}>
        {errorMessage}
      </p>
      <form id="form" onSubmit={handleSubmit} autoComplete="on">
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
            autoComplete="current-password"
          ></input>
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        New here?<Link to="/SignUp">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
