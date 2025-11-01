import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Home() {
  

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
