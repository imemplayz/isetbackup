import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function CoursesModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const user = auth.currentUser;

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (title == "" || desc == "") return;
    const docRef = await addDoc(collection(db, "courses"), {
      title: title,
      desc: desc,
      author: user.displayName,
      date: serverTimestamp(),
      id: "",
    });
    console.log("Document written with ID: ", docRef.id);
    updateDoc(docRef, {
      id: docRef.id,
    });
    window.location.reload();
  };
  if (!open) return null;
  return (
    <form onSubmit={handleAddCourse}>
      <div className="fixed top-0 left-0 bg-gray-500/75">
        <div className="flex flex-col lg:flex-row w-screen h-screen justify-center items-center gap-5 font-sans">
          <div className="flex flex-col gap-3 bg-gray-200 rounded-lg px-8 py-5">
            <div className="flex justify-end">
              <div
                className="bg-yellow-500 rounded-full px-2 text-white hover:bg-yellow-500/25 hover:text-yellow-500 cursor-pointer transition-all ease-in-out duration-150"
                onClick={onClose}
              >
                X
              </div>
            </div>
            <p className="font-bold">New course</p>
            <h1>Title:</h1>
            <input
              type="text"
              placeholder="course title"
              className="bg-transparent outline-none rounded-full focus:bg-gray-300 px-2 py-1 text-gray-500"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <h1>Description:</h1>
            <input
              type="text"
              placeholder="course description"
              className="bg-transparent outline-none rounded-full focus:bg-gray-300 px-2 py-1 text-gray-500"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
            <div>
              <h1 className="mb-2">Upload file</h1>
              <div className="border-dashed border-2 rounded-md border-yellow-500 px-10 py-5 flex flex-col items-center gap-3 text-yellow-500 cursor-pointer">
                <FontAwesomeIcon icon={faUpload} className="text-[40px]" />
                <p>Browse file to upload</p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 px-11 py-2 text-white mt-9 rounded-full hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-150"
            >
              Add course
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CoursesModal;
