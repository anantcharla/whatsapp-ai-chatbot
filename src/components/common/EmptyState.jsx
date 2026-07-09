import { motion } from "framer-motion";

/**
 * EmptyState — shown when a list/section has no data yet.
 * icon: react-icon element, title/description: strings, action: optional node (button)
 */
export default function EmptyState({ icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-3 py-14 px-6 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-dark dark:text-brand-green">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-100">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </motion.div>
  );
}
