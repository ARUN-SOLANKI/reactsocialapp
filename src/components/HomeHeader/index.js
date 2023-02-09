import { Grid, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import c from "../../assets/posts/c.png";
import ak from "../../assets/posts/ak.jpg";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

function HomeHeader({ post }) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    getUserDetails();
  }, [post]);

  const getUserDetails = async () => {
    try {
      const collRef = await doc(db, "users", post?.uid);
      const q = await getDoc(collRef);
      setUserDetails(q.data());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      mt={2}
      container
      style={{ background: "#fff", padding: 10, borderRadius: 10 }}
    >
      <Grid container alignItems="center">
        <Box>
          <img
            src={userDetails?.photoURL}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
          />
        </Box>
        <Box sx={{ marginLeft: 2 }}>
          <Typography style={{ fontSize: 18, fontWeight: 600 }}>
            {userDetails?.displayName}
          </Typography>
          <Typography style={{ color: "#212121" }}>
            january 26 at 3:24 pm
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Grid mt={1} mb={1}>
          <Typography>{post?.aboutPost}</Typography>
        </Grid>
        <Grid mt={2}>
          <img src={post?.photoURL} style={{ height: 600, width: "100%" }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomeHeader;
