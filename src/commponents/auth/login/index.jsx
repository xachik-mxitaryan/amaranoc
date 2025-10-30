import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/"); 
    });
    return unsubscribe;
  }, [navigate]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (error) {
      alert("Մուտքը ձախողվեց ❌");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white">
      <div className="w-[33%] max-w-md text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Մուտք</h2>

        <div className="flex items-center pb-5 y-4">
          <hr className="flex-grow border-gray-300" />
          <hr className="flex-grow border-gray-300" />
        </div>
        <form onSubmit={loginUser} className="space-y-4">
          <input
            type="email"
            placeholder="Էլ. հասցե կամ հեռախոսահամար"
            className="w-full border rounded-lg p-3 text-gray-700"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Գաղտնաբառ"
            className="w-full border rounded-lg p-3 text-gray-700"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-gray-700 text-sm">Մուտք գործել գաղտնաբառով՝</p>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full font-semibold transition"
          >
            Մուտք
          </button>
        </form>
        <div className="flex items-center gap-3 my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">կամ</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full border border-orange-400 text-orange-500 py-3 rounded-full flex justify-center items-center gap-2 font-medium">
          <FcGoogle className="text-xl" />
          Մուտք Google-ի միջոցով
        </button>

        <p className="text-gray-600 mt-5 text-sm">
          Դեռ գրանցված չէ՞ք?{" "}
          <Link to="/register" className="text-orange-500 font-semibold">
            Գրանցվել
          </Link>
        </p>
      </div>
    </div>
  );
}
