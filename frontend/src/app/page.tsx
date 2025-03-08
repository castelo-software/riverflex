import Chat from "@/components/chat";

/**
 * Main page of the application. For the moment, this page displays a chat component and nothing more. The Chat
 * component is defined in a dedicated file, making it possible to use it in multiple places in the application if that
 * would ever be necessary.
 */
export default function Page() {
  return <Chat />;
}
