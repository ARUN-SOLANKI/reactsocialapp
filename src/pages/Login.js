import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import GoogleButton from "../components/googleButton";
import "./style.css";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userInputs, setUserInputs] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleLoginInputs = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, userInputs.email, userInputs.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="formContainer">
      <div>
        <h1>Log In</h1>
      </div>
      <div className="inputContainer">
        <label className="labelField">Email</label>
        <input
          className="inputField"
          name="email"
          type="email"
          onChange={handleLoginInputs}
        />
      </div>
      <div className="inputContainer">
        <label className="labelField">Password</label>
        <input
          className="inputField"
          name="password"
          type="text"
          onChange={handleLoginInputs}
        />
      </div>
      <div className="buttonContainer">
        <button onClick={handleLogin}>Login</button>
        <GoogleButton />
      </div>
      <div onClick={() => navigate("signup")}>
        <p>Not a User? signup here</p>
      </div>
    </div>
  );
}

export default Login;
