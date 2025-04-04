import React from "react";
import { MdSearch } from "react-icons/md";

function Search({ setSearchText }) {
  function handleChange(event) {
    setSearchText(event.target.value);
  }
  return (
    <div className="search">
      <MdSearch size="20px" />
      <input type="text" placeholder="Type to search" onChange={handleChange} />
    </div>
  );
}

export default Search;
