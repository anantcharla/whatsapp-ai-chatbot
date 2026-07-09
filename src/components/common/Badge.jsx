const VARIANTS = {
  success: "bg-brand-green/10 text-brand-dark dark:text-brand-green",
  info: "bg-brand-blue/10 text-brand-blue",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  danger: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  neutral: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
};

/**
 * Badge — small status pill. variant: success | info | warning | danger | neutral
 */
export default function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
