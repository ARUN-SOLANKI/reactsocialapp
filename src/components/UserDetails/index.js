import { Grid, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

function UserDetails({ label, value, isEditable, Icon, handleEdit, name }) {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <Grid container style={{ background: "#efefef", marginTop: 15 }}>
      <Icon style={{ height: 40, width: 40 }} />
      <Box
        style={{
          display: "flex",
          marginLeft: 13,
          justifyContent: "space-between",
          width: "83%",
        }}
      >
        <Grid>
          <p>{label}</p>
          {isEdit ? (
            <Box style={{ display: "flex", width: "100%" }}>
              <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
              />
              <Button
                onClick={() => {
                  setIsEdit(false);
                  handleEdit(name, inputValue);
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <h3>{value}</h3>
          )}
        </Grid>
        {isEditable && !isEdit ? (
          <EditIcon
            onClick={() => {
              setIsEdit(true);
            }}
          />
        ) : null}
      </Box>
    </Grid>
  );
}

export default UserDetails;
