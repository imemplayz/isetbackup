import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        navigate("/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorCode === "auth/user-not-found"
          ? setErrorMsg("Email or password incorrect!")
          : setErrorMsg("failed to login, try again later");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-gray-200 rounded-2xl h-fit w-fit p-8 shadow-lg">
          <div className="flex flex-col gap-3 items-center justify-around m-5">
            <Link to="/">
              <img src={logo} width="40" />
            </Link>
            <h1 className="text-[25px] font-bold font-san">Sign In</h1>
            {error && (
              <div className="bg-red-500 px-3 py-1 text-white rounded-full">
                <FontAwesomeIcon icon={faCircleExclamation} className="mr-2" />
                {errorMsg}
              </div>
            )}
          </div>
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
            <button
              type="submit"
              className="bg-yellow-500 px-11 py-2 text-white mt-3 rounded-full hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-150"
            >
              Sign In
            </button>
            <Link to="/login">
              <div className="flex items-center gap-1">
                <p>Dont have an account? </p>
                <Link to="/signup" className="text-yellow-500 cursor-pointer">
                  create one
                </Link>
              </div>
              <p className="hover:text-yellow-500 cursor-pointer text-center">
                Forgot password?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
