import { database } from "../../firebase";
import { ref, onValue } from "firebase/database";
import {
  GET_USERPRODUCT_SUCCESS,
  GET_SELLPRODUCT_SUCCESS,
} from "./actionNames";

export const getUserProduct = (uid) => {
  return (dispatch) => {
    const dbRef = ref(database, `Products/${uid}`);

    onValue(dbRef, (snapshot) => {
      const productData = snapshot.val();
      const productAds = [];

      Object.keys(productData).forEach((pData, outerIndex) => {
        productAds.push({ [pData]: [] });

        Object.values(productData[pData]).forEach((adData) => {
          productAds[outerIndex][pData].push(adData);
        });
      });

      dispatch({
        type: GET_USERPRODUCT_SUCCESS,
        payLoad: productAds,
      });
    });
  };
};

export const getProducts = () => {
  return (dispatch) => {
    const dbRef = ref(database, `Sell`);

    onValue(dbRef, (snapshot) => {
      const productData = snapshot.val();
      const productAds = [];
      productData &&
        Object.keys(productData).forEach((pData, outerIndex) => {
          productAds.push({ [pData]: [] });

          Object.values(productData[pData]).forEach((adData) => {
            productAds[outerIndex][pData].push(adData);
          });
        });

      dispatch({
        type: GET_SELLPRODUCT_SUCCESS,
        payLoad: productAds,
      });
    });
  };
};
