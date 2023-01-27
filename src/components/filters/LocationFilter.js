import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { loadLocationsData } from "../../api/axios-fetches";

function LocationFilter({ sendData }) {
  const [location, setLocation] = React.useState("all");
  const [locations, setLocations] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    loadLocationsData(setLocations, setError);
  }, []);

  React.useEffect(() => {
    console.log("Error: ", error);
  }, [error]);

  const handleChange = ({ target }) => {
    var val = target.value;
    setLocation(val);
    sendData(val, "location");
  };

  return (
    <Box>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          label="Location"
          onChange={handleChange}
        >
          <MenuItem value={"all"}>All</MenuItem>

          {Object.keys(locations) !== 0 &&
            locations.map(({ name, abbreviation }, index) => {
              return (
                <MenuItem
                  key={index}
                  value={abbreviation}
                >{`${name} (${abbreviation})`}</MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default LocationFilter;
