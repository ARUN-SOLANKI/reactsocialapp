import {
  Grid,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { db, storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import UserDetails from "../components/UserDetails";
import UploadButton from "../components/UploadButton";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import a from "../assets/posts/a.png";
import c from "../assets/posts/c.png";
import { PhotoCamera } from "@mui/icons-material";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import PostModal from "../components/PostModal";
import PostContainer from "../components/PostContainer";
import PopUpModal from "../components/PopUpModal";

function Post() {
  const [userDetails, setUserDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  useEffect(() => {
    getUserPost();
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const collRef = await collection(db, "users");
      const q = await query(
        collRef,
        where("uid", "==", JSON.parse(localStorage.getItem("user")).uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPost = async () => {
    const collRef = await collection(
      db,
      "users",
      JSON.parse(localStorage.getItem("user")).uid,
      "posts"
    );
    const unsubscribe = onSnapshot(collRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllPosts(data);
    });
  };

  const handleEdit = (key, value) => {
    try {
      setDoc(
        doc(db, `users`, JSON.parse(localStorage.getItem("user")).uid),
        {
          [key]: value,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allPosts);

  return (
    <>
      <Grid container style={{ padding: 10, background: "#F0F2F5" }}>
        <Grid
          item
          xs={3}
          display="flex"
          alignItems="center"
          flexDirection="column"
          style={{
            marginTop: 20,
            border: "1px solid #efefef",
            padding: 10,
            background: "#fff",
          }}
        >
          <Box
            style={{
              width: 150,
              height: 150,
              border: `1px solid #efefef`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 50,
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <img
              src={userDetails?.photoURL}
              style={{
                width: 150,
                height: 150,
                border: `1px solid #efefef`,
                borderRadius: "50%",
              }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              style={{
                background: "#efefef",
                position: "absolute",
              }}
              onChange={async (e) => {
                const file = e.target.files[0];
                const dp = ref(storage, `dp/${e.target.files[0].name}`);
                uploadBytes(dp, file).then((snapshot) => {
                  getDownloadURL(dp).then(async (url) => {
                    if (url) {
                      await setDoc(
                        doc(
                          db,
                          `users`,
                          JSON.parse(localStorage.getItem("user")).uid
                        ),
                        {
                          photoURL: url,
                        },
                        { merge: true }
                      );
                    }
                  });
                });
              }}
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Box>
          <UserDetails
            isEditable
            name="displayName"
            label="name"
            value={userDetails?.displayName}
            Icon={PersonIcon}
            handleEdit={handleEdit}
          />
          <UserDetails
            isEditable
            name="about"
            label="About"
            value={
              userDetails?.about ? userDetails?.about : "Nothing special about"
            }
            Icon={InfoIcon}
            handleEdit={handleEdit}
          />
          <UserDetails
            label="Email"
            name="email"
            value={userDetails?.email}
            Icon={EmailIcon}
          />
          <UserDetails
            isEditable
            label="Phone"
            name="phoneNumber"
            value={
              userDetails?.phoneNumber ? userDetails?.phoneNumber : "1245554334"
            }
            Icon={PhoneIcon}
            handleEdit={handleEdit}
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: 150 }}
            onClick={() => setOpen(true)}
          >
            Add More Posts
          </Button>
        </Grid>
        <Grid
          xs={8}
          style={{
            marginTop: 20,
            border: "1px solid #efefef",
            padding: 10,
            background: "#fff",
          }}
          ml={3}
        >
          <Box>
            {allPosts.length ? (
              <Grid container justifyContent="space-evenly" flexWrap="wrap">
                {allPosts?.map((post) => {
                  return (
                    <PostContainer
                      post={post}
                      setSelectedPost={setSelectedPost}
                      setOpenPost={setOpenPost}
                    />
                  );
                })}
              </Grid>
            ) : (
              <Typography>Loading......</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <PostModal userDetails={userDetails} open={open} setOpen={setOpen} />
      <PopUpModal open={openPost} setOpen={setOpenPost} post={selectedPost} />
    </>
  );
}

export default Post;
