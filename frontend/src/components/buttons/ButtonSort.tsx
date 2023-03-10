import React from "react";

import { HiSortAscending, HiSortDescending } from "react-icons/hi";

import useHover from "../../hooks/useHover";
import useMobile from "../../hooks/useMobile";

interface ButtonSortProps {
  isDescending: boolean;
  setIsDescending: (decending: boolean) => void;
  className?: string;
}

const ButtonSort = ({
  isDescending,
  setIsDescending: setIsDescending,
  className
}: ButtonSortProps) => {
  const [onHover, handleMouseOver, handleMouseOut] = useHover();
  const { isMobile } = useMobile();

  return (
    <div className={`self-center ${className}`}>
      <button
        className="ml-1 flex h-8 w-12 justify-center rounded bg-zinc-800 text-zinc-300 opacity-80 
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
      {onHover && !isMobile && (
        <div className="absolute -m-[52px] h-6 w-max pl-4 text-xs text-zinc-100 opacity-30">
          Sort by Creation time
        </div>
      )}
    </div>
  );
};

export default ButtonSort;
