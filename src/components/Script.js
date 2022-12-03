import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CodeBlock from "./CodeBlock";

const Script = ({ name, icon, color, codeSnippet }) => {
  return (
    <div className="bg-gray-200 w-full py-5 px-10 rounded-lg hover:bg-gray-300 transition-all ease-in-out duration-150">
      <div className="flex items-center justify-between space-x-36 mx-1">
        <p className={`text-white bg-${color}-500 rounded-lg py-1 px-2`}>
          {name}
        </p>
        <FontAwesomeIcon icon={icon} className={`text-${color}-500`} />
      </div>
      <div className="mt-2">
        <CodeBlock code={codeSnippet} />
      </div>
      <div className="mt-5 mb-2 flex items-center justify-end">
        <button
          className={`bg-${color}-500 py-1 px-5 rounded-full text-white`}
          data-clipboard-target="#script"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default Script;
