import { createContext, useContext, useState } from "react";
import { conversations as dummyConversations } from "../data/dummyData.js";

const ChatContext = createContext(null);

/**
 * ChatProvider — holds the in-memory chat state used by the Chat Interface.
 * All data here is dummy/local. In production this would be backed by a
 * WebSocket/Socket.IO connection + REST history endpoint.
 */
export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState(dummyConversations);
  const [activeChatId, setActiveChatId] = useState(dummyConversations[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  // Controls which panel shows on mobile screens: 'list' or 'chat'
  const [mobileView, setMobileView] = useState("list");

  const activeChat = conversations.find((c) => c.id === activeChatId) || null;

  // 🔌 BACKEND HOOK: replace with POST /api/conversations/:id/messages
  const sendMessage = (chatId, text, sender = "agent") => {
    const newMessage = {
      id: crypto.randomUUID(),
      sender, // 'agent' | 'customer' | 'ai'
      text,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: text,
            lastMessageTime: newMessage.timestamp,
          }
          : c
      )
    );

    // Simulate an AI auto-reply for demo purposes only
    if (sender === "agent") {
      setTimeout(() => {
        const aiReply = {
          id: crypto.randomUUID(),
          sender: "customer",
          text: "Thanks for the quick response! 🙌",
          timestamp: new Date().toISOString(),
          status: "sent",
        };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === chatId
              ? {
                ...c,
                messages: [...c.messages, aiReply],
                lastMessage: aiReply.text,
                lastMessageTime: aiReply.timestamp,
              }
              : c
          )
        );
      }, 1600);
    }
  };

  const markAsRead = (chatId) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c))
    );
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeChat,
        activeChatId,
        setActiveChatId,
        sendMessage,
        markAsRead,
        searchQuery,
        setSearchQuery,
        mobileView,
        setMobileView,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
