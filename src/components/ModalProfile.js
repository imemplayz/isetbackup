import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteUser, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firbase";
import { useNavigate } from "react-router-dom";

function ModalProfile({ open, onClose }) {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [img, setImg] = useState();
  const [imgName, setImgName] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const user = auth.currentUser;

  const updateUserDoc = async () => {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      username: userName,
      email: email,
    });
  };

  const handleUpdate = () => {
    // if (password !== confirmPassword) {
    //   setErr(true);
    //   setErrMsg("Password doesn't match");
    // }
    // updateUserDoc();
    updateProfile(user, {
      displayName: userName ? userName : user.displayName,
      photoURL: img ? img : user.photoURL,
      email: email ? email : user.email,
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  if (!open) return null;
  return (
    <div className="fixed top-0 left-0 bg-gray-500/75">
      <div className="flex flex-col lg:flex-row w-screen h-screen justify-center items-center gap-5 font-sans">
        <div className="flex flex-col gap-3 bg-gray-200 rounded-lg px-8 py-5 mx-4">
          <div>
            <div className="flex justify-end">
              <div
                className="bg-yellow-500 rounded-full px-2 text-white w-fit hover:bg-yellow-500/25 hover:text-yellow-500 cursor-pointer transition-all ease-in-out duration-150"
                onClick={onClose}
              >
                X
              </div>
            </div>
            <h1 className="font-bold mb-3">My profile</h1>
            <h1>Username:</h1>
            <input
              type="text"
              placeholder={user.displayName}
              className="bg-transparent outline-none rounded-full focus:bg-gray-300 px-2 py-1 text-gray-500 w-full"
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
            <h1>Email:</h1>
            <input
              type="email"
              placeholder={user.email}
              className="bg-transparent outline-none rounded-full focus:bg-gray-300 px-2 py-1 text-gray-500 w-full"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="text-center flex-col items-center lg:flex-row gap-24">
            <button
              type="submit"
              className="bg-yellow-500 px-11 lg:mr-5 py-2 text-white mt-9 rounded-full hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-150"
              onClick={() => {
                handleUpdate();
              }}
            >
              Update profile
            </button>
            <button
              className="bg-red-500 px-11 py-2 text-white mt-9 rounded-full hover:bg-red-500/25 hover:text-red-500 transition-all ease-in-out duration-150"
              onClick={() => {
                setShowConfirmation(true);
              }}
            >
              Delete profile
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-gray-200 rounded-lg px-8 py-5">
            <h1 className="font-bold mb-3">Profile Image</h1>
            <img width="70" src={img} className="mx-auto" />
            <div className="relative text-center">
              <button className="bg-gray-500 px-11 py-2 text-white mt-3 rounded-full">
                Choose Image
              </button>
              <input
                type="file"
                className="absolute top-4 -left-24 cursor-pointer opacity-0"
                onChange={(e) => {
                  const [file] = e.target.files;
                  setImg(URL.createObjectURL(file));
                  console.log(img);
                  setImgName(file.name);
                }}
              />
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg px-8 py-5 mb-14 lg:mb-0">
            <div>
              <h1 className="font-bold mb-3">Credentials</h1>
              {err && (
                <div className="bg-red-500 px-3 py-1 text-white rounded-full mb-2">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="mr-2"
                  />
                  {errMsg}
                </div>
              )}
              <h1>New Password:</h1>
              <input
                type="password"
                placeholder="************"
                className="bg-transparent outline-none rounded-full focus:bg-gray-300 px-2 py-1 text-gray-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <h1>Confirm password:</h1>
              <input
                type="password"
                placeholder="************"
                className="bg-transparent outline-none rounded-full focus:bg-gray-300 px-2 py-1 text-gray-500"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && <ConfirmDelete />}
    </div>
  );
}

function ConfirmDelete({ open, onClose }) {
  const user = auth.currentUser;
  const navigate = useNavigate();
  return (
    <div className="absolute top-0 right-0 ml-auto mr-auto w-100">
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="bg-gray-200 px-9 py-2 shadow-lg rounded-lg">
          <p className="text-red-500 font-semibold mb-3 text-center">
            Are you sure?
          </p>
          <div className="flex items-center gap-9">
            <button
              className="bg-red-500 text-white rounded-full px-3 py-1"
              onClick={() => {
                deleteUser(user)
                  .then(() => {
                    navigate("/login", { replace: true });
                  })
                  .catch((error) => {
                    // An error ocurred
                    // ...
                  });
              }}
            >
              YES
            </button>
            <button
              className="bg-green-500 text-white rounded-full px-3 py-1"
              onClick={onClose}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProfile;
