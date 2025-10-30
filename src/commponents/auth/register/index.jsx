import React, { useState } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Գրանցում
        </h2>

        <form onSubmit={registerUser} className="space-y-4">
          <input
            type="text"
            placeholder="Անուն Ազգանուն"
            className="w-full border rounded-lg p-3 text-gray-700"
          />
          <input
            type="tel"
            placeholder="Հեռախոսահամար"
            className="w-full border rounded-lg p-3 text-gray-700"
          />
          <input
            type="email"
            placeholder="Էլ. հասցե"
            className="w-full border rounded-lg p-3 text-gray-700"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Գաղտնաբառ"
            className="w-full border rounded-lg p-3 text-gray-700"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full font-semibold transition"
          >
            Գրանցվել
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">կամ</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full border border-orange-400 text-orange-500 py-3 rounded-full flex justify-center items-center gap-2 font-medium">
          <FcGoogle className="text-xl" />
          Գրանցվել Google-ի միջոցով
        </button>
        
        <p className="text-gray-600 mt-5 text-sm">
          Արդեն գրանցված եք?{" "}
          <Link to="/login" className="text-orange-500 font-semibold">
            Մուտք
          </Link>
        </p>
      </div>
    </div>
  );
}
