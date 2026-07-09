import { motion } from "framer-motion";

/**
 * Card — base surface used across dashboard/analytics grids.
 * Pass `glass` for a glassmorphism variant.
 */
export default function Card({ children, className = "", glass = false, hover = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -2 } : {}}
      className={`${glass ? "glass-panel rounded-2xl p-5" : "card"} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
