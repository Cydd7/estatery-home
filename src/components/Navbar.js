import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  AppBar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  ListItemIcon,
  Container,
} from "@mui/material";

import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import NightShelterRoundedIcon from "@mui/icons-material/NightShelterRounded";

function Navbar({ navSticky, user, reloadUser, propertyData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    reloadUser();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log(window);

  return (
    // This Box is solely for eliminating overflow
    <Box className="Navbar-box">
      {/* This Box is responsible for the animation effects */}
      <Box
        maxWidth="100vw"
        className={`Navbar-box-anim ${navSticky && "Nav-sticky"}`}
      >
        {/* This Box is responsible for maintaining the maxwidth*/}
        <Container>
          {/* This Box is responsible for the padding so that the shadow is visible*/}
          <AppBar
            elevation={0}
            position="sticky"
            sx={{ backgroundColor: "#fff0", padding: "10px 0px" }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 0px",
                height: "35px",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  position: "absolute",
                  left: 0,
                }}
                to="/"
              >
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontFamily: "between-days",
                    fontWeight: 800,
                    color: "#392c79",
                    cursor: "pointer",
                  }}
                >
                  Estatery
                </Typography>
              </Link>

              {window.innerWidth > 768 && (
                <img
                  style={{ height: "35px" }}
                  src={require("../assets/images/floral3.png")}
                  alt=""
                />
              )}

              <Box sx={{ position: "absolute", right: 0 }}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 55, height: 55 }}
                    src={require("../assets/images/avatars/File 1.jpg")}
                  />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  sx={{
                    top: "-5px !important",
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      backgroundColor: "rgb(242, 239, 255)",
                      fontFamily: "Roboto",

                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 28,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        backgroundColor: "rgb(242, 239, 255)",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "300px",
                      padding: "10px 0",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          float: "right",
                          color: "#392c79",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 3 }}>
                      {Object.keys(user).length !== 0 && user.name}
                      <div style={{ fontSize: "0.8rem" }}>
                        {Object.keys(user).length !== 0 && user.email}
                      </div>
                    </Box>
                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px 0",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <BookmarkRoundedIcon
                        fontSize="small"
                        sx={{
                          float: "right",
                          margin: "0 10px",
                          color: "#392c79",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 3 }}>Saved properties</Box>
                  </Box>

                  {/* <Box
                    sx={{ backgroundColor: "rgba(0,0,0,1)", margin: "10px" }}
                  > */}
                  {Object.keys(user).length !== 0 &&
                    user.savedProperties.map((item) => {
                      const property = propertyData.find((prop) => {
                        return prop._id === item;
                      });

                      console.log(property);

                      return (
                        <Link
                          key={item}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                          to={{
                            pathname: `/reserve/${item}/default`,
                          }}
                        >
                          <MenuItem
                            sx={{
                              height: "60px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {property !== undefined &&
                              property.hasOwnProperty("imageurl") && (
                                <>
                                  <Box sx={{ flex: 1 }}>
                                    <Avatar
                                      variant="rounded"
                                      sx={{ width: 60, height: 40 }}
                                      src={
                                        property.imageurl.rawurl +
                                        "&fm=jpg&w=100&fit=max"
                                      }
                                    />
                                  </Box>

                                  <Typography
                                    sx={{
                                      flex: 3,
                                      textDecoration: "none",
                                      color: "black",
                                    }}
                                  >
                                    {property.name}
                                  </Typography>
                                </>
                              )}
                          </MenuItem>
                        </Link>
                      );
                    })}
                  {/* </Box> */}

                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px 0",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <NightShelterRoundedIcon
                        fontSize="medium"
                        sx={{
                          float: "right",
                          margin: "0 10px",
                          color: "#392c79",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 3 }}>Bookings</Box>
                  </Box>

                  {Object.keys(user).length !== 0 &&
                    user.bookedProperties.map((item) => {
                      const property = propertyData.find((prop) => {
                        return prop._id === item.propid;
                      });
                      return (
                        property !== undefined &&
                        property.hasOwnProperty("imageurl") && (
                          <Link
                            key={item._id}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                            to={{
                              pathname: `/success/${property._id}/${
                                item.months
                              }/${item.datesstr}/${false}`,
                            }}
                          >
                            <MenuItem sx={{ height: "60px", display: "flex" }}>
                              <Box sx={{ flex: 1 }}>
                                <Avatar
                                  variant="rounded"
                                  sx={{ width: 60, height: 40 }}
                                  src={
                                    property.imageurl.rawurl +
                                    "&fm=jpg&w=100&fit=max"
                                  }
                                />
                              </Box>

                              <Typography
                                sx={{
                                  flex: 3,
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {property.name}
                              </Typography>
                            </MenuItem>
                          </Link>
                        )
                      );
                    })}
                </Menu>
              </Box>
            </Box>
          </AppBar>
        </Container>
      </Box>
    </Box>
  );
}

export default Navbar;
