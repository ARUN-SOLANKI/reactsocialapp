import { Box, Modal } from "@mui/material";
import React from "react";

function PostContainer({ post, setSelectedPost, setOpenPost }) {
  return (
    <>
      <Box
        onClick={() => {
          setSelectedPost(post);
          setOpenPost(true);
        }}
      >
        <img src={post?.photoURL} style={{ height: 300, width: 300 }} />
      </Box>
    </>
  );
}

export default PostContainer;
