import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/style.css";
import "../styles/encryptStyle.css";
import { useNavigate } from "react-router-dom";

function History() {
  const [message, setMessage] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/encryption/history",
          {
            method: "GET",
            credentials: "include", //kluczowe dla sesji
          }
        );

        if (response.status === 401) {
          setError("You must be logged to use Site");
          setTimeout(() => navigate("/login"), 1000);
        }

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        const data = await response.json();
        setMessage(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const checkSession = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/session/check",
          {
            credentials: "include", //kluczowe dla sesji
          }
        );

        if (response.status === 401) {
          setError("You must be logged to use Site");
          setTimeout(() => navigate("/login"), 1000);
        }

        if (!response.ok) {
          navigate("/login");
        }
      } catch (err) {
        print("blad logowania: " + err);
        navigate("/login");
      }
    };

    fetchHistory();
    checkSession();
  }, [navigate]);

  //funkcja do wylogowania – przekierowuje na stronę logowania
  const handleLogout = async () => {
    await fetch("http://localhost:8080/api/v1/login/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/encryption");
  };

  return (
    <div className="wrapper">
      <header>
        <h1>Encrypted Messages History</h1>
      </header>
      {error && <p className="error-message">{error}</p>}
      {!error && message.length === 0 && <p>No Messages Found</p>}
      {!error && message.length > 0 && (
        <ul className="message-list">
          {message.map((msg) => (
            <li key={msg.id}>
              <strong>Encrypted: </strong>
              <br />
              {msg.encryptedText}
              <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <div className="movingArea">
        {/* Przycisk do wylogowania */}
        <section className="logOutArea">
          <label htmlFor="outButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="CurrentColor"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </label>
          <button
            onClick={handleLogout}
            className="logoutButton"
            id="outButton"
          >
            Log Out
          </button>
        </section>

        <section className="moveArea">
          <label htmlFor="baButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#CurrentColor"
            >
              <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
            </svg>
          </label>
          <button onClick={handleBack} className="backButton" id="baButton">
            Go Back
          </button>
        </section>
      </div>
    </div>
  );
}
export default History;
