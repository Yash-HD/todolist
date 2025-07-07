// src/pages/Login.js
import React, { useState } from "react";
import { auth } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/todo");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/todo");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/todo");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="login-box">
      <h1>TO-DO-LIST</h1>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      /><br />

      <button onClick={login}>Login</button>
      <button onClick={signup}>Sign Up</button>

      <hr />

      <button onClick={googleLogin}>Sign in with Google</button>

      <p id="loginError">{errorMsg}</p>
    </div>
  );
};

export default Login;
