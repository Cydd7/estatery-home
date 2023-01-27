import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import ReservePricingSkeleton from "./ReservePricingSkeleton";
import ReserveButton from "./ReserveButton";

function ReservePricing({ property, checkoutDate }) {
  const [months, setMonths] = React.useState("1");
  const [guests, setGuests] = React.useState("1");

  const today = dayjs();

  const [checkin, setCheckin] = React.useState(today);
  const [reserveDisabled, setReserveDisabled] = React.useState(false);

  useEffect(() => {
    if (property._id !== "0") {
      if (checkoutDate === "default") {
        console.log("default");
        let x = dayjs(property.datesstr[0]);
        let y = dayjs(property.datesstr[1]);

        if (today.isBefore(x, "date")) {
          setReserveDisabled(false);
          setCheckin(x);
        } else if (today.isBetween(x, y, "date", [])) {
          setReserveDisabled(false);
          setCheckin(today);
        } else if (today.isAfter(y, "date")) {
          setReserveDisabled(true);
        }
      } else {
        let b = dayjs(checkoutDate);
        if (b.isBefore(today, "date")) {
          console.log("disabled");
          setReserveDisabled(true);
        } else {
          setReserveDisabled(false);
          setCheckin(b);
        }
      }
    }
  }, [property]);

  const dateNotAvailable = (date) => {
    var a = dayjs(property.datesstr[0]);
    var a2 = dayjs(property.datesstr[1]);
    return (
      dayjs(date).isBefore(dayjs().subtract(1, "day")) ||
      dayjs(date).isBefore(a) ||
      dayjs(date).isAfter(a2)
    );
  };

  const handleDateChange = (newValue) => {
    setCheckin(newValue);
  };

  const NoOfMonths = [];
  for (let i = 1; i <= 12; i++) {
    NoOfMonths.push(`${i}`);
  }

  const NoOfGuests = [];
  for (let i = 1; i <= 8; i++) {
    NoOfGuests.push(`${i}`);
  }

  return (
    <Grid item xs={12} sm={4}>
      <Paper elevation={1} sx={{ borderRadius: "10px", height: "100%" }}>
        {property._id !== "0" ? (
          <Box sx={{ padding: "20px" }}>
            <Typography
              variant="span"
              sx={{
                padding: "10px 0",
                fontFamily: "between-days",
                fontSize: "1.5rem",
                color: "#392c79",
              }}
            >
              ${property.pricestr}
            </Typography>
            <Typography variant="span">/month</Typography>
            <Grid container sx={{ fontFamily: "airbnb" }}>
              <Grid
                item
                xs={6}
                position="relative"
                sx={{
                  border: "2px solid #d1c8ed",
                  borderBottom: "none",
                  borderRight: "1px solid #d1c8ed",
                  borderRadius: "8px 0 0 0 ",
                  padding: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disabled={reserveDisabled}
                    label="CHECK-IN"
                    inputFormat="MM/DD/YYYY"
                    value={checkin}
                    onChange={handleDateChange}
                    shouldDisableDate={dateNotAvailable}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.7rem", fontWeight: "600" }}
                        >
                          CHECK-IN
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            style={{
                              outline: "none",
                              border: "none",
                              width: "100%",
                              fontFamily: "airbnb",
                              fontWeight: "100",
                              fontSize: "0.9rem",
                            }}
                            ref={inputRef}
                            {...inputProps}
                          />

                          {InputProps?.endAdornment}
                        </Box>
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid
                item
                xs={6}
                position="relative"
                sx={{
                  border: "2px solid #d1c8ed",
                  borderLeft: "1px solid #d1c8ed",
                  borderBottom: "none",
                  borderRadius: "0 8px 0 0 ",
                  padding: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disabled
                    label="Check Out"
                    inputFormat="MM/DD/YYYY"
                    value={checkin.add(Number(months), "month")}
                    onChange={handleDateChange}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.7rem", fontWeight: "600" }}
                        >
                          CHECKOUT
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            style={{
                              outline: "none",
                              border: "none",
                              width: "100%",
                              fontFamily: "airbnb",
                              fontWeight: "100",
                              fontSize: "0.9rem",
                            }}
                            ref={inputRef}
                            {...inputProps}
                          />

                          {InputProps?.endAdornment}
                        </Box>
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6} position="relative">
                <FormControl fullWidth>
                  <Select
                    sx={{
                      width: "100%",
                      borderRadius: "0 0 0 8px",

                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d1c8ed",
                        borderWidth: "2px",
                        borderRight: "1px solid #d1c8ed",
                        borderTop: "1px solid #d1c8ed",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#7a4ff5",
                        borderWidth: "2px",
                        borderRadius: "8px",
                      },
                    }}
                    value={months}
                    onChange={({ target }) => {
                      var val = target.value;
                      setMonths(val);
                    }}
                    renderValue={() => {
                      return (
                        <>
                          {months} <em>Months</em>{" "}
                        </>
                      );
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Months</em>
                    </MenuItem>
                    {NoOfMonths.map((item) => {
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6} position="relative">
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                >
                  <Select
                    sx={{
                      width: "100%",
                      borderRadius: "0 0 8px 0",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d1c8ed",
                        borderWidth: "2px",
                        borderLeft: "1px solid #d1c8ed",
                        borderTop: "1px solid #d1c8ed",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#7a4ff5",
                        borderWidth: "2px",
                        borderRadius: "8px",
                      },
                    }}
                    value={guests}
                    onChange={({ target }) => {
                      setGuests(target.value);
                    }}
                    renderValue={() => {
                      return (
                        <>
                          {guests}{" "}
                          <em>{guests === "1" ? "Guest" : "Guests"}</em>
                        </>
                      );
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Guests</em>
                    </MenuItem>
                    {NoOfGuests.map((item) => {
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <ReserveButton
              property={property}
              months={months}
              checkin={checkin}
              reserveDisabled={reserveDisabled}
            />{" "}
            You won't be charged yet
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
                  Total before taxes
                </Typography>
                <Typography variant="p" component="p">
                  ${property.price * Number(months) + 10 * Number(months)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <ReservePricingSkeleton property={property} />
        )}
      </Paper>
    </Grid>
  );
}

export default ReservePricing;
