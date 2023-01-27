import * as React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function PriceSlider({ sendData }) {
  const [value, setValue] = React.useState([199, 999]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sendData(newValue, "price");
  };
  const valuetext = (value) => {
    return `$${value}`;
  };

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <Typography sx={{ color: "#999999" }}>Price</Typography>
      <Slider
        min={199}
        step={10}
        max={999}
        getAriaLabel={() => "Price range"}
        value={value}
        name="Price"
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

export default PriceSlider;
