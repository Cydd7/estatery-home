import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";

function ReservePricingSkeleton() {
  return (
    <Box sx={{ padding: "20px" }}>
      <Skeleton
        sx={{ fontSize: "1.1rem", margin: "0 0 6px 0" }}
        variant="rounded"
        animation="wave"
        width={"12ch"}
      />

      <Grid container>
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
          <Skeleton
            sx={{ fontSize: "0.7rem" }}
            variant="rounded"
            animation="wave"
            width={"8ch"}
          />

          <Skeleton
            sx={{ fontSize: "0.7rem", margin: "10px 0 0 0" }}
            variant="rounded"
            animation="wave"
            width={"100%"}
          />
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
          <Skeleton
            sx={{ fontSize: "0.7rem" }}
            variant="rounded"
            animation="wave"
            width={"11ch"}
          />
          <Skeleton
            sx={{ fontSize: "0.7rem", margin: "10px 0 0 0" }}
            variant="rounded"
            animation="wave"
            width={"100%"}
          />
        </Grid>

        <Grid
          item
          xs={6}
          position="relative"
          sx={{
            border: "2px solid #d1c8ed",
            borderTop: "1px solid #d1c8ed",
            borderRight: "1px solid #d1c8ed",
            padding: "12.5px",
            borderRadius: "0 0 0 8px",
          }}
        >
          <Skeleton
            sx={{ fontSize: "1.5rem" }}
            animation="wave"
            width={"100%"}
          />
        </Grid>

        <Grid
          item
          xs={6}
          position="relative"
          sx={{
            border: "2px solid #d1c8ed",
            borderTop: "1px solid #d1c8ed",
            borderLeft: "1px solid #d1c8ed",
            padding: "10px",
            borderRadius: "0 0 8px 0",
          }}
        >
          <Skeleton
            sx={{ fontSize: "1.4rem" }}
            animation="wave"
            width={"100%"}
          />
        </Grid>
      </Grid>

      <Skeleton
        sx={{
          fontSize: "1.8rem",
          margin: "20px 0",
          width: "100%",
          borderRadius: "6px",
        }}
        variant="rounded"
        animation="wave"
        width={"100%"}
      />

      <Skeleton variant="text" animation="wave" width={"20ch"} />

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
            <Skeleton variant="text" animation="wave" width={"14ch"} />
          </Typography>
          <Typography variant="p" component="p">
            <Skeleton variant="text" animation="wave" width={"6ch"} />
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
            <Skeleton variant="text" animation="wave" width={"10ch"} />
          </Typography>
          <Typography variant="p" component="p">
            <Skeleton variant="text" animation="wave" width={"6ch"} />
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
            <Skeleton variant="text" animation="wave" width={"14ch"} />
          </Typography>
          <Typography variant="p" component="p">
            <Skeleton variant="text" animation="wave" width={"6ch"} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReservePricingSkeleton;
