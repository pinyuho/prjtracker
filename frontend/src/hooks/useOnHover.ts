import { useState } from "react";

const useOnHover = (): [boolean, () => void, () => void] => {
  const [onHover, setOnHover] = useState(false);

  const handleMouseOver = () => {
    setOnHover(true);
  };

  const handleMouseOut = () => {
    setOnHover(false);
  };

  return [onHover, handleMouseOver, handleMouseOut];
};

export default useOnHover;
