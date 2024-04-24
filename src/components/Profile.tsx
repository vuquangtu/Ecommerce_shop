import { useEffect, useState } from "react";
import "../components/Slidebar/Profile.css";
import { Link, useParams } from "react-router-dom";
import { useUpdateuserMutation } from "../service/usersApi";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { updatePassword } from "firebase/auth";

import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const { uid } = useParams();

  const { resetPassword, currentUser, userStorage, uploadToFireBase} =
    useContext(AuthContext);

  const [file, setFile] = useState();
  const [emailVerify, setEmailVerify] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [user, setUser] = useState({
    username: "",
    fullname: "",
    email: "",
    company: "",
    birthday: "",
  });

  const [updateUser] = useUpdateuserMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleIputValue = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setUser((prev) => ({ ...prev, ...userStorage }));
  }, [userStorage]);

  const handeSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      toast.success("update avatar success");

      //

      updateUser({ id: user.id, user });
      alert("Change User success");
      navigate("/");
    } catch (err) {
      return { error: err };
    }
  };
  useEffect(() => {
    file && uploadToFireBase(file, setUser);
  }, [file]);

  const handleResetInfor = (e) => {
    e.preventDefault();

    const resetUser = Object.keys(user).reduce((value, key) => {
      if (key == "email") {
        value[key] = user[key];
      } else {
        value[key] = "";
      }
      return value;
    }, {});

    setUser(resetUser);
  };

  const verify = () => {
    if (currentUser && !emailVerify) {
      currentUser
        .reload()
        .then(function () {
          if (currentUser.emailVerified) {
            setEmailVerify(true);
          } else {
            setEmailVerify(false);
          }
        })
        .catch(function (error) {
          console.log("Error reloading user:", error);
        });
    } else {
      console.log("No user signed in or email already verified");
    }
  };

  useEffect(() => {
    verify();
    return verify();
  }, [currentUser]);

  const handleResetPass = async (e) => {
    e.preventDefault();
    resetPassword(user.email);
  };

  const ChangePassword = (e) => {
    e.preventDefault();

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      oldPassword
    );
    reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        updatePassword(currentUser, newPassword.trim())
          .then(() => alert("Change Password Success"))
          .catch((err) => alert(err));
      })
      .catch(
        (err) =>
          err == "FirebaseError: Firebase: Error (auth/invalid-credential)." &&
          alert("Wrong old password")
      );
  };

  return (
    <div className="container light-style flex-grow-1 container-p-y">
      <ToastContainer />
      <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
      <div className="card overflow-hidden">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="tab-content">
            <div className="tab-pane fade active show" id="account-general">
              <div className="card-body media align-items-center">
                <img
                  src={
                    user?.imgUrl ||
                    "https://bootdey.com/img/Content/avatar/avatar1.png"
                  }
                  className="d-block ui-w-80"
                />
                <div className="media-body ml-4">
                  <label className="btn btn-outline-primary">
                    Upload new photo
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="account-settings-fileinput"
                    />
                  </label>{" "}
                  &nbsp;
                  <button
                    type="button"
                    onClick={handleResetInfor}
                    className="btn btn-primary md-btn-flat"
                  >
                    Reset
                  </button>
                  <div className="text-light small mt-1">
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </div>
                </div>
              </div>
              <hr className="border-light m-0" />
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control mb-1"
                    value={user.username}
                    onChange={handleIputValue}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    className="form-control"
                    value={user.fullname}
                    onChange={handleIputValue}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">E-mail</label>
                  <input
                    type="text"
                    className="form-control mb-1"
                    name="email"
                    disabled={true}
                    value={user.email}
                    onChange={handleIputValue}
                  />
                  {!emailVerify && (
                    <>
                      <div className="alert alert-warning mt-3">
                        Your email is not confirmed. Please check your inbox.
                        <br />
                        <a href="" onClick={handleResetPass}>
                          Resend confirmation
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.company}
                    onChange={handleIputValue}
                    name="company"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Birthday</label>
                  <input
                    type="text"
                    className="form-control"
                    name="birthday"
                    value={user.birthday}
                    onChange={handleIputValue}
                  />
                </div>
                <button
                  className="btn btn-primary my-4 "
                  onClick={(e) => setShowResetPassword((prev) => !prev)}
                >
                  Reset Password
                </button>
                {showResetPassword && (
                  <>
                    <button
                      className="btn btn-primary m-4 "
                      onClick={ChangePassword}
                    >
                      Save Password
                    </button>
                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="currentpassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="newpassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repeat new password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handeSubmitForm}
        >
          Save changes
        </button>
        &nbsp;
        <button type="button" className="btn btn-default">
          <Link to={"/"}>Cancel</Link>
        </button>
      </div>
    </div>
  );
}

export default Profile;
