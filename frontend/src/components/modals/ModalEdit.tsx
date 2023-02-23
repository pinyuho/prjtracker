import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useGithubApi from "../../hooks/useGithubApi";
import useClickOutside from "../../hooks/useClickOutside";
import useModal from "../../hooks/useModal";

const MIN_BODY_LENGTH = 30;

interface ModalTaskProps {
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  body: string;
  issueNumber: number;
}
const ModalTask = ({
  setShowEditModal,
  title,
  body,
  issueNumber
}: ModalTaskProps) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState(title);
  const [inputBody, setInputBody] = useState(body);
  const { repoOwner, repoName } = useParams();

  const { updateIssue } = useGithubApi();

  useClickOutside(ref, () => setShowEditModal(false));
  // const [ref, showModal, setShowModal, handleDoneClickModal] = useModal();

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputTitle(event.target.value);
  };

  const handleInputBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setInputBody(event.target.value);
  };

  const handleEditClick = () => {
    if (inputTitle === "") {
      alert("Title cannot be empty!");
    } else if (inputBody === null || inputBody?.length < MIN_BODY_LENGTH) {
      alert("Body must be at least 30 characters");
    } else if (repoOwner && repoName && issueNumber) {
      updateIssue(
        repoOwner,
        repoName,
        Number(issueNumber),
        inputTitle,
        inputBody
      );
      // setEditing(false);
      setShowEditModal(false);
      navigate(0); // refresh page
    }
    console.log("repoName: " + issueNumber);
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-3 mx-auto w-[450px] max-w-3xl rounded-md">
          {/*content*/}
          <div
            ref={ref}
            className="relative flex flex-col rounded-md border-0 bg-zinc-800 shadow-lg outline-none focus:outline-none"
          >
            <div className="mb-4 rounded-t-md bg-zinc-800 px-6 py-4 opacity-60 shadow-md shadow-zinc-900">
              <div className="font-lg w-11/12 self-center text-left text-xl font-bold text-zinc-300">
                Quick edit
              </div>
            </div>

            <input
              className="mt-3 h-10 w-11/12 self-center rounded-md border-[1px] border-zinc-600 bg-[#2c2c2cc3] px-3 text-left text-lg 
                font-semibold leading-7 text-zinc-300 shadow-inner shadow-[#1b1b1b] outline-none placeholder-shown:border-red-500"
              type="text"
              onChange={handleInputTitle}
              defaultValue={inputTitle}
              placeholder=" "
            />

            {/*body*/}
            <div className="mt-3 min-h-[300px] w-11/12 self-center rounded-lg border-[1px] border-zinc-600 bg-[#2c2c2cc3] shadow-inner shadow-[#1b1b1b]">
              <textarea
                className=" h-full min-h-[300px] w-full bg-transparent px-3 pt-3 leading-7 text-zinc-300 outline-none"
                onChange={handleInputBody}
                defaultValue={inputBody}
              />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end rounded-b-md py-5 pr-4 pb-8">
              <button
                className="background-transparent mr-1 mb-1 px-6 text-sm font-bold uppercase text-gray-400 outline-none transition-all duration-150 ease-linear hover:text-gray-300 focus:outline-none"
                type="button"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="mr-1 mb-1 rounded bg-[#62a381] px-6 py-1.5 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear
                hover:bg-[#68af8c] hover:shadow-lg focus:outline-none active:bg-[#4c8064]"
                type="button"
                onClick={handleEditClick}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
    </div>
  );
};

export default ModalTask;
