import React from "react";
import { AppBar, Button, Grid, Toolbar } from "@mui/material";

import LocationFilter from "./filters/LocationFilter";
import PriceSlider from "./filters/PriceSlider";
import DateFilter from "./filters/DateFilter";

function SearchFilters({ getData, search, sendToCheckout }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        marginTop: "20px",
        backgroundColor: "#ffffff",
        padding: "20px",
      }}
    >
      <Toolbar>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={3}>
            <LocationFilter sendData={getData} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DateFilter sendData={getData} sendToCheckout={sendToCheckout} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PriceSlider sendData={getData} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              sx={{ width: "100%", height: "100%" }}
              onClick={search}
              size="large"
              variant="contained"
              fontSize="1.2rem"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default SearchFilters;
