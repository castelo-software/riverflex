import React from "react";
import { FaArrowUp } from "react-icons/fa";

type SubmitButtonProps = {
  disabled?: boolean;
};

/**
 * Component that displays a submit button to send a message. The button is disabled while the chat is in the streaming
 */
const SubmitButton = (props: SubmitButtonProps) => {
  const { disabled } = props;
  return (
    <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
      <button
        type="submit"
        disabled={disabled}
        className={`btn btn-primary rounded-full p-1.5 h-fit`}
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default SubmitButton;
