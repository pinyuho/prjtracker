import React from "react";

import { IconCustom } from "../context/IconContext";
import { TbArrowCurveRight } from "react-icons/tb";

const Login = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex w-full justify-end">
        <IconCustom
          Icon={TbArrowCurveRight}
          color={"white"}
          className="mr-16 mt-3 flex h-6 w-6 opacity-60"
        />
      </div>

      <div className="mx-6 my-2 self-end font-mono text-zinc-400">
        Please login first...
      </div>
    </div>
  );
};

export default Login;
