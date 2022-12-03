import React from "react";

const Map = ({ mapName, author, color }) => {
  return (
    <div className="flex justify-between items-center bg-gray-200 rounded-lg py-5 px-10 hover:bg-gray-300 transition-all ease-in-out duration-150">
      <div className="flex justify-between items-center space-x-5">
        <div className={`h-5 w-5 bg-${color}-500 rounded-full`} />
        <p className="">{mapName}</p>
        <p>-</p>
        <p>{author}</p>
      </div>
      <div>
        <button className={`bg-${color}-500 py-2 px-6 rounded-full text-white`}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Map;
