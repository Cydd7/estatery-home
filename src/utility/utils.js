import dayjs from "dayjs";

export const defaultObj = {
  date: dayjs(),
  location: "all",
  price: [199, 999],
};

export const defaultProperty = {
  _id: "0",
  imageurl: { rawurl: "" },
  name: "",
  address: "",
  pricestr: "",
  price: 0,
  bed: 0,
  bath: 0,
  area: "",
  location: "",
  dates: [
    {
      _id: "0",
      $D: 0,
      $M: 0,
      $y: 0,
    },
    {
      _id: "0",
      $D: 0,
      $M: 0,
      $y: 0,
    },
  ],
  __v: 0,
};

export const getFilterObject = (
  filterObj,
  propertyData,
  setRenderedPropertyList
) => {
  let { location, date, price } = filterObj;

  console.log("FILTER OBJ: ", filterObj);

  var data = propertyData.filter((property) => {
    return (
      (location === "all" || property.location === location) &&
      date.isBetween(
        property.datesstr[0],
        property.datesstr[1],
        "date",
        "[]"
      ) &&
      property.price <= price[1] &&
      property.price >= price[0]
    );
  });
  console.log(data);
  setRenderedPropertyList(data);
};

export const updateThrottleText = throttle((e, setNavSticky) => {
  incrementCount(e, setNavSticky);
}, 10);

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

function incrementCount(e, setNavSticky) {
  // console.log("Scroll event: ",e);
  // console.dir(window.scrollY);
  if (window.scrollY > 0 && window.scrollY < 100) {
    setNavSticky(true);
    // console.log("Sticky true");
  } else if (window.scrollY === 0) {
    setNavSticky(false);
    // console.log("Sticky false");
  } else if (window.scrollY > 400) {
    return;
  }
}
