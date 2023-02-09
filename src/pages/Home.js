import { Grid, TextField, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader/index.js";
import UserCard from "../components/userComponent.js";
import { db } from "../firebaseConfig";
import "./style.css";
import TodoModal from "./TodoModal";

function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allUsersData, setAllUsersData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const q = collection(db, "users");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      const postData = [];
      querySnapshot.forEach(async (doc) => {
        data.push(doc.data());
        const collRef = collection(db, "users", doc.data().uid, "posts");
        const d = await getDocs(collRef);
        await d.forEach((hoc) => {
          postData.push(hoc.data());
        });
        setPostsData(postData);
      });
      setUsersData(data);
    });
    return unsubscribe;
  };

  useEffect(() => {
    setAllUsersData(usersData);
  }, [usersData]);

  return (
    <Grid
      container
      justifyContent="center"
      style={{ background: "#F0F2F5", padding: 20 }}
    >
      <Grid xs={4}>
        {postsData?.map((post) => {
          return <HomeHeader post={post} />;
        })}
      </Grid>
      <Grid xs={4} ml={5} mt={2}>
        <Grid xs={8} style={{ background: "#fff", padding: 10 }}>
          <TextField
            onChange={(e) => {
              if (e.target.value != "") {
                const data = usersData.filter((item) => {
                  return (
                    item.email.includes(e.target.value) ||
                    item.displayName.includes(e.target.value)
                  );
                });
                setAllUsersData(data);
              } else {
                setAllUsersData(usersData);
              }
            }}
            fullWidth
            placeholder="Search..."
            style={{ background: "#fff" }}
          />
          {allUsersData?.map((user) => {
            return (
              <>
                <UserCard user={user} />
              </>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
