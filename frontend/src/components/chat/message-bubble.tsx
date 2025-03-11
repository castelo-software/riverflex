import { UIMessage } from "ai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageBubbleProps = {
  message: UIMessage;
};

/**
 * Displays a single message bubble that is part of the message area. The message will look different depending on the
 * role of the sender. Message content is rendered using Markdown.
 */
const MessageBubble = (props: MessageBubbleProps) => {
  const { message } = props;

  return (
    <div
      key={message.id}
      className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}
    >
      <div
        className={`chat-bubble shadow-xl rounded-2xl ${
          message.role === "user"
            ? "chat-bubble-primary"
            : "chat-bubble-neutral bg-neutral-900"
        }`}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
      </div>
    </div>
  );
};

export default MessageBubble;
