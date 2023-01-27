import React from "react";
import { Box, Pagination, Stack } from "@mui/material";

// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

function PaginationBar({ itemsPerPage, totalItems, paginate, currentPage }) {
  const handleChange = (event, value) => {
    paginate(value);
    console.log(value);
  };

  const NoOfPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box>
      <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={NoOfPages}
          siblingCount={1}
          boundaryCount={0}
          variant="contained"
          shape="rounded"
          showFirstButton
          showLastButton
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
}

export default PaginationBar;
