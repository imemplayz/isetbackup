import {
    doc,
    updateDoc,
  } from "firebase/firestore";
  import React, { useState } from "react";
  import { auth, db } from "../firbase";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faSpinner, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
  import { Notify } from 'notiflix/build/notiflix-notify-aio';

const UpdateUserModal = ({ open, id, onClose }) => {
    const [currentEleminations, setElminations] = useState("");
    const [isLoading, setIsLoading] = useState(false)
  
    const user = auth.currentUser;
  

const handleUpdateUser = (e) => {
      e.preventDefault()
      if (currentEleminations == "") return;
      setIsLoading(true)
      const docRef = doc(db, "users", id);
      updateDoc(docRef, {
        eliminations: currentEleminations,
      }).then(() => {
        onClose()
        setIsLoading(false)
        Notify.success('User updated successfuly', {cssAnimationStyle: "from-right", borderRadius: "60px", fontSize: "16px"});
      });
      
}

    if (!open) return null;
    return (
      <form onSubmit={handleUpdateUser}>
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
              <p className="font-bold">Update User: <span className="font-normal color-gray-500 text-[14px]">{id}</span></p>
              <p className="font-bold"></p>
              <h1>Eliminations:</h1>
              <input
                type="number"
                placeholder="eliminations"
                max="3"
                min="0"
                className="bg-transparent outline-none rounded-full focus:bg-gray-300 px-2 py-1 text-gray-500"
                onChange={(e) => {
                  setElminations(e.target.value);
                }}
              />
              {isLoading? <button
                type="submit"
                className="bg-yellow-500 px-11 py-2 text-white mt-9 rounded-full hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-150"
              >
                 <FontAwesomeIcon icon={faSpinner}  className="animate-spin mr-2"/>
                 Updating...
                
              </button>
              :
              <button
                type="submit"
                className="bg-yellow-500 px-11 py-2 text-white mt-9 rounded-full hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-150"
              >
                 Update
                
              </button>
              }
            </div>
          </div>
        </div>
      </form>
    );
}

export default UpdateUserModal