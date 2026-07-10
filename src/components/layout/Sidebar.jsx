import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiMessageCircle,
  FiBarChart2,
  FiBookOpen,
  FiSend,
  FiCpu,
  FiSettings,
  FiX,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/chat", label: "Chats", icon: FiMessageCircle, badge: 3 },
  { to: "/analytics", label: "Analytics", icon: FiBarChart2 },
  { to: "/knowledge-base", label: "Knowledge Base", icon: FiBookOpen },
  { to: "/broadcast", label: "Broadcast", icon: FiSend },
  { to: "/prompts", label: "Prompt Management", icon: FiCpu },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

/**
 * Sidebar — primary navigation. Responsive: becomes an off-canvas drawer
 * on mobile, controlled by `isOpen`/`onClose` from DashboardLayout.
 */
export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 transform bg-brand-dark text-white
          transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
                <HiOutlineSparkles className="text-white" size={18} />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">ChatWave AI</p>
                <p className="text-[11px] text-white/50">WhatsApp AI Suite</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white lg:hidden" aria-label="Close menu">
              <FiX size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar px-3">
            {NAV_ITEMS.map(({ to, label, icon: Icon, badge }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all
                  ${isActive ? "bg-white/10 text-white shadow-inner" : "text-white/60 hover:bg-white/5 hover:text-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-pill"
                        className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-brand-green"
                      />
                    )}
                    <Icon size={18} />
                    <span className="flex-1">{label}</span>
                    {badge && (
                      <span className="rounded-full bg-brand-green px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Plan / upgrade card */}
          <div className="m-3 rounded-xl bg-white/5 p-4 border border-white/10">
            <p className="text-xs font-semibold text-white/80">Growth Plan</p>
            <p className="mt-1 text-[11px] text-white/50">12,400 / 20,000 messages used</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
              <div className="h-1.5 w-[62%] rounded-full bg-brand-gradient" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}