import React, { useState } from "react";

import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div
      className="my-2 mr-2 flex h-8 w-full flex-row rounded-r-lg bg-zinc-800 opacity-80
      shadow-sm shadow-zinc-700 hover:cursor-text hover:bg-zinc-700"
    >
      {/* Input Field */}
      <input
        className="ml-2 h-8 w-full bg-transparent text-zinc-200 outline-none ring-0 placeholder:text-sm placeholder:text-zinc-500 "
        type="text"
        placeholder="Search..."
        onChange={handleSearchInput}
        value={searchInput}
      />

      {/* Search Icon */}
      <button className="mx-3 h-8">
        <IconContext.Provider
          value={{ color: "grey", className: "global-class-name" }}
        >
          <BsSearch />
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default SearchBox;
