import { database } from "../../firebase";
import { set, ref, onValue, remove } from "firebase/database";
import {
  GET_USERPRODUCT_SUCCESS,
  GET_SELLPRODUCT_SUCCESS,
  GET_CART_ITEMS,
  GET_FAV_ITEMS,
  GET_ORDER_ITEMS,
  GET_CATEGORYDATA,
} from "./actionNames";

export const getUserProduct = (uid) => {
  return (dispatch) => {
    const dbRef = ref(database, `Products/${uid}`);

    onValue(dbRef, (snapshot) => {
      const productData = snapshot.val();
      console.log(productData);
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

export const getCategoryProduct = (category) => {
  return (dispatch) => {
    const dbRef = ref(database, `Sell/${category}`);

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const categoryData = [];

      data &&
        Object.values(data).forEach((item) => {
          categoryData.push(item);
        });

      dispatch({ type: GET_CATEGORYDATA, payLoad: categoryData });
    });
  };
};

export const addToCart = (uid, productData) => {
  return () => {
    set(ref(database, `Cart/${uid}/${productData.itemId}`), {
      ...productData,
    });
  };
};

export const removeUserCart = (uid) => {
  return () => {
    remove(ref(database, `Cart/${uid}`));
  };
};

export const removeFromCart = (uid, itemId) => {
  return () => {
    remove(ref(database, `Cart/${uid}/${itemId}`));
  };
};

export const addToFavorite = (uid, productData) => {
  return () => {
    set(ref(database, `Favorite/${uid}/${productData.itemId}`), {
      ...productData,
    });
  };
};

export const removeFromFav = (uid, itemId) => {
  return () => {
    remove(ref(database, `Favorite/${uid}/${itemId}`));
  };
};

export const removeFromSell = (category, itemId) => {
  return () => {
    remove(ref(database, `Sell/${category}/${itemId}`));
  };
};

export const removeFromProduct = (uid, category, itemId) => {
  return () => {
    remove(ref(database, `Products/${uid}/${category}/${itemId}`));
  };
};

export const addToOrder = (uid, productData, paymentMethod) => {
  return () => {
    set(ref(database, `Order/${uid}/${productData.itemId}`), {
      ...productData,
      paymentMethod,
      OrderedAt: +new Date(),
    });
  };
};

export const getCartProducts = (uid) => {
  return (dispatch) => {
    const dbRef = ref(database, `Cart/${uid}`);

    onValue(dbRef, (snapshot) => {
      const cartData = snapshot?.val();
      const cartProduct = [];
      cartData &&
        Object.values(cartData).forEach((item) => {
          cartProduct.push(item);
        });
      dispatch({ type: GET_CART_ITEMS, payLoad: cartProduct });
    });
  };
};

export const getFavProducts = (uid) => {
  return (dispatch) => {
    const dbRef = ref(database, `Favorite/${uid}`);

    onValue(dbRef, (snapshot) => {
      const favData = snapshot?.val();
      const favProduct = [];
      favData &&
        Object.values(favData).forEach((item) => {
          favProduct.push(item);
        });
      dispatch({ type: GET_FAV_ITEMS, payLoad: favProduct });
    });
  };
};

export const getUserOrder = (uid) => {
  return (dispatch) => {
    const dbRef = ref(database, `Order/${uid}`);

    onValue(dbRef, (snapshot) => {
      const orderData = snapshot?.val();
      const orderProduct = [];
      orderData &&
        Object.values(orderData).forEach((item) => {
          orderProduct.push(item);
        });
      dispatch({ type: GET_ORDER_ITEMS, payLoad: orderProduct });
    });
  };
};

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
