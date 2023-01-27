import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function PropertyTypeFilter({ sendData }) {
  const [PropertyType, setPropertyType] = React.useState("House");

  const handleChangeLocation = ({ target }) => {
    var val = target.value;
    setPropertyType(val);
    sendData(val, "type");
  };

  return (
    <Box>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={PropertyType}
          label="Property Type"
          onChange={handleChangeLocation}
        >
          <MenuItem value={"House"}>House</MenuItem>
          <MenuItem value={"Room"}>Room</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default PropertyTypeFilter;
