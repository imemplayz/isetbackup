import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { auth } from "../firbase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Map from "../components/Map";

function Maps() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return navigate("/403", { replace: true });
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="mx-16 my-24 space-y-5">
        <div className="flex justify-between items-center bg-gray-200 rounded-lg px-5 hover:bg-gray-300 transition-all ease-in-out duration-150 focus-within:outline outline-2 outline-gray-500/50">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="search"
            className="py-3 px-8 w-full border-none outline-none bg-transparent"
          />
        </div>
        <Map mapName={"Road of Destiny 2"} author={"idkwho"} color={"red"} />
        <Map
          mapName={"Insomnia"}
          author={"iMeMPlayZ ft. KretA ft. M3MO"}
          color={"yellow"}
        />
        <Map mapName={"Backwards Age V10"} author={"Kalepe"} color={"blue"} />
        <Map
          mapName={"Insomnia"}
          author={"iMeMPlayZ ft. KretA ft. M3MO"}
          color={"green"}
        />
      </div>
    </>
  );
}

export default Maps;
