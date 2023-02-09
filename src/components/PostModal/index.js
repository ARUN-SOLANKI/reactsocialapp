import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import c from "../../assets/posts/c.png";
import React, { useState } from "react";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 4,
  paddingBottom: 4,
};

function PostModal({ open, setOpen, userDetails }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");

  const [inputValue, setInputValue] = useState("");

  const handlePost = async () => {
    setLoading(true);
    const dp = ref(storage, `posts/${post?.name}`);
    try {
      uploadBytes(dp, post).then((snapshot) => {
        getDownloadURL(dp).then(async (url) => {
          if (url) {
            console.log(url);
            await addDoc(
              collection(
                db,
                `users`,
                JSON.parse(localStorage.getItem("user")).uid,
                "posts"
              ),
              {
                aboutPost: inputValue,
                photoURL: url,
                uid: JSON.parse(localStorage.getItem("user")).uid,
                created: new Date(),
              },
              { merge: true }
            );
            setImage("");
            setInputValue("");
            setPost("");
            setLoading(false);
          }
        });
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 2,
            paddingBottom: 2,
          }}
        >
          <Typography></Typography>
          <Typography
            style={{ fontSize: 20, fontWeight: 700, color: "#212121" }}
          >
            create Post
          </Typography>
          <Typography
            style={{ fontSize: 20, fontWeight: 700, color: "#212121" }}
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </Typography>
        </Box>
        <Box>
          <hr></hr>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={userDetails?.photoURL}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
            <Typography
              style={{ marginLeft: 10, fontSize: 24, fontWeight: 600 }}
            >
              {userDetails?.displayName}
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder={`What's on your mind, ${userDetails?.displayName}?`}
            style={{ marginTop: 15, border: "none", outline: "none" }}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />

          <Button
            endIcon={
              image ? (
                <img src={image} style={{ heigth: 30, width: 30 }} />
              ) : (
                <PhotoSizeSelectActualIcon />
              )
            }
            component="label"
            fullWidth
            style={{ border: "1px solid #ccc", padding: 15, marginTop: 15 }}
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setPost(event.target.files[0]);
                setImage(URL.createObjectURL(event.target.files[0]));
              }
            }}
          >
            {image ? "choose different" : "Add to your post"}
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{ border: "1px solid #ccc", padding: 15, marginTop: 15 }}
            disabled={!image}
            onClick={handlePost}
          >
            {loading ? "Loading..." : "Post"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModal;
