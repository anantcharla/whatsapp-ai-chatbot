import { useEffect, useRef, useState } from "react";
import { FiPaperclip, FiSend, FiSmile, FiPhone, FiVideo, FiUserCheck, FiMessageSquare } from "react-icons/fi";
import { useChat } from "../../context/ChatContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import AISuggestions from "./AISuggestions.jsx";
import EmptyState from "../common/EmptyState.jsx";

/**
 * ChatWindow — center column of the Chat Interface: header, scrollable
 * message thread (WhatsApp-style wallpaper), AI suggestion chips, composer.
 */
export default function ChatWindow() {
  const { activeChat, sendMessage } = useChat();
  const { showToast } = useToast();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages?.length]);

  if (!activeChat) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={<FiMessageSquare size={22} />}
          title="Select a conversation"
          description="Choose a chat from the list to view the conversation history."
        />
      </div>
    );
  }

  const handleSend = () => {
    if (!draft.trim()) return;
    sendMessage(activeChat.id, draft.trim(), "agent");
    setDraft("");
  };

  const handleTakeOver = () => {
    showToast(`You've taken over the conversation with ${activeChat.customer.name}`, "success");
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 bg-white dark:bg-brand-panel px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={activeChat.customer.avatar} alt={activeChat.customer.name} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{activeChat.customer.name}</p>
            <p className="text-xs text-slate-400">{activeChat.online ? "Online" : "Last seen recently"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleTakeOver} className="btn-secondary !py-1.5 !px-3 text-xs">
            <FiUserCheck size={14} /> Take Over
          </button>
          <button className="btn-ghost h-9 w-9 !p-0" aria-label="Voice call"><FiPhone size={16} /></button>
          <button className="btn-ghost h-9 w-9 !p-0" aria-label="Video call"><FiVideo size={16} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-wallpaper flex-1 space-y-3 overflow-y-auto custom-scrollbar px-4 py-4 lg:px-8">
        {activeChat.messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* AI Suggestions */}
      <AISuggestions onSelect={(s) => setDraft(s)} />

      {/* Composer */}
      <div className="flex items-center gap-2 border-t border-slate-100 dark:border-white/10 bg-white dark:bg-brand-panel px-4 py-3">
        <button className="btn-ghost h-10 w-10 !p-0" aria-label="Add emoji"><FiSmile size={18} /></button>
        <button className="btn-ghost h-10 w-10 !p-0" aria-label="Attach file"><FiPaperclip size={18} /></button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="input-field flex-1"
        />
        <button onClick={handleSend} className="btn-primary !px-3.5" aria-label="Send message">
          <FiSend size={16} />
        </button>
      </div>
    </div>
  );
}
