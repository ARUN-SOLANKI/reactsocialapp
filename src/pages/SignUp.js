import React, { useState } from "react";
import GoogleButton from "../components/googleButton";
import "./style.css";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlesignUpInputs = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, userInputs.email, userInputs.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setDoc(doc(db, `users`, user.uid), {
            accessToken: user.accessToken,
            displayName: userInputs.username,
            email: user.email,
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            metadata: { ...user.metadata },
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="formContainer">
      <div>
        <h1>Sign Up</h1>
      </div>
      <div className="inputContainer">
        <label className="labelField">User Name</label>
        <input
          name="username"
          className="inputField"
          type="text"
          onChange={handlesignUpInputs}
        />
      </div>
      <div className="inputContainer">
        <label className="labelField">Email</label>
        <input
          name="email"
          className="inputField"
          type="email"
          onChange={handlesignUpInputs}
        />
      </div>

      <div className="inputContainer">
        <label className="labelField">Password</label>
        <input
          name="password"
          className="inputField"
          type="password"
          onChange={handlesignUpInputs}
        />
      </div>
      <div className="buttonContainer">
        <button onClick={handleSignUp} className="">
          {loading ? "please wait..." : "signUp"}
        </button>
        <GoogleButton />
      </div>
      <div onClick={() => navigate("signup")}>
        <p>already a user? login here</p>
      </div>
    </div>
  );
}

export default SignUp;
