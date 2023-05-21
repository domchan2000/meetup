import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../store/firebase";
import "./Register.css";
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
  
    const register = () => {
      if (!name) alert("Please enter name");
      registerWithEmailAndPassword(name, email, password);
    };
  
    useEffect(() => {
      if (loading) return;
      if (user) navigate("/all");
    }, [user, loading, navigate]);
  
    return (
      <div className="container">
        <div className="form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={register}>Register</button>
          <button className="register__google" onClick={signInWithGoogle}>
            Register with Google
          </button>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </div>
      </div>
    );
  }
  
  export default Register;