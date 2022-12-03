import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CoursesModal from "../components/CoursesModal";
import NavBar from "../components/NavBar";
import { db } from "../firbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Courses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const q = query(collection(db, "courses"));
  const fetchCourses = async () => {
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
      setCourses(data);
    });
  };
  useEffect(() => {
    fetchCourses();
    console.log(courses);
  }, []);

  const handleDeleteCourse = async (docID) => {
    await deleteDoc(doc(db, "courses", docID)).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <NavBar />
      <div className="mt-24 mx-5 my-5 font-sans flex flex-col gap-3">
        <div className="flex justify-end">
          <div
            className="bg-yellow-500 text-white rounded-lg w-fit px-5 py-3 shadow-md hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-200 cursor-pointer"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <p>Add course</p>
          </div>
        </div>
        {courses.map((item, key) => {
          return (
            <div
              key={key}
              className="relative break-all bg-gray-200 rounded-lg w-full px-5 py-3 shadow-md hover:bg-gray-300 transition-all ease-in-out duration-200 cursor-pointer"
            >
              <p className="font-bold text-2xl">{item.title}</p>
              <p>{item.desc}</p>
              <div className="flex flex-col bottom-1 right-2 text-[10px]">
                <div
                  className="text-right absolute top-2 right-4 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-500/25 hover:text-red-500 transition-all ease-in-out duration-200 cursor-pointer"
                  onClick={() => {
                    handleDeleteCourse(item.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <div>
                  <p className="text-right">{item.author}</p>
                  <p className="text-right">{item.date.toDate().toString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modalOpen && (
        <CoursesModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Courses;
