import React, { useEffect } from 'react'
import logo from "../images/logo.png";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../firbase';
import { addDoc, collection, getDocs, onSnapshot, query, serverTimestamp, updateDoc } from 'firebase/firestore';

function ShoutBox() {
    const [shout, setShout] = useState("")

    const user = auth.currentUser
    const sendMessage = async (e) => {
        e.preventDefault();
        if (shout == "") return;
        const docRef = await addDoc(collection(db, "shoutbox"), {
          sender_name: user.displayName,
          sender_image: user.photoURL,
          sender_id: user.uid,
          message: shout,
          date: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        updateDoc(docRef, {
          message_id: docRef.id,
        });
      };

      //////////

      const [messages, setMessages] = useState([]);

  

  const updateShoutbox = onSnapshot(collection(db, "shoutbox"), (doc) => {
    let data = [];
    doc.forEach((doc) => {
      data.push(doc.data());
      setMessages(data);
    });
  });

  return (
    <form onSubmit={sendMessage}>
    <div className="flex flex-col items-center">
        <div className="lg:w-[40rem]">
          <div className="bg-gray-400 rounded-t-lg text-white font-bold py-1 px-2">
            Shoutbox
          </div>
          <div className="bg-gray-200 max-h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full">
          {messages.map((item, key) => {
          return (
            <div className="flex items-center gap-2 text-sm px-2 py-2 cursor-default hover:bg-gray-500/25 transition-all ease-in-out duration-200">
              <img src={item.sender_image} className="rounded-full w-9 h-9" />
              <div>
                <h1>{item.sender_name}</h1>
                <p>{item.message}</p>
              </div>
            </div>
          );
        })}
          </div>
          <div className="flex justify-center items-center gap-3 bg-gray-200 rounded-b-lg px-2">
            <input
              type="text"
              placeholder="type something"
              className={user ? "bg-gray-400 rounded-full my-2 w-full  py-2 px-4 outline-none text-white placeholder-gray-100": "bg-gray-400/25 rounded-full my-2 w-full  py-2 px-4 outline-none text-white/25 placeholder-gray-100 cursor-not-allowed"}
              disabled={!user && true}
              onChange={(e) => {
                setShout(e.target.value);
              }}
            />
            <button type='submit' className={user ? 'bg-gray-400 rounded-full px-3 py-2 text-gray-100 cursor-pointer hover:bg-gray-400/25 hover:text-gray-400 transition-all ease-in-out duration-200': 'bg-gray-400/25 rounded-full px-3 py-2 text-gray-100 cursor-not-allowed'}><FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
        </div>
      </div>
      </form>
  )
}

export default ShoutBox