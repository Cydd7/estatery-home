import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ReserveDetails from "../reserve/ReserveDetails";
import ReserveImage from "../reserve/ReserveImage";
import { defaultProperty } from "../../utility/utils";
import { estatery } from "../../api/axios-instances";

function Result({ propertyData, passed, user, confettiSpray }) {
  let { id, months, date, send } = useParams();
  const [property, setProperty] = useState(defaultProperty);
  const navigate = useNavigate();

  async function bookProperty() {
    if (!property.booked) {
      try {
        const response = await estatery.patch(`/users/book/${user._id}`, {
          bookedProperty: {
            propid: property._id,
            datesstr: date,
            months: months,
          },
        });
        console.log("Booked Property: ", response);
      } catch (error) {
        console.log("Booking property error", error);
      }
    }
  }

  async function handleCancel() {
    try {
      const response = await estatery.patch(
        `/users/cancel/${user._id}/${property._id}`
      );
      console.log("Cancelled Booking: ", response);
      navigate("/");
    } catch (error) {
      console.log("Cancel booking error", error);
    }
  }

  useEffect(() => {
    if (send && property._id !== "0") {
      bookProperty();
    }

    confettiSpray();
  }, [user, property]);

  useEffect(() => {
    if (propertyData.length > 0) {
      let temp = propertyData.find((property) => property._id === id);
      if (temp) {
        setProperty(temp);
      }
    }
  }, [propertyData]);

  return (
    <Container sx={{ margin: "30px auto" }}>
      {/* <pre>{JSON.stringify(property, null, 4)}</pre> */}

      <Grid container spacing={3}>
        <Grid item xs={12} md={9} position="relative">
          <ReserveImage property={property} passed />
        </Grid>

        <Grid item xs={12} md={3} position="relative">
          <Paper
            elevation={1}
            sx={{
              position: "relative",
              borderRadius: "10px",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Box sx={{ padding: "20px" }}>
              <Grid container sx={{ fontFamily: "airbnb" }}>
                <Grid
                  item
                  xs={12}
                  position="relative"
                  sx={{
                    border: "2px solid #d1c8ed",
                    borderBottom: "1px solid #d1c8ed",
                    borderRadius: "8px 8px 0 0",
                    padding: "10px",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: "600" }}>
                      CHECK-IN
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {date}
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  position="relative"
                  sx={{
                    border: "2px solid #d1c8ed",
                    borderTop: "1px solid #d1c8ed",
                    borderRadius: "0 0px 8px 8px ",
                    padding: "10px",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: "600" }}>
                      CHECKOUT
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {date}
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  position: "relative",
                  margin: "20px 0",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <Button
                  variant={"contained"}
                  sx={{
                    width: "100%",
                    borderRadius: "6px",
                  }}
                  onClick={handleCancel}
                >
                  Unbook Property
                </Button>
              </Box>

              {passed && (
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={12}
                    position="relative"
                    sx={{
                      padding: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="p" component="p">
                      ${property.pricestr} x {months} months
                    </Typography>
                    <Typography variant="p" component="p">
                      ${property.price * Number(months)}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    position="relative"
                    sx={{
                      borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="p" component="p">
                      Service fees
                    </Typography>
                    <Typography variant="p" component="p">
                      ${10} x {months}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    position="relative"
                    sx={{
                      padding: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="p" component="p">
                      Total amount paid
                    </Typography>
                    <Typography variant="p" component="p">
                      ${property.price * Number(months) + 10 * Number(months)}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  color: "green",
                }}
              >
                <CheckCircleIcon sx={{ fontSize: "70px" }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <ReserveDetails property={property} />
      </Grid>
    </Container>
  );
}

export default Result;
