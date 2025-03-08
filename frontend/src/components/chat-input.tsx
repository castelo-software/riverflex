import React from "react";
import SubmitButton from "./submit-button";

type ChatInputProps = {
  input: string;
  status: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
};

const ChatInput = (props: ChatInputProps) => {
  const { input, status, handleInputChange, handleSubmit } = props;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mx-auto md:pb-6 w-full bg-background pb-4 gap-2"
    >
      {/* flex flex-col gap-4 */}
      <div className="relative w-full">
        <textarea
          name="prompt"
          value={input}
          onChange={handleInputChange}
          className="textarea textarea-bordered shadow-2xl w-full min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl pb-10"
          placeholder="Type your message..."
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              if (status !== "streaming") handleSubmit();
            }
          }}
        />
        <SubmitButton status={status} />
      </div>
    </form>
  );
};

export default ChatInput;
