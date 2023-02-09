import { Grid, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../components/userComponent.js";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Chat() {
  const [allUsersData, setAllUsersData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);

  const [usersData, setUsersData] = useState([]);
  const [isUserChoosed, setIsUserChoosed] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(data);
  }, []);

  const getAllUsers = async () => {
    setLoading(true);
    const q = collection(db, "users");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllUsersData(data);
      setUsersData(data);
      setLoading(false);
    });
    return unsubscribe;
  };

  return (
    <>
      {!loading ? (
        <Grid
          xs={12}
          display="flex"
          flexDirection="row"
          style={{ background: "#F0F2F5" }}
        >
          <Grid xs={3} style={{ background: "#ccc", padding: 10 }}>
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
                  <UserCard
                    user={user}
                    onClick={() => {
                      setCurrentUser(user);
                      setIsUserChoosed(true);
                    }}
                  />
                </>
              );
            })}
          </Grid>
          {isUserChoosed ? (
            <Grid
              xs={9}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              style={{ padding: 10, height: "90vh" }}
            >
              <div className="container">
                {currentUser?.photoURL ? (
                  <img src={currentUser?.photoURL} className="imgtag" />
                ) : (
                  <div className="noimage">{"A"}</div>
                )}
                <div className="details">
                  <h3 className="name">{currentUser?.displayName}</h3>
                  <h4 className="email">{currentUser?.email}</h4>
                </div>
              </div>
              <Grid display="flex" flexDirection="row">
                <TextField fullWidth placeholder="write here..." />
                <Button variant="contained" endIcon={<SendIcon />}>
                  Send
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ padding: 10, height: "90vh", width: "80%" }}
            >
              <div>please click a user to begin chat</div>
            </Grid>
          )}
        </Grid>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          // onClick={()=>}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

export default Chat;
