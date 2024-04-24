import app, { storage } from "../fireBase/config";

import { getAuth } from "firebase/auth";
import { createContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  FacebookAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAdduserMutation, useFetchusersQuery } from "../service/usersApi";
import { useFetchcommentsQuery } from "../service/commentApi";
import { toast } from "react-toastify";
import { useFetchproductsQuery } from "../service/productsApi";

const AuthContext = createContext();

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const providerFaceBook = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userStorage, setUserStoge] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { data: products } = useFetchproductsQuery();

  const [checkBoxStatus, setCheckbox] = useState(
    JSON.parse(localStorage.getItem("checkBox")) || false
  );
  const [errorMessage, setErrorMessage] = useState("");

  const randomID = uuid();

  const { data: users } = useFetchusersQuery();
  const { data: comments } = useFetchcommentsQuery();
  const [addUser] = useAdduserMutation();

  const existUser = users?.filter(
    (item) => item.email === "quangtu.vu@gmail.com"
  );

  useEffect(() => {
    if (currentUser && users) {
      // Kiểm tra cả currentUser và users
      const userStorage = users.find((item) => item.uid === currentUser.uid);
      setUserStoge(userStorage);
      if (userStorage) {
        setPhoto(userStorage.imgUrl);
      }
    }
  }, [currentUser, users]);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  const createUser = (email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        const user = result.user;
        addUser({ email: user.email, uid: user.uid});
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/Email already in use":
            if (
              confirm(
                `Email address ${email} already in use.Are you want to Reset Password`
              )
            ) {
              resetPassword(email);
            }
            break;
          case "auth/invalid-email":
            alert(`Email address ${email} is invalid.`);
            break;
          case "auth/operation-not-allowed":
            alert(`Error during sign up.`);
            break;
          case "auth/weak-password":
            alert(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };

  const signUpWithGmail = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (users?.some((item) => item.email === user.email)) {
          alert("user existed");
        } else {
          addUser({ email: user.email, uid: user.uid });
        }
      })
      .catch((err) => {
        const message = err.message;
        console.log(message);
        setErrorMessage(message);
      });
  };

  const login = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (checkBoxStatus) {
          localStorage.setItem("checkBox", checkBoxStatus);
          localStorage.setItem(
            "loginInfor",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("loginInfor");
        }
        const user = result.user;
        console.log("dang nhap thanh cong", user);

        // navigate(from, { replace: true });
      })
      .catch((err) => {
        const message = err.message;
        console.log(message);
        setErrorMessage(message);
      });
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
        setLoading(false);
      } else {
        console.log("user signOut");
      }
    });

    return () => {
      unsub();
    };
  }, [currentUser]);

  const logOut = () => {
    localStorage.removeItem("genius-token");
    signOut(auth)
      .then(() => console.log("sign out successfull"))
      .catch(() => console.log("signout loi "));
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please Check Email To Reset Password");
      })
      .catch((err) => alert("Email does not exist, Please re-enter"));
  };

  const signUpWithFacebook = () => {
    setLoading(true);

    return signInWithPopup(auth, providerFaceBook);
  };

  const uploadToFireBase = (file, setItem) => {
    const storageRef = ref(storage, randomID + ".png");
    // console.log(file);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.info("Image Upload Successfully");
          setItem((prev) => ({ ...prev, imgUrl: downloadURL }));
        });
      }
    );
  };

  const authInfor = {
    currentUser,
    loading,
    setLoading,
    createUser,
    signUpWithGmail,
    login,
    logOut,
    photoURL,
    resetPassword,
    signUpWithFacebook,
    auth,
    userStorage,
    photo,
    users,
    comments,
    randomID,
    uploadToFireBase,
    products,
    checkBoxStatus,
  };

  return (
    <AuthContext.Provider value={authInfor}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
