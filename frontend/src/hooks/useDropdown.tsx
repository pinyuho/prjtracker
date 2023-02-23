import { useRef, useState, LegacyRef, Dispatch, SetStateAction } from "react";

import useClickOutside from "./useClickOutside";

const useDropdown = () => {
  const ref = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useClickOutside(ref, () => setIsDropdownOpen(false));

  return { ref, isDropdownOpen, setIsDropdownOpen };
};

export default useDropdown;
