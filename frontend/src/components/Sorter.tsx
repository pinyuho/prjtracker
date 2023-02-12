import React, { useState } from "react";

import { HiSortAscending, HiSortDescending } from "react-icons/hi";

import useOnHover from "../hooks/useOnHover";

const Sorter = () => {
  const [isDescending, setIsDescending] = useState(true);
  const [onHover, handleMouseOver, handleMouseOut] = useOnHover();

  return (
    <div>
      <button
        className="m-2 mr-3 flex h-8 w-12 justify-center rounded-lg bg-zinc-800 text-zinc-300 opacity-80 
     outline-none ring-0 hover:bg-zinc-700"
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
        <div className="absolute -m-[62px] h-6 w-max pl-8 text-xs text-zinc-500 opacity-20">
          Sort by Creation time
        </div>
      )}
    </div>
  );
};

export default Sorter;
