import ChatList from "../components/chat/ChatList.jsx";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import CustomerDetails from "../components/chat/CustomerDetails.jsx";
import { useChat } from "../context/ChatContext.jsx";

/**
 * Chat — WhatsApp-Web-style three-column chat interface page.
 * Composed of ChatList (left), ChatWindow (center), CustomerDetails (right).
 */
export default function Chat() {
  const { activeChat } = useChat();

  return (
    <div className="-m-4 lg:-m-6 flex h-[calc(100vh-64px)] overflow-hidden rounded-none bg-white dark:bg-brand-panel">
      <div className="w-full max-w-xs shrink-0">
        <ChatList />
      </div>
      <ChatWindow />
      <CustomerDetails customer={activeChat?.customer} />
    </div>
  );
}
