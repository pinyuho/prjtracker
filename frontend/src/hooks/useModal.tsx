import { useState, Dispatch, SetStateAction } from "react";

function useModal(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [showModal, setShowModal] = useState(false);

  return [showModal, setShowModal]; // to make this hook reusable
}

export default useModal;
