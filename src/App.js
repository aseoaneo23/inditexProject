import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "./components/button";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Button />} />
        <Route path="/iago" element={<Button />} />
      </Routes>
    </BrowserRouter>
  );
}
