import ChatList from "../components/chat/ChatList.jsx";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import CustomerDetails from "../components/chat/CustomerDetails.jsx";
import { useChat } from "../context/ChatContext.jsx";

/**
 * Chat — WhatsApp-Web-style chat interface.
 * Desktop/tablet (md+): list, window, and customer panel show side by side.
 * Mobile (<md): only one panel shows at a time, controlled by `mobileView`
 * from ChatContext ('list' or 'chat'), with a back button in ChatWindow.
 */
export default function Chat() {
  const { activeChat, mobileView } = useChat();

  return (
    <div className="-m-4 lg:-m-6 flex h-[calc(100vh-64px)] overflow-hidden bg-white dark:bg-brand-panel">
      {/* Chat list: full width on mobile when active, fixed sidebar width on md+ */}
      <div
        className={`${mobileView === "chat" ? "hidden" : "flex"} w-full flex-col md:flex md:w-80 md:shrink-0`}
      >
        <ChatList />
      </div>

      {/* Chat window: hidden on mobile until a chat is selected */}
      <div className={`${mobileView === "list" ? "hidden" : "flex"} w-full flex-col md:flex md:flex-1`}>
        <ChatWindow />
      </div>

      {/* Customer details: desktop only (xl+), same as before */}
      <CustomerDetails customer={activeChat?.customer} />
    </div>
  );
}