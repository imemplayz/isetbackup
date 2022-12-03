import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firbase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastrName, setLastName] = useState("");
  const [img, setImg] = useState();
  const [imgName, setImgName] = useState("");
  const [classesState, setClassesState] = useState(false);
  const [className, setClassName] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (password !== confirmPassword) {
      setErrorMsg("Password doesn't match");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        updateProfile(user, {
          displayName: userName,
          photoURL: img,
        }).then(() => {
          // Profile updated!
          // ...
        });

        await setDoc(doc(db, "users", user.uid), {
          first_name: firstName,
          last_name: lastrName,
          username: userName,
          email: email,
          class: className,
          eliminations: 0,
          isAdmin: false,
          created: serverTimestamp(),
          id: user.uid,
        });

        navigate("/", { replace: true });
        console.log(user);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorCode === "auth/email-already-in-use"
          ? setErrorMsg("Email already in use")
          : setErrorMsg("failed to sign up, try again later");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);

        // ..
      });
  };

  const updateClassName = (newClassName) => {
    setClassName(newClassName);
    setClassesState(false);
  };
  return (
    <form onSubmit={handleSignUp}>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col items-center bg-gray-200 rounded-2xl h-fit w-fit p-8 shadow-lg">
          <div className="flex flex-col gap-3 items-center justify-around m-5">
            <Link to="/">
              <img src={logo} width="40" />
            </Link>
            <h1 className="text-[25px] font-bold font-san">Sign Up</h1>
            {error && (
              <div className="bg-red-500 px-3 py-1 text-white rounded-full">
                <FontAwesomeIcon icon={faCircleExclamation} className="mr-2" />
                {errorMsg}
              </div>
            )}
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col gap-3 items-center justify-around m-5">
              <input
                type="text"
                placeholder="Email"
                className="rounded-full bg-gray-300 shadow-lg px-3 py-1 w-80 focus:outline outline-2 outline-yellow-500/50"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-full bg-gray-300 shadow-lg px-3 py-1 w-80 focus:outline outline-2 outline-yellow-500/50"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="rounded-full bg-gray-300 shadow-lg px-3 py-1 w-80 focus:outline outline-2 outline-yellow-500/50"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-3 items-center justify-around m-5">
              <input
                type="text"
                placeholder="Firstname"
                className="rounded-full bg-gray-300 shadow-lg px-3 py-1 w-80 focus:outline outline-2 outline-yellow-500/50"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Lastname"
                className="rounded-full bg-gray-300 shadow-lg px-3 py-1 w-80 focus:outline outline-2 outline-yellow-500/50"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Username"
                className="rounded-full bg-gray-300 shadow-lg px-3 py-1 w-80 focus:outline outline-2 outline-yellow-500/50"
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
              />
              <div className="relative">
                <div className="rounded-full bg-gray-300 shadow-lg px-3 py-1 w-80 focus:outline outline-2 outline-yellow-500/50 text-gray-400">
                  Choose image <span>({imgName})</span>
                </div>
                <input
                  type="file"
                  className="absolute top-0 cursor-pointer opacity-0"
                  onChange={(e) => {
                    const [file] = e.target.files;
                    setImg(URL.createObjectURL(file));
                    console.log(img);
                    setImgName(file.name);
                  }}
                />
                <img src={img} width="100" className="mt-2" />
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className="flex items-center justify-between rounded-full bg-gray-300 shadow-lg px-3 py-1 w-40 focus:outline outline-2 outline-yellow-500/50 text-gray-400 cursor-pointer"
              onClick={() => {
                setClassesState(!classesState);
              }}
            >
              <div>
                Class <span>({className})</span>
              </div>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {classesState && (
              <div className="absolute rounded-md bg-gray-300 shadow-lg py-2 mt-2 w-40 focus:outline outline-2 outline-yellow-500/50 text-gray-400 cursor-pointer">
                <p
                  className="hover:bg-gray-400/50 px-3"
                  onClick={() => {
                    updateClassName("info 1.1");
                  }}
                >
                  Info 1.1
                </p>
                <p
                  className="hover:bg-gray-400/50 px-3"
                  onClick={() => {
                    updateClassName("info 1.2");
                  }}
                >
                  Info 1.2
                </p>
                <p
                  className="hover:bg-gray-400/50 px-3"
                  onClick={() => {
                    updateClassName("info 1.3");
                  }}
                >
                  Info 1.3
                </p>
                <p
                  className="hover:bg-gray-400/50 px-3"
                  onClick={() => {
                    updateClassName("info 1.4");
                  }}
                >
                  Info 1.4
                </p>
                <p
                  className="hover:bg-gray-400/50 px-3"
                  onClick={() => {
                    updateClassName("info 1.5");
                  }}
                >
                  Info 1.5
                </p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-yellow-500 px-11 py-2 text-white mt-9 rounded-full hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-150"
          >
            Create Account
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 cursor-pointer">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
