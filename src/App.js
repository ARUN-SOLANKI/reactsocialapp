import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import UserDetails from "./pages/UserDetails";
import Chat from "./pages/Chat";
import Post from "./pages/Post";
import { HomeLayout } from "./Layout/HomeLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="chats" element={<Chat />} />
          <Route path="createpost" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
