import React from "react";
import { Box, Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import materialIcons, { amenities } from "../../utility/materialIcons";

function ReserveDetails({ property }) {
  const LocationIcon = materialIcons["location"];

  return (
    <Grid item xs={12} sm={8} md={12}>
      <Paper
        elevation={1}
        sx={{
          borderRadius: "10px",
          width: "100%",
          paddingBottom: "30px",
          margin: "0",
        }}
      >
        {property._id !== "0" ? (
          <Box sx={{ padding: "20px" }}>
            <Typography sx={{ fontFamily: "airbnb", fontSize: "0.8rem" }}>
              8 guests ∙ {property.bed} bedroom ∙ {property.bath} bath ∙{" "}
              {property.area} sqm area
            </Typography>
            <Divider light variant="middle" sx={{ margin: "10px 0" }} />
            <Typography
              variant="h5"
              sx={{
                margin: "20px 0",
                fontFamily: "between-days",
                color: "#392c79",
                fontSize: "1.8rem",
                letterSpacing: "0.5px",
              }}
            >
              Location
            </Typography>
            <Typography
              variant="p"
              sx={{
                margin: "20px 0",
                fontFamily: "lyon",
                display: "flex",
                alignItems: "flex-end",
                letterSpacing: "0.1px",
              }}
            >
              <LocationIcon /> {property.name}, {property.address}
            </Typography>
            <Divider light variant="middle" sx={{ margin: "10px 0" }} />
            <Typography
              variant="h5"
              sx={{
                margin: "20px 0",
                fontFamily: "between-days",
                color: "#392c79",
                fontSize: "1.8rem",
                letterSpacing: "0.5px",
              }}
            >
              Amenities
            </Typography>
            <Grid container spacing={1}>
              {amenities.map((amenity) => {
                var Icon = amenity.icon;

                return (
                  <Grid item xs={6} sm={4} md={3} position="relative">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "5px 0",
                      }}
                    >
                      <Icon />
                      &nbsp;
                      <Typography
                        sx={{ fontFamily: "airbnb", fontSize: "0.9rem" }}
                      >
                        {amenity.name}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex", fontSize: "1rem" }}>
              <Skeleton variant="text" animation="wave" width={"7ch"} />
              &nbsp;∙&nbsp;
              <Skeleton variant="text" animation="wave" width={"9ch"} />
              &nbsp;∙&nbsp;
              <Skeleton variant="text" animation="wave" width={"6ch"} />
              &nbsp;∙&nbsp;
              <Skeleton variant="text" animation="wave" width={"12ch"} />
            </Box>

            <Divider light variant="middle" sx={{ margin: "10px 0" }} />

            <Typography
              variant="h5"
              sx={{
                margin: "20px 0 35px 0",
              }}
            >
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1.3rem" }}
                animation="wave"
                width={"10ch"}
              />
            </Typography>

            <Typography
              variant="p"
              sx={{
                margin: "30px 0 20px 0",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <LocationIcon /> <Skeleton animation="wave" width={"50%"} />
            </Typography>

            <Divider light variant="middle" sx={{ margin: "10px 0" }} />

            <Typography
              variant="h5"
              sx={{
                margin: "20px 0 35px 0",
              }}
            >
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1.3rem" }}
                animation="wave"
                width={"13ch"}
              />
            </Typography>

            <Grid container spacing={1}>
              {amenities.map((amenity) => {
                var Icon = amenity.icon;
                return (
                  <Grid item xs={6} sm={4} md={3} position="relative">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        padding: "5px 0",
                      }}
                    >
                      <Icon />
                      &nbsp;
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={"10ch"}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Paper>
    </Grid>
  );
}

export default ReserveDetails;
