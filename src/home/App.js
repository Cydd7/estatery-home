import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  loadImageData,
  loadPropertiesData,
  loadUsersData,
} from "../api/axios-fetches";

import {
  defaultObj,
  getFilterObject,
  updateThrottleText,
} from "../utility/utils";

import Navbar from "../components/Navbar";
import NotFoundPage from "../pages/NotFound";
import Rent from "../pages/rent/Rent";
import Reserve from "../pages/reserve/Reserve";
import Result from "../pages/result/Result";
import "./App.css";
import Confetti from "../pages/reserve/Confetti";
import dayjs from "dayjs";

function App() {
  const [navSticky, setNavSticky] = useState(false);

  const [houseImages, setHouseImages] = useState([]);
  const [loadingImagesError, setLoadingImagesError] = useState(null);

  const [propertyData, setPropertyData] = useState([]);
  const [loadingPropertyError, setLoadingPropertyError] = useState(null);

  const [user, setUser] = useState({});
  const [loadingUserError, setloadingUserError] = useState(null);

  const [renderedPropertyList, setRenderedPropertyList] = useState([]);

  const [spray, setSpray] = useState(false);
  const [fadeSpray, setFadeSpray] = useState(false);

  function confettiSpray() {
    setSpray(true);
    setTimeout(() => {
      setFadeSpray(true);
    }, 2000);
    setTimeout(() => {
      setFadeSpray(false);
    }, 9000);
    setTimeout(() => {
      setSpray(false);
    }, 11000);
  }

  useEffect(() => {
    loadPropertiesData(setPropertyData, setLoadingPropertyError);
    loadImageData(setHouseImages, setLoadingImagesError);
    loadUsersData(setUser, setloadingUserError);

    window.addEventListener("scroll", (e) => {
      updateThrottleText(e, setNavSticky);
    });
  }, []);

  useEffect(() => {
    if (propertyData.length !== 0 && loadingPropertyError === null) {
      console.log("Properties loaded");
      if (houseImages.length !== 0) {
        if (loadingImagesError === null) {
          console.log("Fetched images loaded");
        } else {
          console.log("Backup images loaded", loadingImagesError);
        }
        // * 2. Match the images to the property data

        let startIndex = propertyData.findIndex((property) => {
          const d = dayjs(property.datesstr[1]);
          // const x = dayjs().isSame(d, "date");
          // console.log(d, x, dayjs());
          return dayjs().isBefore(d, "date") || dayjs().isSame(d, "date");
        });

        if (startIndex === -1) {
          startIndex = 0;
        }

        console.log("startIndex", startIndex);

        if (!propertyData[startIndex].hasOwnProperty("imageurl")) {
          let temp = propertyData.map((prop, index) => {
            if (index >= startIndex) {
              prop["imageurl"] = houseImages[index - startIndex];
            } else {
              prop["imageurl"] =
                houseImages[index + (propertyData.length - startIndex)];
            }
            return prop;
          });
          setPropertyData(temp);

          console.log(propertyData[startIndex].hasOwnProperty("imageurl"));
          console.log("line 57", propertyData);
        }

        getFilterObject(defaultObj, propertyData, setRenderedPropertyList);
      }
    } else {
      console.log("Loading Property error: ", loadingPropertyError);
    }
  }, [houseImages, loadingImagesError, loadingPropertyError, propertyData]);

  useEffect(() => {
    console.log(loadingUserError);
  }, [loadingUserError]);

  useEffect(() => {
    console.log("houseImagesLength: ", houseImages.length);
  }, [houseImages.length]);

  useEffect(() => {
    console.log("propertyData", propertyData);
  }, [propertyData]);

  function reloadUser() {
    loadUsersData(setUser, setloadingUserError);
  }

  /*
   * 1. Load property data from API in bulk (<600 properties)


  */

  return (
    <Router>
      <Navbar
        navSticky={navSticky}
        user={user}
        reloadUser={reloadUser}
        propertyData={propertyData}
      />
      {spray && <Confetti fadeSpray={fadeSpray} />}

      <Routes>
        <Route
          path="/"
          element={
            <Rent
              setUser={setUser}
              user={user}
              propertyData={propertyData}
              renderedPropertyList={renderedPropertyList}
              setRenderedPropertyList={setRenderedPropertyList}
            />
          }
        />
        <Route
          path="/reserve/:id/:date"
          element={<Reserve propertyData={propertyData} />}
        />
        <Route
          path="/success/:id/:months/:date/:send"
          element={
            <Result
              passed={true}
              propertyData={propertyData}
              user={user}
              confettiSpray={confettiSpray}
            />
          }
        />
        <Route
          path="/fail"
          element={
            <Result passed={false} propertyData={propertyData} user={user} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
