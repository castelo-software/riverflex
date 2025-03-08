"use client";

import { useChat } from "@ai-sdk/react";
import MessageArea from "./chat/message-area";
import ChatInput from "./chat/chat-input";

/**
 * Chat component that displays a list of messages and an input field to send new messages.
 *
 * This is a client side component since it requires heavy interaction with the user. It uses the useChat hook from the
 * @ai-sdk/react package to manage the chat state and handle the user input. This hook sends POST requests to the
 * /api/chat route to interact with the AI Assistant, that route will take care of sending the messages to the backend
 * and streaming the responses back to the UI.
 *
 * This component is split into multiple files that render different sub-components. These are located in the chat/
 * directory.
 */
const Chat = () => {
  const { messages, input, status, handleInputChange, handleSubmit } = useChat(
    {}
  );
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col h-full max-w-5xl w-full">
        <MessageArea messages={messages} />
        <ChatInput
          input={input}
          status={status}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Chat;
