import { database } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { GET_USERPRODUCT_SUCCESS } from "./actionNames";

export const getUserProduct = (uid) => {
  return (dispatch) => {
    const dbRef = ref(database, `Products/${uid}`);

    onValue(dbRef, (snapshot) => {
      const productData = snapshot.val();
      dispatch({
        type: GET_USERPRODUCT_SUCCESS,
        payLoad: productData,
      });
    });
  };
};
