import React from "react";

function Header({ darkMode, setDarkMode }) {
  return (
    <div className="header">
      <p>MagicNotesApp</p>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center 
                  bg-gray-200 dark:bg-gray-700 rounded-full shadow-md transition-all"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>
    </div>
  );
}

export default Header;
