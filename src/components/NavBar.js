import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faRightToBracket,
  faRightFromBracket,
  faSearch,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import ModalProfile from "./ModalProfile";
import NightMode from "./NightMode";

function NavBar() {
  const user = auth.currentUser;
  const [classesState, setClassesState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const isUserAdmin = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAdmin(docSnap.data().isAdmin);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isUserAdmin();
      } else {
        return;
      }
    });
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login", { replace: true });
        console.log(user);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const navBar = document.getElementById("navbar");
  const [navbarActive, setNavbarActive] = useState(false);

  return (
    <div className="">
      <div className="flex z-10 items-center justify-between px-5 lg:px-16  bg-white dark:bg-gray-700 py-4 shadow-md rounded-b-xl fixed top-0 left- w-full">
        <div className="items-center gap-3 flex">
          <Link to="/">
            <img src={logo} width="40" className="" />
          </Link>
          {user && (
            <div className="relative  hidden lg:block">
              <div
                className="bg-blue-500/25 dark:bg-blue-700/25 text-blue-700 px-3 py-1 ml-9 rounded-full w-fit cursor-pointer overflow-hidden"
                onClick={() => {
                  setClassesState(!classesState);
                }}
              >
                Classes <FontAwesomeIcon icon={faCaretDown} />
              </div>

              {classesState && (
                <div className="bg-blue-500/25 absolute left-8 py-2 mt-1 w-24 rounded-md text-blue-700">
                  <p className="hover:bg-blue-500/50 cursor-pointer pl-2">
                    Info 1.1
                  </p>
                  <p className="hover:bg-blue-500/50 cursor-pointer pl-2">
                    Info 1.2
                  </p>
                  <p className="hover:bg-blue-500/50 cursor-pointer pl-2">
                    Info 1.3
                  </p>
                  <p className="hover:bg-blue-500/50 cursor-pointer pl-2">
                    Info 1.4
                  </p>
                  <p className="hover:bg-blue-500/50 cursor-pointer pl-2">
                    Info 1.5
                  </p>
                </div>
              )}
            </div>
          )}
          {user && (
            <Link to="/team">
              <div className="hidden lg:block bg-blue-500/25 dark:bg-blue-700/25 text-blue-700 px-2 py-1 rounded-full w-fit cursor-pointer">
                Staff
              </div>
            </Link>
          )}
        </div>
        <div className="hidden lg:flex items-center gap-5 bg-gray-200 dark:bg-gray-400 px-2 py-1 rounded-full focus-within:outline outline-4 outline-yellow-500/50 transition-all ease-in-out duration-100">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="search"
            className="outline-0 bg-transparent w-80"
          ></input>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="hidden lg:block">
            <NightMode />
          </div>

          {user && (
            <div
              className="flex items-center gap-2 bg-yellow-500/25 dark:bg-yellow-700/25 text-yellow-600 px-2 py-1 rounded-full w-fit cursor-pointer"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              {user.displayName}
              <div className="relative">
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                  className="rounded-full w-6 h-6"
                />
                <div className="absolute right-0 -bottom-0 w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          )}
          <FontAwesomeIcon
            icon={faBars}
            className="text-[25px] lg:hidden text-yellow-500 -mr-3"
            onClick={() => {
              if (navbarActive) {
                navBar.classList.remove("left-[0rem]");
                navBar.classList.add("left-[100rem]");
                setNavbarActive(false);
              } else {
                navBar.classList.remove("left-[100rem]");
                navBar.classList.add("left-[0rem]");
                setNavbarActive(true);
              }
            }}
          />
          {admin && (
            <Link to="/users">
              <div className="hidden lg:block bg-yellow-500/25 dark:bg-yellow-700/25 text-yellow-600 px-2 py-1 rounded-full w-fit cursor-pointer">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </Link>
          )}

          {user ? (
            <div
              className="hidden lg:flex items-center gap-1 bg-yellow-500/25 dark:bg-yellow-700/25 text-yellow-600 px-3 py-2 lg:py-1 rounded-full w-fit cursor-pointer"
              onClick={handleSignout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p className="hidden lg:block">Log Out</p>
            </div>
          ) : (
            <Link to="/login">
              <div className="hidden lg:flex items-center gap-1 bg-yellow-500/25 text-yellow-700 px-3 py-1 rounded-full w-fit cursor-pointer">
                <FontAwesomeIcon icon={faRightToBracket} />{" "}
                <p className="hidden lg:block">Sign In</p>
              </div>
            </Link>
          )}
        </div>
        <div
          id="navbar"
          className="absolute p-5 top-[4.5rem] left-[100rem] h-screen w-screen bg-gray-500/50 transition-all ease-in-out duration-400 lg:hidden"
        >
          <div className="flex items-center gap-5 bg-gray-200 px-3 py-2 mb-5 rounded-full focus-within:outline outline-4 outline-yellow-500/50 transition-all ease-in-out duration-100">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="search"
              className="outline-0 bg-transparent w-80"
            ></input>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div
                className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-2 lg:py-1 rounded-full w-fit cursor-pointer"
                onClick={handleSignout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p>Log Out</p>
              </div>
            ) : (
              <Link to="/login">
                <div className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full w-fit cursor-pointer">
                  <FontAwesomeIcon icon={faRightToBracket} /> <p>Sign In</p>
                </div>
              </Link>
            )}
            {admin && (
              <Link to="/users">
                <div className="bg-yellow-500 text-white px-3 py-2 rounded-full w-fit cursor-pointer">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </Link>
            )}
            {user && (
              <Link to="/maps">
                <div className="bg-blue-500 text-white px-3 py-2 rounded-full w-fit cursor-pointer">
                  Maps
                </div>
              </Link>
            )}
            <NightMode />
          </div>
        </div>
        {modalOpen && (
          <ModalProfile
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
export default NavBar;
