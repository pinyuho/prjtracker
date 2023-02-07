import React, { useState } from "react";

import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div
      className="flex flex-row m-2 mt-10 h-8 w-11/12 md:w-[910px] self-center rounded-lg border-[1px] border-zinc-500 
    hover:cursor-text focus:border-zinc-400"
    >
      {/* Search Icon */}
      <div className="h-8 m-1.5 mx-3">
        <IconContext.Provider
          value={{ color: "grey", className: "global-class-name" }}
        >
          <BsSearch />
        </IconContext.Provider>
      </div>

      {/* Input Field */}
      <input
        className="h-7 w-full bg-transparent ring-0 outline-0 placeholder:text-zinc-500 text-zinc-200"
        type="text"
        placeholder="Search..."
        onChange={handleSearchInput}
        value={searchInput}
      />

      {/* Delete Icon */}
      <button
        className="p-1.5"
        onClick={() => {
          setSearchInput("");
        }}
      >
        <IconContext.Provider
          value={{ color: "grey", className: "global-class-name" }}
        >
          <TiDelete />
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default SearchBar;
