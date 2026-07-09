import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

/**
 * Modal — generic centered modal dialog with backdrop blur.
 * Controlled via `isOpen` boolean; call `onClose` to dismiss.
 */
export default function Modal({ isOpen, onClose, title, children, footer, size = "md" }) {
  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`relative z-10 w-full ${widths[size]} rounded-2xl bg-white dark:bg-brand-panel
              border border-slate-100 dark:border-white/10 shadow-glass`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 px-6 py-4">
              <h2 className="text-base font-semibold text-slate-800 dark:text-white">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10"
                aria-label="Close dialog"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto custom-scrollbar">{children}</div>
            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-white/10 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
