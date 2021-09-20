import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onIdTokenChanged,
} from "firebase/auth";
import { auth as dbAuth, database } from "../../firebase";
import { set, ref, update } from "firebase/database";

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_SESSION,
  USER_LOGOUT_SUCCESS,
  USER_EDIT,
} from "./actionNames";

export const register = (user) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(dbAuth, user.email, user.password).then(
      (userData) => {
        console.log(userData, "userData");
        updateProfile(dbAuth.currentUser, {
          displayName: user.name,
        })
          .then(() => {
            set(ref(database, `Users/${userData.user.uid}`), {
              name: user.name,
              email: user.email,
              uid: userData.user.uid,
              createdAt: new Date(),
            });
          })
          .then(() => {
            console.log("User added");
            const userDetails = {
              name: user.name,
              email: user.email,
              uid: userData.user.uid,
            };
            localStorage.setItem("User", JSON.stringify(userDetails));
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payLoad: { user: userDetails },
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: USER_LOGIN_FAILURE,
              payLoad: { err },
            });
          });
      }
    );
  };
};

export const signIn = ({ email, password }) => {
  return (dispatch) => {
    signInWithEmailAndPassword(dbAuth, email, password)
      .then((userData) => {
        console.log(userData, "userData");
        const loggedUser = {
          name: userData.user.displayName,
          uid: userData.user.uid,
          email: userData.user.email,
          phoneNo: userData.user.phoneNumber,
        };

        dbAuth.currentUser.getIdToken().then((token) => {
          console.log(token);
          localStorage.setItem("userToken", JSON.stringify(token));
        });
        localStorage.setItem("User", JSON.stringify(loggedUser));

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payLoad: { user: loggedUser },
        });
      })
      .catch((error) => {
        console.log(error);
        // dispatch({
        //   type: USER_LOGIN_FAILURE,
        //   payLoad: { error },
        // });
      });
  };
};

export const Logout = () => {
  return (dispatch) => {
    dbAuth
      .signOut()
      .then(() => {
        localStorage.clear();
        dispatch({
          type: USER_LOGOUT_SUCCESS,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const userSession = () => {
  return (dispatch) => {
    onIdTokenChanged(dbAuth, (userInfo) => {
      if (userInfo) {
        let user = {
          name: userInfo.displayName,
          uid: userInfo.uid,
          email: userInfo.email,
          authenticated: "LOGGEDIN",
        };
        dispatch({
          type: USER_SESSION,
          payLoad: { user },
        });
      }
    });
  };
};

export const userEdit = (userDetails, auth) => {
  console.log(userDetails, "uD");
  console.log(userDetails.number, "unum");
  return (dispatch) => {
    updateProfile(dbAuth.currentUser, {
      phoneNumber: userDetails.number,
    });
    update(ref(database, `Users/${auth.uid}`), {
      ...userDetails,
    });

    dispatch({
      type: USER_EDIT,
      payLoad: { userDetails },
    });
  };
};
