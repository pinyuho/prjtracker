import React, { useState } from "react";

import { HiSortAscending, HiSortDescending } from "react-icons/hi";

import useOnHover from "../hooks/useOnHover";

const Sorter = () => {
  const [isDescending, setIsDescending] = useState(true);
  const [onHover, handleMouseOver, handleMouseOut] = useOnHover();

  return (
    <div className="self-center">
      <button
        className="ml-1 flex h-8 w-12 justify-center rounded-md bg-zinc-800 text-zinc-300 opacity-80 
     shadow-sm shadow-zinc-700 outline-none ring-0 hover:bg-zinc-700 "
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => setIsDescending(!isDescending)}
      >
        {isDescending ? (
          <HiSortDescending className="mt-1 w-8 self-center" />
        ) : (
          <HiSortAscending className="mt-1 w-8 self-center" />
        )}
      </button>
      {onHover && (
        <div className="absolute -m-[55px] h-6 w-max pl-4 text-xs text-zinc-500 opacity-30">
          Sort by Creation time
        </div>
      )}
    </div>
  );
};

export default Sorter;
