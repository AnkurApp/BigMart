import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onIdTokenChanged,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { set, ref } from "firebase/database";

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_SESSION,
  USER_LOGOUT_SUCCESS,
} from "./actionNames";

export const register = (user) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, user.email, user.password).then(
      (userData) => {
        updateProfile(auth.currentUser, {
          displayName: user.name,
        })
          .then(() => {
            set(ref(database, `Users/${userData.user.uid}`), {
              username: user.name,
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        console.log(userData, "userData");
        const loggedUser = {
          name: userData.user.displayName,
          uid: userData.user.uid,
          email: userData.user.email,
        };

        auth.currentUser.getIdToken().then((token) => {
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
    auth
      .signOut()
      .then(() => {
        console.log("jhd");
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
    onIdTokenChanged(auth, (userInfo) => {
      if (userInfo) {
        let user = {
          name: userInfo.displayName,
          uid: userInfo.uid,
          email: userInfo.email,
          authenticated: "LOGGEDIN",
        };
        console.log(user, "sess");
        dispatch({
          type: USER_SESSION,
          payLoad: { user },
        });
      }
    });
  };
};
