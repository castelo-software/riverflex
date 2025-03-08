import { UIMessage } from "ai";
import React from "react";
import MessageBubble from "./message-bubble";

type MessageAreaProps = {
  messages: UIMessage[];
};

const MessageArea = (props: MessageAreaProps) => {
  const { messages } = props;
  return (
    <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageArea;
