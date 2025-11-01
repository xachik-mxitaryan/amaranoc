import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { CiGlobe } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const linkItems = [
    { name: "Գլխավոր", path: "/" },
    { name: "Զեղչեր", path: "/sales" },
    { name: "Ծառայություններ", path: "/services" },
    { name: "Մեր մասին", path: "/about" },
  ];

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) navigate("/login");
  }, [navigate]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white shadow-sm px-6 lg:px-12 py-3 flex items-center justify-between">
      <img
        src="https://amaranoc.am/images/logo.svg"
        alt="logo"
        className="h-10 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="hidden md:flex items-center gap-10 font-medium text-gray-800">
        {linkItems.map((item) => (
          <p
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer relative pb-1 
              ${isActive(item.path) ? "text-black" : "hover:text-orange-400"}
            `}
          >
            {item.name}
            {isActive(item.path) && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-400 rounded-full"></span>
            )}
          </p>
        ))}
      </div>
      <div className="hidden md:flex items-center gap-5">
        <CiGlobe className="text-2xl cursor-pointer" />
        <GoPeople onClick={logout} className="text-2xl cursor-pointer" />

        <div className="flex items-center border rounded-full px-3 py-1">
          <input
            type="text"
            placeholder="Որոնում"
            className="outline-none text-sm px-1 bg-transparent"
          />
          <span className="text-lg cursor-pointer">🔍</span>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>
      {menuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-5 md:hidden z-50 font-medium">
          {linkItems.map((item) => (
            <p
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
              className={`cursor-pointer ${
                isActive(item.path)
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
              }`}
            >
              {item.name}
            </p>
          ))}

          <div className="flex items-center gap-4">
            <CiGlobe className="text-2xl cursor-pointer" />
            <GoPeople onClick={logout} className="text-2xl cursor-pointer" />
          </div>

          <div className="flex items-center border rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="Որոնում"
              className="outline-none text-sm px-1 bg-transparent"
            />
            <CiSearch className="text-lg cursor-pointer"/>
          </div>
        </div>
      )}
    </nav>
  );
}
