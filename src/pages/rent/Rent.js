import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import dayjs from "dayjs";

import PropertyCard from "../../components/property/PropertyCard";
import SearchBarText from "../../components/SearchBarText";
import SearchFilters from "../../components/SearchFilters";
import PaginationBar from "../../components/PaginationBar";

import {
  defaultObj,
  defaultProperty,
  getFilterObject,
} from "../../utility/utils";

import "./Rent.css";

function Rent({
  user,
  setUser,
  propertyData,
  renderedPropertyList,
  setRenderedPropertyList,
}) {
  const [gridLoaded, setGridLoaded] = useState(false);
  const [checkoutDate, setCheckoutDate] = useState(dayjs());
  const [itemsPerPage] = useState(18);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  const [searchFilterObject, setSearchFilterObject] = useState(defaultObj);

  const getData = (val, filter) => {
    setSearchFilterObject((prev) => {
      return { ...prev, [filter]: val };
    });
  };

  const search = () => {
    getFilterObject(searchFilterObject, propertyData, setRenderedPropertyList);
  };

  useEffect(() => {
    setCurrentItems(renderedPropertyList.slice(0, 18));
  }, [renderedPropertyList]);

  useEffect(() => {
    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(
      renderedPropertyList.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [currentPage]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function sendToCheckout(date) {
    setCheckoutDate(date);
  }

  let skeletonGrid = [];
  for (let i = 0; i < 12; i++) {
    skeletonGrid.push(defaultProperty);
  }

  return (
    <Container>
      <SearchBarText
        propertyData={propertyData}
        setRenderedPropertyList={setRenderedPropertyList}
        search={search}
      />
      <SearchFilters
        getData={getData}
        search={search}
        sendToCheckout={sendToCheckout}
      />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <PaginationBar
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={renderedPropertyList.length}
          paginate={paginate}
        />
      </Box>

      {!gridLoaded && (
        <Grid container spacing={4} sx={{ marginTop: "0px" }}>
          {skeletonGrid.map((property, index) => {
            return (
              <PropertyCard
                key={index}
                property={property}
                user={user}
                setUser={setUser}
              />
            );
          })}
        </Grid>
      )}

      <Grid
        container
        spacing={3}
        sx={{ marginTop: "0px" }}
        onLoad={() => {
          console.log("grid loaded!!!");
          setGridLoaded(true);
        }}
      >
        {currentItems.map((property, index) => {
          return (
            <PropertyCard
              key={property._id}
              property={property}
              checkoutDate={checkoutDate}
              user={user}
              setUser={setUser}
            />
          );
        })}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", margin: "100px auto" }}
      >
        <PaginationBar
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={renderedPropertyList.length}
          paginate={paginate}
        />
      </Box>
    </Container>
  );
}

export default Rent;
