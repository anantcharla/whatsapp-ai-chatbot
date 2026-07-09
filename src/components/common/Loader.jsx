import { motion } from "framer-motion";

/**
 * Loader — spinner used for full-page / inline loading states.
 * size: 'sm' | 'md' | 'lg'
 */
export default function Loader({ size = "md", label }) {
  const sizes = { sm: 18, md: 28, lg: 40 };
  const dimension = sizes[size] ?? sizes.md;

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <motion.div
        style={{ width: dimension, height: dimension }}
        className="rounded-full border-[3px] border-brand-green/20 border-t-brand-green"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />
      {label && <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>}
    </div>
  );
}

/** Skeleton block for shimmering placeholder content */
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse-soft rounded-lg bg-slate-200 dark:bg-white/10 ${className}`}
    />
  );
}
