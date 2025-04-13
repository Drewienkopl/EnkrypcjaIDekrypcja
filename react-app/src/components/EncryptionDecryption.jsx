import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/style.css";
import "../styles/encryptStyle.css";
import { useNavigate } from "react-router-dom";

function EncryptionDecryption() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //sprawdza czy jest zalogowany
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
    checkSession();
  }, [navigate]);

  const handleEncrypt = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/encryption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, decrypt: false }), //wyslanie wiadomosci do backendu
        credentials: "include",
      });

      if (response.status === 401) {
        setError("You must be logged to use Site");
        setTimeout(() => navigate("/login"), 1000);
      }

      if (!response.ok) throw new Error("Encryption Failure");

      const data = await response.json(); //odbiera zaszyfrowana wiadomosc
      setResult(data.result);
      setError(""); //czysci blad
    } catch (err) {
      setError("Encryption Error: " + err.message);
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/encryption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, decrypt: true }), //wyslanie zaszyfrowanej wiadomosci do backendu
        credentials: "include",
      });

      if (response.status === 401) {
        setError("You must be logged to use Site");
        setTimeout(() => navigate("/login"), 1000);
      }

      if (!response.ok) throw new Error("Decryption Failure");

      const data = await response.json(); //odbiera odszyfrowana wiadomosc
      setResult(data.result);
      setError(""); //czysci blad
    } catch (err) {
      setError("Decryption Error: " + err.message);
    }
  };

  //funkcja do wylogowania – przekierowuje na stronę logowania
  const handleLogout = async () => {
    await fetch("http://localhost:8080/api/v1/login/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <div className="wrapper">
      <header>
        <h1>Encryption & Decryption</h1>
      </header>

      <section id="inputTextarea">
        <label htmlFor="forEncryption">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="CurrentColor"
          >
            <path d="m430-418-10 58h68l-58-58ZM792-56 662-186q-38 39-84.5 65.5T480-80q-139-35-229.5-159.5T160-516v-172L56-792l56-56 736 736-56 56Zm-38-262L551-522q5-8 7-17.5t2-20.5q0-33-23.5-56.5T480-640q-11 0-20 2t-17 7L272-802l208-78 320 120v244q0 51-11.5 101T754-318Z" />
          </svg>
        </label>
        <textarea
          name="forEncryption"
          id="forEncryption"
          placeholder="Write message to encrypt"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </section>

      <div id="enscyptionDecryptionButtons">
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>

      <p className="error-message">{error}</p>

      {result && (
        <section id="readTextarea">
          <label htmlFor="encrypted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#CurrentColor"
            >
              <path d="M420-360h120l-23-129q20-10 31.5-29t11.5-42q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 23 11.5 42t31.5 29l-23 129Zm60 280q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z" />
            </svg>
          </label>
          <textarea
            readOnly
            name="encrypted"
            id="encrypted"
            value={result}
          ></textarea>
        </section>
      )}

      <div className="movingArea">
        {/* Przycisk do wylogowania */}
        <section className="logOutArea">
          <label htmlFor="goutButton">
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
            id="goutButton"
          >
            Log Out
          </button>
        </section>

        <section className="moveArea">
          <label htmlFor="histButton">
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
          <button
            onClick={handleHistory}
            className="historyButton"
            id="histButton"
          >
            History
          </button>
        </section>
      </div>
    </div>
  );
}

export default EncryptionDecryption;
