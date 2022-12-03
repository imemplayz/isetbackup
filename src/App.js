import NavBar from "./components/NavBar";
import Thread from "./components/Thread";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faUsers,
  faPause,
  faPlay,
  faGraduationCap,
  faSchool,
  faNewspaper,
  faBook,
  faEdit,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./firbase";
import Marquee from "react-fast-marquee";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import ShoutBox from "./components/ShoutBox";

function App() {
  const docRef = doc(db, "app", "news");
  const [newsMessage, setNewsMessage] = useState("");
  const [showNewsEdit, setShowNewsEdit] = useState(false);
  const [newsEditMessage, setNewsEditMessage] = useState("");

  const newsRef = doc(db, "app", "news");
  const updateNews = async () => {
    await updateDoc(newsRef, {
      news: newsEditMessage,
    });
  };

  const [admin, setAdmin] = useState(false);
  const user = auth.currentUser;

  const isUserAdmin = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAdmin(docSnap.data().isAdmin);
    }
  };

  const newsTicker = onSnapshot(doc(db, "app", "news"), (doc) => {
    setNewsMessage(doc.data().news);
  });

  const [seed, setSeed] = useState(1);
  const [isTickerPaused, setIsTickerPaused] = useState(true);
  const reset = () => {
    setSeed(Math.random());
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isUserAdmin();
        reset();
        // ...
      } else {
        return;
      }
    });
  }, [user]);

  const pauseTicker = () => {
    setIsTickerPaused(!isTickerPaused);
  };

  return (
    <div className="App my-24 font-sans">
      <NavBar key={seed} />
      <div className="mb-5">
        <ShoutBox />
      </div>

      <div className="mx-4">
        <div className="lg:flex justify-around items-center">
          <div className="flex flex-col gap-2 justify-center items-center shadow-md font-bold bg-gray-200 rounded-md py-5 px-24 hover:bg-gray-300 transition ease-in-out duration-200">
            <FontAwesomeIcon
              icon={faUsers}
              className="text-[15px] text-yellow-500"
            />
            <p className="bold text-[20px]">9999</p>
            <p className="text-yellow-500 text-[15px] font-normal">Students</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center shadow-md font-bold bg-gray-200 rounded-md py-5 px-24 hover:bg-gray-300 transition ease-in-out duration-200 mt-5">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-[15px] text-green-500"
            />
            <p className="bold text-[20px]">9999</p>
            <p className="text-green-500 text-[15px] font-normal">Diplomes</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center shadow-md font-bold bg-gray-200 rounded-md py-5 px-24 hover:bg-gray-300 transition ease-in-out duration-200 mt-5">
            <FontAwesomeIcon
              icon={faSchool}
              className="text-[15px] text-indigo-500"
            />
            <p className="bold text-[20px]">4</p>
            <p className="text-indigo-500 text-[15px] font-normal">Sectors</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-sans bg-gray-200 rounded-lg shadow-md mt-16">
          <div className="bg-yellow-500 px-2 py-5 rounded-r-2xl text-white font-bold">
            <FontAwesomeIcon icon={faNewspaper} />
          </div>
          <Marquee
            speed={50}
            gradientColor={[229, 231, 235]}
            pauseOnHover={true}
            play={isTickerPaused}
          >
            {newsMessage}
            {/* <span className="text-yellow-500"> •</span> */}
          </Marquee>
          <div className="relative">
            {admin && (
              <div
                className="bg-yellow-500 px-4 py-1 rounded-full text-white font-bold cursor-pointer hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-200"
                onClick={() => {
                  setShowNewsEdit(!showNewsEdit);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
            )}
            {showNewsEdit && (
              <div className="absolute -left-36 top-12">
                <input
                  type="text"
                  placeholder="news"
                  className="bg-gray-200 shadow-md outline-none text-gray-500  py-2 px-3 rounded-b-md"
                  onChange={(e) => {
                    setNewsEditMessage(e.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon={faAdd}
                  className="bg-yellow-500 px-2 py-1 rounded-full text-white font-bold cursor-pointer hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-200 absolute top-2 right-4"
                  onClick={() => {
                    updateNews();
                  }}
                />
              </div>
            )}
          </div>

          <div
            className="bg-yellow-500 px-4 py-1 rounded-full mr-5 text-white font-bold cursor-pointer hover:bg-yellow-500/25 hover:text-yellow-500 transition-all ease-in-out duration-200"
            onClick={() => {
              pauseTicker();
            }}
          >
            <FontAwesomeIcon icon={isTickerPaused ? faPause : faPlay} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 font-sans bg-gray-200 pl-10 rounded-lg shadow-md border-1 border-gray-600 p-5 mt-16">
          <h1>Join our Discord server</h1>
          <button className="bg-indigo-600 text-white  font-bold px-6 py-2 rounded-full hover:bg-indigo-600/25 hover:text-indigo-600 transition-all ease-in-out delay-150 cursor-pointer">
            <FontAwesomeIcon icon={faDiscord} />
          </button>
        </div>
        <section>
          <h1 className="ml-3 mt-16 pl-9 bold text-2xl">Threads</h1>
          <Thread
            icon={faBullhorn}
            title="Announcements"
            discription="Everything new will be found here"
          />
          <Thread
            icon={faBook}
            title="Courses"
            discription="Courses go here!"
            path={"/courses"}
            usersOnly={true}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
