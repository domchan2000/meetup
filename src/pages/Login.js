import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../store/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import classes from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/all");
  }, [user, loading, navigate]);

  if (loading) {
    <section>
        <p>Loading...</p>
    </section>
    return;
  }

  return (
       <div className={classes.container}>
        <div className={classes.form}>
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
          <button onClick={() => logInWithEmailAndPassword(email, password)}>
            Login
          </button>
          <button onClick={signInWithGoogle}>Login with Google</button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>     
  );
};
export default Login;