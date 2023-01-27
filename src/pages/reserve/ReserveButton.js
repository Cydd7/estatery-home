import React, { useEffect, useRef, useState } from "react";
import { Button, Tooltip, Box } from "@mui/material";

function ReserveButton({ property, months, checkin, reserveDisabled }) {
  const reserveBtn = useRef(null);
  const [reserveProcessing, setReserveProcessing] = useState(false);

  const reserveController = new AbortController();
  const reserveSignal = reserveController.signal;
  console.log("reserveSignal", reserveSignal);

  useEffect(() => {
    console.log("reserveProcessing", reserveProcessing);
  }, [reserveProcessing]);

  async function stripeCheckout() {
    return fetch(
      `https://estatery-backend.netlify.app/.netlify/functions/api/estatery/stripe-checkout-session/${property._id}`,
      {
        method: "POST",
        signal: reserveSignal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkoutInfo: {
            months: months,
            date: checkin.format("YYYY-MM-DD"),
            imageurl:
              property.imageurl.rawurl + "&fm=jpg&fit=crop&w=1080&q=80&fit=max",
          },
        }),
      }
    )
      .then(async (res) => {
        if (res.ok) return res.json();
        const json = await res.json();
        return await Promise.reject(json);
      })
      .then(({ url }) => {
        return url;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function checkout() {
    const FiveSeconds = new Promise((resolve, reject) => {
      let a = setTimeout(() => {
        resolve("done");
      }, 6000);

      reserveSignal.onabort = () => {
        clearTimeout(a);
        reject({ name: "AbortError" });
      };
    });

    const url = stripeCheckout();

    Promise.all([FiveSeconds, url])
      .then((values) => {
        console.log("Promise values", values);
        window.location = values[1];
      })
      .catch((e) => {
        console.log("Promise error", e);
      });
  }

  async function handleReserve() {
    if (reserveProcessing) {
      // ! abhi ya badme
      setReserveProcessing(false);
    } else {
      await checkout().catch((e) => {
        // if (e.name === "AbortError") {
        // } else {
        //   throw e; // don't swallow errors :)
        // }
        console.log("checkout error handled: ", e);
      });

      setReserveProcessing(true);
      reserveBtn.current.addEventListener(
        "click",
        () => {
          reserveController.abort();
        },
        { once: true }
      );
    }

    // ! Confetti udao here
  }

  return (
    <Tooltip
      sx={{ padding: "10px" }}
      title={`${reserveDisabled ? "Date not available" : "dcadva"} `}
      followCursor
    >
      <Box
        sx={{
          position: "relative",
          margin: "20px 0",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          className={`reserve-bar ${
            reserveProcessing && "reserve-bar-processing"
          }`}
        ></div>
        <Button
          ref={reserveBtn}
          disabled={reserveDisabled}
          variant={`${reserveProcessing ? "outlined" : "contained"}`}
          sx={{
            width: "100%",
            borderRadius: "6px",
          }}
          onClick={handleReserve}
        >
          {reserveProcessing ? "Cancel" : "Reserve"}
        </Button>
      </Box>
    </Tooltip>
  );
}

export default ReserveButton;
