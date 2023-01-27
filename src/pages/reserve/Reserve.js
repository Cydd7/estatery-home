import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";

import ReserveDetails from "./ReserveDetails";
import ReservePricing from "./ReservePricing";
import ReserveImage from "./ReserveImage";
import { defaultProperty } from "../../utility/utils";

import "./Reserve.css";

// ! Not responve, major lapse in design

function Reserve({ propertyData }) {
  let { id, date } = useParams();
  const [property, setProperty] = useState(defaultProperty);
  // const d = new Date();
  // const [dateState, setDateState] = useState(
  //   d.toLocaleDateString().replaceAll("/", "-")
  // );

  useEffect(() => {
    if (propertyData.length > 0) {
      let temp = propertyData.find((property) => property._id === id);
      if (temp) {
        setProperty(temp);
      }

      // if (date === "default") {
      //   setDateState(temp.datesstr[0]);
      // } else {
      //   setDateState(date);
      // }
    }
  }, [propertyData]);

  return (
    <Container sx={{ margin: "30px auto" }}>
      {/* <pre>{JSON.stringify(property, null, 4)}</pre> */}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} position="relative">
          <ReserveImage property={property} />
        </Grid>
        <ReservePricing property={property} checkoutDate={date} />
        <ReserveDetails property={property} />
      </Grid>
    </Container>
  );
}

export default Reserve;
