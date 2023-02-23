import React, { Dispatch, ReactNode, SetStateAction } from "react";

import { IconCustom } from "../context/IconContext";

interface TaskPropertyProps {
  loading: boolean;
  icon: any;
  title: string;
  content: string | ReactNode;
  isContentTextStyle: boolean;

  isDropdownOpen?: boolean;
  setIsDropdownOpen?: Dispatch<SetStateAction<boolean>>;
}
const TaskProperty = ({
  loading,
  icon,
  title,
  content,
  isContentTextStyle
}: TaskPropertyProps) => {
  return (
    <div className="flex flex-row">
      <div className="flex h-7 w-40 truncate px-2 py-1 text-left font-mono text-sm text-zinc-600">
        <IconCustom
          Icon={icon}
          color={"grey"}
          className="mr-1 flex h-full self-center opacity-50"
        />
        {title}
      </div>
      {!loading &&
        (isContentTextStyle ? (
          <div className="flex h-7 truncate px-2 py-1 text-left font-mono text-sm text-zinc-600">
            {content}
          </div>
        ) : (
          <div>{content}</div>
        ))}
    </div>
  );
};

export default TaskProperty;
