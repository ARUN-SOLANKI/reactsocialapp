import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function UserCard({ user, onClick }) {
  const navigate = useNavigate();
  return (
    <div className="container" onClick={onClick}>
      {user?.photoURL ? (
        <img src={user?.photoURL} className="imgtag" />
      ) : (
        <div className="noimage">{user?.displayName[0]?.toUpperCase()}</div>
      )}
      <div className="details">
        <h3 className="name">{user?.displayName}</h3>
        <h4 className="email">{user?.email}</h4>
      </div>
    </div>
  );
}

export default UserCard;
