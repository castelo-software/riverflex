import { UIMessage } from "ai";
import React from "react";
import MessageBubble from "./message-bubble";
import Link from "next/link";

type MessageAreaProps = {
  messages: UIMessage[];
};

/**
 * Component that displays a list of messages in the chat. The list of messages must be passed as a prop to this
 * component.
 */
const MessageArea = (props: MessageAreaProps) => {
  const { messages } = props;
  return (
    <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
      {messages.length ? (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      ) : (
        <div>
          <h1>Welcome! 🎉</h1>
          <p>
            Through this chat you can talk with the Product Reviews Assistant.
            🤖
          </p>
          <br />
          <p>
            Before starting, make sure that you use the{" "}
            <Link className={"link"} href={"/import"}>
              Import
            </Link>{" "}
            page to provide the CSV file with the product reviews. 📄 Doing that
            will add the reviews to the Vector DB behind this assistant. 🗄️
          </p>
          <br />
          <p>Once you have done that, you may start your conversation! 💬</p>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
