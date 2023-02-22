import React, { Dispatch, SetStateAction, useRef } from "react";

import useOnClickOutside from "../hooks/useOnClickOutside";

interface ModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleDeleteClick: () => void;
}
const ModalDelete = ({ setShowModal, handleDeleteClick }: ModalProps) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-3 mx-auto w-[450px] max-w-3xl rounded-lg">
          {/*content*/}
          <div
            ref={ref}
            className="relative flex w-full flex-col rounded-lg border-0 bg-zinc-800 shadow-lg outline-none focus:outline-none"
          >
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-zinc-700 py-3 px-6">
              <div className="text-xl font-semibold text-zinc-300">
                Delete task
              </div>
            </div>

            {/*body*/}
            <div className="relative flex-auto px-6">
              <p className="my-4 text-sm leading-relaxed text-zinc-300">
                Are you sure you want to delete this task? <br />
                Deletion means this github issue would be closed and no longer
                visible on our website. However, you can still check the closed
                issue on your own github page.
              </p>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-zinc-700 p-3">
              <button
                className="background-transparent mr-1 mb-1 px-6 text-sm font-bold uppercase text-gray-400 outline-none transition-all duration-150 ease-linear hover:text-gray-300 focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="mr-1 mb-1 rounded bg-red-500 px-6 py-1.5 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-[#f34e4e] hover:shadow-lg focus:outline-none active:bg-[#de2626]"
                type="button"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
    </div>
  );
};

export default ModalDelete;
