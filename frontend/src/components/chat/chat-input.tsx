import React from "react";
import SubmitButton from "./submit-button";

type ChatInputProps = {
  input: string;
  status: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
};

/**
 * Component that displays a text area to input messages and a submit button to send them.
 *
 * This component requires certain values obtained from the useChat hook to be passed as props. This will be used to
 * trigger certain logic whenever the user interacts with the input field or submits a new message.
 *
 * @param props.input - The current value of the input field.
 * @param props.status - The current status of the chat. This can be used to block certain actions while the previous
 *  message is being processed.
 * @param props.handleInputChange - The function to handle changes in the input field. This is used to transmit the new
 *  value of the input field to the parent component after submission.
 * @param props.handleSubmit - The function to handle the submission of the input. This is used to transmit the event
 *  indicating that the user has submitted a new message to the parent component.
 */
const ChatInput = (props: ChatInputProps) => {
  const { input, status, handleInputChange, handleSubmit } = props;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mx-auto md:pb-6 w-full bg-background pb-4 gap-2"
    >
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
        <SubmitButton disabled={status === "streaming"} />
      </div>
    </form>
  );
};

export default ChatInput;
