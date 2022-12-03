import React, { useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import UpdateUserModal from "./UpdateUserModal";

const User = ({ name, eli }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleFilter, setToggleFilter] = useState(false);
  const [filterTerm, setFilterTerm] = useState("first_name");
  const [userID, setUserID] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [users, setUsers] = useState([]);

  const updateUsersList = onSnapshot(collection(db, "users"), (doc) => {
    let data = [];
    doc.forEach((doc) => {
      data.push(doc.data());
      setUsers(data);
    });
  });

  useEffect(() => {
    console.log(users);
  }, []);

  return (
    <div className="mx-4 my-20">
      <div className="flex justify-between items-center gap-2 px-4 border-b border-slate-300 bg-gray-200">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="search"
          name="search"
          id="users"
          placeholder="Filer users"
          className="flex-1 bg-gray-200 py-1 outline-0"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button className="bg-indigo-700 text-[10px] lg:text-sm hover:bg-indigo-700/25 transition-all duration-200 text-white hover:text-indigo-700 rounded-xl px-2 py-1 my-2 text-bold">
          ADD USER
        </button>
        <div className="relative">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="ml-2 cursor-pointer"
            onClick={() => {
              setToggleFilter(!toggleFilter);
            }}
          />
          {toggleFilter && (
            <div className="bg-white absolute right-0 w-36 my-2 pl-1 rounded-md shadow-md">
              <p
                className="cursor-pointer hover:bg-gray-300/25"
                onClick={() => {
                  setFilterTerm("first_name");
                  console.log(filterTerm);
                }}
              >
                Filter by first name
              </p>
              <p
                className="cursor-pointer hover:bg-gray-300/25"
                onClick={() => {
                  setFilterTerm("last_name");
                  console.log(filterTerm);
                }}
              >
                Filter by last name
              </p>
              <p
                className="cursor-pointer hover:bg-gray-300/25"
                onClick={() => {
                  setFilterTerm("email");
                  console.log(filterTerm);
                }}
              >
                Filter by email
              </p>
            </div>
          )}
        </div>
      </div>
      <table className="w-full border border-slate-200 divide-y divide-slate-200 text-left text-[8px] lg:text-sm">
        <tr className="bg-gray-200">
          <th className="px-3 py-1">First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Class</th>
          <th>Eliminations</th>
        </tr>
        {users
          .filter((value) => {
            if (searchTerm === "") {
              return value;
            } else if (
              value.first_name
                .toLowerCase()
                .startsWith(searchTerm.toLowerCase())
            ) {
              return value;
            }
          })
          .map((value, key) => {
            return (
              <tr
                className={
                  value.eliminations >= 3
                    ? "bg-red-500/25 text-red-500 font-bold hover:bg-red-700/25 transition-all ease-in-out duration-200"
                    : value.eliminations >= 2
                    ? "bg-orange-500/25 text-orange-500 font-bold hover:bg-orange-700/25 transition-all ease-in-out duration-200"
                    : value.eliminations >= 1
                    ? "bg-yellow-500/25 text-yellow-500 font-bold hover:bg-yellow-700/25 transition-all ease-in-out duration-200"
                    : "bg-gray-200/25 hover:bg-gray-400/25 transition-all ease-in-out duration-200"
                }
                key={key}
              >
                <td className="p-3">{value.first_name}</td>
                <td>{value.last_name}</td>
                <td>{value.email}</td>
                <td>{value.class}</td>
                <td className="flex justify-between items-center my-1">
                  {value.eliminations}
                  <div className="flex mr-3">
                    <div>
                      <button
                        className="hover:bg-yellow-400/25 transition-all duration-200 text-yellow-400 rounded-xl py-2 px-3 ml-5 text-bold"
                        onClick={() => {
                          setModalOpen(true);
                          setUserID(value.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </div>
                    <button className="hover:bg-red-400/25 transition-all duration-200 text-red-400 rounded-xl py-2 px-3 ml-0 text-bold">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </table>
      {modalOpen && (
        <UpdateUserModal
          open={modalOpen}
          id={userID}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default User;
