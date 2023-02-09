import { Box, Modal, Grid, Typography } from "@mui/material";
import React from "react";
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

function PopUpModal({ post, open, setOpen }) {
  console.log(post?.created?.toDate(), "=====");
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid sx={style}>
        <Grid container justifyContent="center" alignItems="center">
          <img src={post?.photoURL} style={{ height: 400, width: 400 }} />
        </Grid>
        <Grid>
          <Typography>about Post : {post?.aboutPost}</Typography>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default PopUpModal;
