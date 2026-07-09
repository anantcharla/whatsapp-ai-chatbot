import { motion } from "framer-motion";
import { FiCheck, FiCheckCircle } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

/**
 * MessageBubble — single chat message. `sender` is 'agent' | 'ai' | 'customer'.
 * Agent + AI messages align right (outgoing); customer messages align left.
 */
export default function MessageBubble({ message }) {
  const isOutgoing = message.sender === "agent" || message.sender === "ai";
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm
          ${
            isOutgoing
              ? "rounded-br-sm bg-brand-gradient text-white"
              : "rounded-bl-sm bg-white dark:bg-white/10 text-slate-700 dark:text-slate-100"
          }`}
      >
        {message.sender === "ai" && (
          <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-white/80">
            <HiOutlineSparkles size={11} /> AI Reply
          </span>
        )}
        <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
        <div className={`mt-1 flex items-center gap-1 ${isOutgoing ? "justify-end text-white/70" : "justify-end text-slate-400"}`}>
          <span className="text-[10px]">{time}</span>
          {isOutgoing && (message.status === "read" ? <FiCheckCircle size={12} /> : <FiCheck size={12} />)}
        </div>
      </div>
    </motion.div>
  );
}
