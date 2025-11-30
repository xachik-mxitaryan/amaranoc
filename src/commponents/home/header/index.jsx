import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch, CiGlobe } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false); 
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
    if (!user && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [navigate, location]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const languages = ["Հայերեն", "English", "Русский"]; 

  return (
    <nav className="w-full bg-white shadow-sm px-6 lg:px-12 py-3 flex items-center justify-between relative">
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
            className={`cursor-pointer relative pb-1 ${
              isActive(item.path) ? "text-black" : "hover:text-orange-400"
            }`}
          >
            {item.name}
            {isActive(item.path) && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-400 rounded-full"></span>
            )}
          </p>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-5 relative">
        <div className="relative">
          <CiGlobe
            className="text-2xl cursor-pointer"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
          />
          {langMenuOpen && (
            <div className="absolute top-10 right-0 bg-white border shadow-md rounded-md flex flex-col w-32 py-2 z-50">
              {languages.map((lang) => (
                <p
                  key={lang}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    console.log("Selected language:", lang);
                    setLangMenuOpen(false);
                  }}
                >
                  {lang}
                </p>
              ))}
            </div>
          )}
        </div>

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
            <div className="relative">
              <CiGlobe
                className="text-2xl cursor-pointer"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
              />
              {langMenuOpen && (
                <div className="absolute top-10 left-0 bg-white border shadow-md rounded-md flex flex-col w-32 py-2 z-50">
                  {languages.map((lang) => (
                    <p
                      key={lang}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        console.log("Selected language:", lang);
                        setLangMenuOpen(false);
                        setMenuOpen(false); 
                      }}
                    >
                      {lang}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <GoPeople onClick={logout} className="text-2xl cursor-pointer" />
          </div>

          <div className="flex items-center border rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="Որոնում"
              className="outline-none text-sm px-1 bg-transparent"
            />
            <CiSearch className="text-lg cursor-pointer" />
          </div>
        </div>
      )}
    </nav>
  );
}
