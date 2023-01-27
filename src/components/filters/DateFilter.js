import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function DateFilter({ sendData, sendToCheckout }) {
  const [value, setValue] = React.useState(dayjs());

  const handleChange = (newValue) => {
    setValue(newValue);
    sendData(newValue, "date");
    sendToCheckout(newValue);
  };

  const pastDates = (date) => {
    return dayjs(date).isBefore(dayjs().subtract(1, "day"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        shouldDisableDate={pastDates}
        label="When"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField sx={{ width: "100%" }} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

export default DateFilter;
