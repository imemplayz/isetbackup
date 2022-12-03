import React from "react";
import NavBar from "../components/NavBar";
import Script from "../components/Script";
import { faEye, faExplosion } from "@fortawesome/free-solid-svg-icons";

const Scripts = () => {
  return (
    <>
      <NavBar />
      <div className="mx-16 my-24 flex flex-col items-center justify-center space-y-5">
        <Script
          name={"Draw"}
          color={"green"}
          icon={faEye}
          codeSnippet={`function changeDistance()
          for i,object in pairs(getElementsByType("object")) do
              if isElement(object) then
                  local elementID = getElementModel(object )
                  engineSetModelLODDistance(elementID,2000)
                  setFogDistance(500) -- Set the fog distance to 500 units, so any weather will appear to be extremely clear
                  setCloudsEnabled ( false )    -- Hide the clouds for all players when the resource starts
      
              end
          end
      end
      addEventHandler("onClientResourceStart",getResourceRootElement(getThisResource()),changeDistance)`}
        />
        <Script
          name={"Explosion"}
          color={"red"}
          icon={faExplosion}
          codeSnippet={`function explosionOnSpawn ( )
          local x, y, z = 0, 0, 0
          -- and create an explosion there
          createExplosion ( x, y, z, 6 )
        end
        -- add this function as a handler for any player that spawns
        addEventHandler ( "onClientPlayerSpawn", localPlayer, explosionOnSpawn )`}
        />
      </div>
    </>
  );
};

export default Scripts;
