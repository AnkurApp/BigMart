import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onIdTokenChanged,
  updatePassword,
  updateEmail,
  deleteUser,
} from "firebase/auth";
import { auth as dbAuth, database, storage } from "../../firebase";
import { set, ref, update, onValue, remove } from "firebase/database";

import { ref as strRef, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_SESSION,
  USER_LOGOUT_SUCCESS,
  USER_EDIT,
  USER_DP,
  UPDATE_NUMBER,
  UPDATE_CITY,
} from "./actionNames";

export const register = (user) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(dbAuth, user.email, user.password).then(
      (userData) => {
        updateProfile(dbAuth.currentUser, {
          displayName: user.name,
        })
          .then(() => {
            set(ref(database, `Users/${userData.user.uid}`), {
              name: user.name,
              email: user.email,
              uid: userData.user.uid,
              createdAt: +new Date(),
            });
          })
          .then(() => {
            dbAuth.currentUser.getIdToken().then((token) => {
              console.log(token);
              localStorage.setItem("userToken", JSON.stringify(token));
            });

            const userDetails = {
              name: user.name,
              email: user.email,
              uid: userData.user.uid,
            };

            dispatch({
              type: USER_LOGIN_SUCCESS,
              payLoad: { user: userDetails },
            });
          })
          .catch((err) => {
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
        const dbRef = ref(database, `Users/${userData.user.uid}`);
        onValue(dbRef, (snapshot) => {
          const userData = snapshot.val();

          dbAuth.currentUser.getIdToken().then((token) => {
            localStorage.setItem("userToken", JSON.stringify(token));
          });

          dispatch({
            type: USER_LOGIN_SUCCESS,
            payLoad: { user: userData },
          });
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
        const dbRef = ref(database, `Users/${userInfo.uid}`);
        onValue(dbRef, (snapshot) => {
          const userData = snapshot.val();
          let user = {
            ...userData,
            authenticated: "LOGGEDIN",
          };
          dispatch({
            type: USER_SESSION,
            payLoad: { user },
          });
        });
      }
    });
  };
};

export const userEdit = (userDetails, auth) => {
  return (dispatch) => {
    update(ref(database, `Users/${auth.uid}`), {
      ...userDetails,
    });

    dispatch({
      type: USER_EDIT,
      payLoad: { userDetails },
    });
  };
};

export const updateUserPicture = (auth, file) => {
  return (dispatch) => {
    const storageRef = strRef(storage);
    const imageRef = strRef(storageRef, `${auth.uid}`);

    uploadBytes(imageRef, file).then((snapshot) => {
      console.log(snapshot);

      getDownloadURL(strRef(imageRef)).then((url) => {
        update(ref(database, `Users/${auth.uid}`), {
          photoURL: url,
        });

        dispatch({
          type: USER_DP,
          payLoad: { url },
        });
      });
    });
  };
};

export const updateNumber = (auth, number) => {
  return (dispatch) => {
    update(ref(database, `Users/${auth.uid}`), {
      phoneNo: number,
    });

    dispatch({
      type: UPDATE_NUMBER,
      payLoad: { number },
    });
  };
};

export const updateCity = (auth, city) => {
  return (dispatch) => {
    update(ref(database, `Users/${auth.uid}`), {
      city,
    });

    dispatch({
      type: UPDATE_CITY,
      payLoad: { city },
    });
  };
};

export const changePassword = (newpass) => {
  return () => {
    updatePassword(dbAuth.currentUser, newpass)
      .then(() => {
        console.log("Password Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const changeEmail = (newEmail) => {
  return () => {
    updateEmail(dbAuth.currentUser, newEmail)
      .then(() => {
        console.log("Email Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteAccount = (uid) => {
  return () => {
    deleteUser(dbAuth.currentUser)
      .then(() => {
        console.log("User Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.clear();
    remove(ref(database, `Users/${uid}`));
    remove(ref(database, `Cart/${uid}`));
    remove(ref(database, `Favorite/${uid}`));
    remove(ref(database, `Order/${uid}`));
    remove(ref(database, `Products/${uid}`));
  };
};
