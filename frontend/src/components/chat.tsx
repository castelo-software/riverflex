"use client";

import { useChat } from "@ai-sdk/react";
import MessageArea from "./message-area";
import ChatInput from "./chat-input";

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
