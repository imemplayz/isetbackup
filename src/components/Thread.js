import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { auth } from "../firbase";

function Thread({ icon, title, discription, path, usersOnly }) {
  const user = auth.currentUser;
  const navigate = useNavigate();
  return (
    <div
      className={
        usersOnly && !user
          ? "flex items-center gap-5 bg-gray-200/50 text-black/25 pl-10 rounded-lg shadow-md border-1 border-gray-600/50 p-5 mt-4 cursor-not-allowed"
          : "flex items-center gap-5 bg-gray-200 pl-10 rounded-lg shadow-md border-1 border-gray-600 p-5 mt-4 cursor-pointer hover:bg-gray-300 transition ease-in-out duration-200"
      }
      onClick={() => {
        user && navigate(path, { replace: true });
      }}
    >
      <FontAwesomeIcon icon={icon} className="text-[35px]" />
      <div>
        <h1 className="text-lg font-bold">{title}</h1>
        <p>{discription}</p>
      </div>
    </div>
  );
}

export default Thread;
