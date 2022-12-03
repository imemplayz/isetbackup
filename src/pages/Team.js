import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firbase";

const Team = () => {
  const [staff, setStaff] = useState([]);

  const fetchStaff = async () => {
    const q = query(collection(db, "users"), where("isAdmin", "==", true));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
      setStaff(data);
    });
  };
  useEffect(() => {
    fetchStaff();
    console.log(staff);
  }, []);
  return (
    <>
      <NavBar />
      <div className="mx-16 my-24 grid grid-cols-5 gap-4">
        {staff.map((item, key) => {
          return (
            <div
              key={key}
              className=" bg-gray-200 rounded py-5 px-16 w-fit flex flex-col gap-5 justify-center items-center hover:bg-gray-300"
            >
              <div className="bg-red-500 rounded-full px-4 py-4"></div>
              <div className="text-center">
                <h2>{item.username}</h2>
                <h4 className="font-bold text-red-500">ADMIN</h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Team;
