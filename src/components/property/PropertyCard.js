import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Paper, Typography, Divider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import { estatery } from "../../api/axios-instances";

import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";

import {
  PropertyImageSkeleton,
  PropertyTextSkeleton,
} from "./PropertyCardSkeleton";
import "./PropertyCard.css";

function PropertyCard({ property, checkoutDate, user, setUser }) {
  const [url, setUrl] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [saved, setSaved] = React.useState(
    Object.keys(user).length !== 0 &&
      user.savedProperties.some((id) => id === property._id)
  );

  useEffect(() => {
    if (user !== undefined && Object.keys(user).length !== 0) {
      setUser((prev) => {
        if (saved) {
          if (prev.savedProperties.some((id) => id === property._id)) {
            return prev;
          }
        }
        return {
          ...prev,
          savedProperties: saved
            ? [...prev.savedProperties, property._id]
            : prev.savedProperties.filter((id) => id !== property._id),
        };
      });
    }
  }, [saved, setUser]);

  async function sendReq(checked) {
    if (checked) {
      try {
        const result = await estatery.patch(`users/save/${user._id}`, {
          savedPropertyId: property._id,
        });
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await estatery.patch(
          `users/unsave/${user._id}/${property._id}`
        );
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const checked = event.target.checked;
    console.log(checked);
    sendReq(checked);
    setSaved(checked);
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    try {
      setUrl(property.imageurl.rawurl + "&fm=jpg&fit=crop&w=600&q=80&fit=max");
      // console.log(property);
    } catch (error) {
      console.log(error);
    }
  }, [property]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={2} position="relative">
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: window.innerWidth < 600 ? "400px" : "200px",
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
          }}
        >
          {imageLoaded ? (
            <div className="house-img-mask">
              <div className="house-img-btn">
                {property._id !== "0" && (
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                      fontFamily:
                        "apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                    }}
                    to={{
                      pathname: `/reserve/${property._id}/${checkoutDate.format(
                        "YYYY-MM-DD"
                      )}`,
                    }}
                  >
                    RENT NOW
                  </Link>
                )}
              </div>
            </div>
          ) : (
            // <img
            //   style={{
            //     position: "absolute",
            //     top: 0,
            //     left: 0,
            //     width: "100%",
            //     height: "100%",
            //     zIndex: 30,
            //     background:
            //       "linear-gradient(167deg, #0000 0%, rgba(255,255,255,0.5) 50%, #0000 100%)",
            //   }}
            //   src={require("../assets/images/reserved-prop.png")}
            //   alt="reserved"
            // />

            // Skeleton for house image
            <PropertyImageSkeleton />
          )}

          <img
            className="house-img"
            src={url}
            alt="property"
            onLoad={() => {
              setImageLoaded(true);
            }}
          />
        </Box>

        <Box padding={2}>
          {property._id !== "0" ? (
            <>
              <Typography
                sx={{
                  fontFamily: "between-days",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                }}
                color="primary"
                variant="h6"
                component="span"
              >
                ${property.pricestr}
              </Typography>
              <Typography
                sx={{ fontFamily: "lyon" }}
                color="secondary"
                variant="p"
                component="span"
              >
                /month
              </Typography>

              <Typography
                sx={{ fontFamily: "between-days", fontWeight: "500" }}
                marginY={1}
                variant="h5"
                component="h2"
              >
                {property.name}
              </Typography>

              <Typography
                sx={{ padding: "20px 30px 20px 0", fontFamily: "lyon" }}
                height={30}
                color="secondary"
                variant="p"
                component="p"
              >
                {property.address}
              </Typography>

              <Divider light variant="middle" sx={{ margin: "10px 0" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <BedOutlinedIcon color="primary" />
                  <Typography
                    sx={{ fontSize: "15px", padding: "4px" }}
                    color="secondary"
                    component="span"
                    variant="p"
                  >
                    {property.bed} Beds
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <BathtubOutlinedIcon color="primary" />
                  <Typography
                    sx={{ fontSize: "15px", padding: "4px" }}
                    color="secondary"
                    component="span"
                    variant="p"
                  >
                    {property.bath} Bathrooms
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <CropSquareRoundedIcon color="primary" />
                  <Typography
                    sx={{ fontSize: "15px", padding: "4px" }}
                    color="secondary"
                    component="span"
                    variant="p"
                  >
                    {property.area} sqm.
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <PropertyTextSkeleton />
          )}

          <div className="fav-btn">
            <Checkbox
              {...label}
              icon={<BookmarkBorderRoundedIcon />}
              checkedIcon={<BookmarkRoundedIcon />}
              checked={saved}
              onChange={handleChange}
            />
          </div>
        </Box>
      </Paper>
    </Grid>
  );
}

export default PropertyCard;
