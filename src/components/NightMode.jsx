import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function NightMode() {
    const indicator = document.getElementById("indicator")
    const [nightMode, setNightMode] = useState(false)
  return (
    <div className="bg-gray-200 px-3 py-2 rounded-full flex gap-5 cursor-pointer relative transition-all ease-in-out duration-350"
    onClick={() => {
        if (nightMode) {
            indicator.classList.remove('left-[0.350rem]')
            indicator.classList.add('right-[0.350rem]')
            setNightMode(false)
        } else {
            indicator.classList.remove('right-[0.350rem]')
            indicator.classList.add('left-[0.350rem]')
            setNightMode(true)
        }
        
    }}>
          <div id='indicator' className="absolute top-1 right-[0.350rem] px-3.5 py-3.5 bg-gray-400/50 rounded-full"></div>
          <div className="text-sm text-gray-500 z-10">
            <FontAwesomeIcon icon={faMoon} />
          </div>
          <div className="text-sm text-yellow-500 z-10">
            <FontAwesomeIcon icon={faSun} />
          </div>
        </div>
  )
}

export default NightMode