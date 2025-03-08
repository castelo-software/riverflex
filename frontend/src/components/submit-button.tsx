import React from "react";
import { FaArrowUp } from "react-icons/fa";

type SubmitButtonProps = {
  status: string;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { status } = props;
  return (
    <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
      <button
        type="submit"
        disabled={status === "streaming"}
        className={`btn btn-primary rounded-full p-1.5 h-fit`}
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default SubmitButton;
