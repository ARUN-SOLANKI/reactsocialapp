import React from "react";
import "./style.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function GoogleButton() {
  const navigate = useNavigate();
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        if (user) {
          setDoc(doc(db, `users`, user.uid), {
            accessToken: user.accessToken,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            metadata: { ...user.metadata },
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              accessToken: user.accessToken,
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
            })
          );
          navigate("home");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <button onClick={googleLogin} className="googleButton">
      Login With Google
    </button>
  );
}

export default GoogleButton;
