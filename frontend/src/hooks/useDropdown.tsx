import { useRef, useState, LegacyRef, Dispatch, SetStateAction } from "react";

import useOnClickOutside from "./useOnClickOutside";

function useDropdown(): [
  LegacyRef<HTMLDivElement>,
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const ref = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useOnClickOutside(ref, () => setIsDropdownOpen(false));

  return [ref, isDropdownOpen, setIsDropdownOpen];
}

export default useDropdown;
