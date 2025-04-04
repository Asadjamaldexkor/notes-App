import React, { useState } from "react";
import {
  FaPlus,
  FaTimes,
  FaImage,
  FaPencilAlt,
  FaList,
  FaFont,
} from "react-icons/fa";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
      {isOpen && (
        <div className="flex flex-col items-end space-y-2 transition-all duration-300">
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md">
            <FaImage /> <span>Image</span>
          </button>
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md">
            <FaPencilAlt /> <span>Drawing</span>
          </button>
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md">
            <FaList /> <span>List</span>
          </button>
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md">
            <FaFont /> <span>Text</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-700 p-4 rounded-full text-white shadow-lg transition-all duration-300"
      >
        {isOpen ? <FaTimes size={24} /> : <FaPlus size={24} />}
      </button>
    </div>
  );
};

export default FloatingMenu;
