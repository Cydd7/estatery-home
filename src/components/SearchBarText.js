import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../utility/materialUtils";

function SearchBarText({ propertyData, setRenderedPropertyList, search }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery !== "") {
        setRenderedPropertyList(
          propertyData.filter((property) => {
            return (
              property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              property.location
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            );
          })
        );
      } else {
        search();
      }
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchQuery]);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ marginTop: "20px", backgroundColor: "#f7f5ff" }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            color: "#444444",
            display: { xs: "none", sm: "block" },
            fontFamily: "between-days",
            fontSize: "27px",
          }}
        >
          Search properties for rent
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search with text"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}

export default SearchBarText;
