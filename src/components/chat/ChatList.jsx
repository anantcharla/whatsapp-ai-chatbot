import { FiSearch } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useChat } from "../../context/ChatContext.jsx";
import EmptyState from "../common/EmptyState.jsx";

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

/**
 * ChatList — left column of the Chat Interface page. Lists conversations,
 * supports search filtering, shows unread badges and AI-handled indicator.
 */
export default function ChatList() {
  const { conversations, activeChatId, setActiveChatId, markAsRead, searchQuery, setSearchQuery } = useChat();

  const filtered = conversations.filter((c) =>
    c.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col border-r border-slate-100 dark:border-white/10">
      <div className="p-4">
        <h2 className="page-title mb-3">Chats</h2>
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FiSearch size={22} />}
            title="No conversations found"
            description="Try a different name or clear your search."
          />
        ) : (
          filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveChatId(c.id);
                markAsRead(c.id);
              }}
              className={`flex w-full items-start gap-3 border-b border-slate-50 dark:border-white/5 px-4 py-3 text-left transition-colors
                ${activeChatId === c.id ? "bg-brand-green/5" : "hover:bg-slate-50 dark:hover:bg-white/5"}`}
            >
              <div className="relative shrink-0">
                <img src={c.customer.avatar} alt={c.customer.name} className="h-12 w-12 rounded-full object-cover" />
                {c.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-brand-green ring-2 ring-white dark:ring-brand-panel" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">{c.customer.name}</p>
                  <span className="shrink-0 text-[11px] text-slate-400">{timeAgo(c.lastMessageTime)}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{c.lastMessage}</p>
                  {c.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-green px-1.5 text-[10px] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </div>
                {c.aiHandled && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-brand-blue">
                    <HiOutlineSparkles size={11} /> AI handling
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
