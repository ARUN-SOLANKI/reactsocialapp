import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Grid } from "@mui/material";

// import { Header } from "./Header";
import chaticon from "../assets/chat.png";
import homeicon from "../assets/home.png";
import posticon from "../assets/post.png";
import SideDrawer from "../components/SideDrawer";

const NAV_ITEMS = [
  {
    icon: homeicon,
    iconSelected: homeicon,
    text: "Home",
    path: "../home",
    id: "home",
  },
  {
    icon: chaticon,
    iconSelected: chaticon,
    text: "Chat",
    path: `chats`,
    id: "chats",
  },
  {
    icon: posticon,
    iconSelected: posticon,
    text: "Create Post",
    path: `createpost`,
    id: "create-post",
  },
];

export const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* <Header onHoverLogo={() => setCollapsed(!collapsed)} /> */}
      <div>ajsbcjsdhjv</div>
      <Grid container style={{ flexWrap: "nowrap", overflow: "auto" }}>
        <Grid item>
          <SideDrawer collapsed={collapsed} navItems={NAV_ITEMS} />
        </Grid>

        <Grid
          item
          style={{
            flexGrow: 1,
            overflow: "auto",
            height: "100vh",
            paddingTop: 41,
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};
