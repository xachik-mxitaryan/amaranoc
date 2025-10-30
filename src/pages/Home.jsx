import React from "react";
import { auth } from "../firebase";

export default function Home() {
  const user = auth.currentUser;

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={() => { auth.signOut(); window.location.reload() }}>
        Logout
      </button>
    </div>
  );
}
