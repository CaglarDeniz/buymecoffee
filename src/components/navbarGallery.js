import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import Axios from "axios";

// import {deleteCookies} from "../Redirect"

//TODO: change link path to log in page after clicking log out

function ResponsiveAppBar(props) {
  const location = useLocation();
  const investorLinks = [`/investor/profile/${props.username}`, "/login"];
  const projectOwnerLinks = [
    `/projectOwner/profile/${props.username}`,
    "/login",
  ];
  const [photoLink, setPhotoLink] = React.useState(
    "https://banner2.cleanpng.com/20180921/fli/kisspng-clip-art-computer-icons-user-profile-portable-netw-5ba4ba1895c2d4.2769715015375222006134.jpg"
  );
  React.useEffect(() => {
    if (location.pathname.includes("/investor")) {
      Axios.get(`http://localhost:8080/api/developer/${props.username}`)
        .then((res) => {
          console.log("photos", res.data.data);
          setPhotoLink(res.data.data.photoLink);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        `http://localhost:8080/api/investor/single_investor/${props.username}`
      )
        .then((res) => {
          console.log("photos investor", res.data.data[0].photoLink);
          setPhotoLink(res.data.data[0].photoLink);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.username, location.pathname]);

  const settings = [
    {
      id: 0,
      item: "Profile",
    },
    {
      id: 1,
      item: "LogOut",
    },
  ];
  // const [isInvestor, setIsInvestor] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Box className="navbar-link-container">
        <img
          src={require("./img/BuyMeCoffee.png")}
          alt="BuyMeCoffeeLogo"
          className="brand-logo"
        />

        <Tooltip title="Open settings">
          <IconButton
            className="userprofile-container"
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
          >
            <Avatar alt="Profile Picture" src={photoLink} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => {
            return (
              <Link
                key={setting.id}
                className="nav-link"
                to={
                  props.mode === "investor"
                    ? investorLinks[setting.id]
                    : projectOwnerLinks[setting.id]
                }
                onClick={() => {
                  if (setting.id === 1) props.removeCookies("papaya");
                }}
              >
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Typography key={setting.id} textAlign="center">
                    {setting.item}
                  </Typography>
                </MenuItem>
              </Link>
            );
          })}
        </Menu>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
