import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from './commponents/home/header'
import Cheap from './pages/Cheap'
import Footer from './commponents/home/footer'
import Service from "./pages/Service";
import Aboutus from "./pages/Aboutus";
import House from "./pages/House";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <BrowserRouter>
      <Header setInputValue={setInputValue} inputValue={inputValue} />
      <Routes>
        <Route path="/" element={<Home inputValue={inputValue} setInputValue={setInputValue} />} />
        <Route path="/sales" element={<Cheap />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/home/:id" element={<House />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
