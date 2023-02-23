import React from "react";

import { IconCustom } from "../../context/IconContext";

import { BiPlusMedical } from "react-icons/bi";

interface ButtonAddProps {
  onClick: () => void;
}

const ButtonSort = ({ onClick }: ButtonAddProps) => {
  return (
    <div
      className="leading-12 fixed right-12 bottom-12 flex h-12 w-12 justify-center rounded-md bg-zinc-700 opacity-60 shadow-lg shadow-black hover:cursor-pointer hover:opacity-90"
      onClick={onClick}
    >
      <IconCustom
        Icon={BiPlusMedical}
        color={"white"}
        className="h-full self-center"
      />
    </div>
  );
};

export default ButtonSort;
