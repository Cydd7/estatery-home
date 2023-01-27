import { estatery } from "./axios-instances";
import { backupHouseImages } from "../utility/unsplashData";
import { ppdata } from "../utility/backup/propertyData";
import axios from "axios";

export const loadPropertiesData = async (
  setPropertyData,
  loadingPropertyError
) => {
  try {
    const response = await estatery.get("/properties");
    setPropertyData(response.data);
  } catch (err) {
    setPropertyData(ppdata);
    loadingPropertyError(err.message);
  }
};

export const loadLocationsData = async (setLocations, setError) => {
  try {
    const response = await estatery.get("/locations");
    setLocations(response.data);
  } catch (err) {
    setError(err.message);
    setLocations(null);
  }
};

export const loadUsersData = async (setUser, loadingUserError) => {
  try {
    const response = await estatery.get("/users");
    setUser(response.data[0]);
  } catch (err) {
    loadingUserError(err.message);
  }
};

export const loadImageData = async (setHouseImages, setLoadingImagesError) => {
  try {
    const imagesData = await estatery.get("/fetch-unsplash-images/villa/20");
    setHouseImages(imagesData.data.unsplashImagesData);
  } catch (error) {
    setLoadingImagesError(error);
    setHouseImages(backupHouseImages);
  }
};
