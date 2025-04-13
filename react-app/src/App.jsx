import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import EncryptionDecryption from "./components/EncryptionDecryption.jsx";
import History from "./components/history.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/encryption" element={<EncryptionDecryption />} />
      <Route path="/History" element={<History />} />
    </Routes>
  );
}

export default App;
