import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

// import "./NotFound.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        height: "80vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "30vw", margin: "30px", borderRadius: "30px" }}
        src={require("../assets/images/image404.jpeg")}
        alt="404"
      />

      <Typography variant="h6" component="div">
        <center>
          <h2>Oops! wrong multiverse.</h2>
          <br /> This URL is not available in the current universe.
        </center>
      </Typography>

      <Button
        sx={{ margin: "30px" }}
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </Button>
    </Container>
  );
}

export default NotFoundPage;
