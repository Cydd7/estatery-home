import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";

function ReserveImage({ property, passed }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // ! Not responve, major lapse in design

  useEffect(() => {
    try {
      console.log(property);
      setImageUrl(
        property.imageurl.rawurl + "&fm=jpg&fit=crop&w=1080&q=80&fit=max"
      );
    } catch (error) {
      console.log(error);
    }
  }, [property]);

  console.log(imageUrl);

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          position: "relative",
          borderRadius: "10px",
          width: "100%",
          height: window.innerWidth < 900 ? "50vw" : "100%",
          overflow: "hidden",
          minHeight: "30vw",
        }}
      >
        {property._id !== 0 && (
          <img
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={imageUrl}
            alt="property"
            onLoad={() => {
              console.log("loaded");
              setImageLoaded(true);
            }}
          />
        )}

        {!imageLoaded && (
          <Skeleton
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              // height: "14vw",
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
              zIndex: "20",
              bgcolor: "grey.300",
            }}
            animation="wave"
            variant="rectangular"
            // width={"100%"}
            // height={"100%"}
            // height={"14vw"}
          />
        )}
      </Paper>
      {passed && imageLoaded && (
        <Box
          sx={{
            position: "absolute",
            top: "40px",
            left: "0px",
            height: "100px",
            transformOrigin: "50% 2%",
            transform: "rotate(10deg) scale(1.4)",
            animation: "hanging 3s ease-in-out infinite",
          }}
        >
          <img
            style={{
              height: "100%",
              filter: "saturate(80%) drop-shadow(0 0 7px black)",
            }}
            src={require("../../assets/images/hanging-board2.png")}
            alt="Booked"
          />
          <Typography
            sx={{
              position: "absolute",
              top: "35%",
              left: "5%",
              color: "#7e1e00",
              fontFamily: "bark",
              fontSize: "1.6rem",
            }}
          >
            Booked
          </Typography>
        </Box>
      )}
    </>
  );
}

export default ReserveImage;
