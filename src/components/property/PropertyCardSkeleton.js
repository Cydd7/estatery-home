import { Box, Divider, Skeleton, Typography } from "@mui/material";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import React from "react";

function PropertyImageSkeleton() {
  return (
    <Skeleton
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: "8px 8px 0 0",
        zIndex: "20",
        bgcolor: "grey.300",
      }}
      animation="wave"
      variant="rectangular"
      width={"100%"}
      height={window.innerWidth < 600 ? 300 : 200}
    />
  );
}

function PropertyTextSkeleton() {
  return (
    <>
      <Typography color="primary" variant="h6" component="span">
        <Skeleton variant="h6" animation="wave" width={"50%"} />
      </Typography>

      <Typography marginY={1} variant="h5" component="h2">
        <Skeleton variant="h5" animation="wave" width={"50%"} />
      </Typography>

      <Typography
        sx={{ padding: "20px 30px 20px 0" }}
        height={30}
        color="secondary"
        variant="p"
        component="p"
      >
        <Skeleton variant="p" animation="wave" width={"100%"} />
        <Skeleton variant="p" animation="wave" width={"100%"} />
      </Typography>

      <Divider light variant="middle" sx={{ margin: "10px 0" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BedOutlinedIcon color="primary" />

          <Skeleton animation="wave" width={40} sx={{ marginLeft: "10px" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BathtubOutlinedIcon color="primary" />
          <Skeleton animation="wave" width={40} sx={{ marginLeft: "10px" }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CropSquareRoundedIcon color="primary" />
          <Skeleton animation="wave" width={40} sx={{ marginLeft: "10px" }} />
        </Box>
      </Box>
    </>
  );
}

export { PropertyImageSkeleton, PropertyTextSkeleton };
