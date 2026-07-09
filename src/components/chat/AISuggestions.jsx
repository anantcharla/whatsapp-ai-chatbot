import { motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";
import { aiSuggestions } from "../../data/dummyData.js";

/**
 * AISuggestions — horizontal strip of AI-generated quick-reply chips shown
 * above the message composer. Clicking a chip fills the composer.
 * 🔌 BACKEND HOOK: fetch suggestions from POST /api/ai/suggest-reply
 */
export default function AISuggestions({ onSelect }) {
  return (
    <div className="border-t border-slate-100 dark:border-white/10 bg-white/70 dark:bg-brand-panel/70 px-4 py-2.5">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-brand-dark dark:text-brand-green">
        <HiOutlineSparkles size={13} /> AI Suggested Replies
      </div>
      <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
        {aiSuggestions.map((s, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(s)}
            className="shrink-0 whitespace-nowrap rounded-full border border-brand-green/30 bg-brand-green/5 px-3.5 py-1.5 text-xs font-medium text-brand-dark dark:text-brand-green hover:bg-brand-green/10"
          >
            {s}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
