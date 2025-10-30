import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) navigate("/login");
  }, [navigate]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
