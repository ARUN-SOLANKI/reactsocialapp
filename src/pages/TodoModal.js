import React, { useState } from "react";
import "./style.css";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { db } from "../firebaseConfig";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function TodoModal({ handleClose, open, setOpen }) {
  const [loading, setloading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    rate: "",
  });
  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleAdd = () => {
    if (inputs.title) {
      const { uid } = JSON.parse(localStorage.getItem("user"));
      const ref = addDoc(collection(db, "users", uid, "products"), {
        ...inputs,
      });

      if (ref) {
        alert("succefully added new product");
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <div className="inputContainer">
          <label className="labelField">title</label>
          <input
            name="title"
            className="inputField"
            type="text"
            onChange={handleInputs}
          />
        </div>
        <div className="inputContainer">
          <label className="labelField">description</label>
          <input
            name="description"
            className="inputField"
            type="email"
            onChange={handleInputs}
          />
        </div>

        <div className="inputContainer">
          <label className="labelField">rate</label>
          <input
            name="rate"
            className="inputField"
            type="text"
            onChange={handleInputs}
          />
        </div>
        <div className="buttonContainer">
          <button onClick={handleAdd} className="">
            {loading ? "please wait..." : "Add Todo"}
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default TodoModal;
