import React from "react";

import { IconContext } from "react-icons";
import { TbArrowCurveRight } from "react-icons/tb";

const Login = () => {
  return (
    <div className="flex flex-col">
      <IconContext.Provider
        value={{ color: "white", className: "global-class-name" }}
      >
        <TbArrowCurveRight className="mr-12 mt-3 h-6 w-6 self-end opacity-60" />
      </IconContext.Provider>

      <div className="mx-6 my-2 self-end font-mono text-zinc-400">
        Please login first...
      </div>
    </div>
  );
};

export default Login;
