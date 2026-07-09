import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiSearch, FiBell, FiSun, FiMoon, FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { notifications as dummyNotifications } from "../../data/dummyData.js";
import Badge from "../common/Badge.jsx";

/**
 * Navbar — top bar with sidebar toggle (mobile), global search, notification
 * bell with dropdown, dark mode switch, and profile menu.
 */
export default function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const unreadCount = dummyNotifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-slate-100 dark:border-white/10 bg-white/80 dark:bg-brand-panel/80 backdrop-blur-xl px-4 py-3 lg:px-6">
      <button onClick={onMenuClick} className="btn-ghost lg:hidden" aria-label="Open menu">
        <FiMenu size={20} />
      </button>

      {/* Global search */}
      <div className="relative hidden flex-1 max-w-md sm:block">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search chats, contacts, articles..."
          className="input-field pl-10"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="btn-ghost h-10 w-10 !p-0"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="btn-ghost relative h-10 w-10 !p-0"
            aria-label="Notifications"
          >
            <FiBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-green ring-2 ring-white dark:ring-brand-panel" />
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="glass-panel absolute right-0 mt-2 w-80 rounded-2xl p-2"
              >
                <div className="flex items-center justify-between px-2 py-1.5">
                  <p className="text-sm font-semibold">Notifications</p>
                  <Badge variant="success">{unreadCount} new</Badge>
                </div>
                <div className="mt-1 max-h-72 space-y-0.5 overflow-y-auto custom-scrollbar">
                  {dummyNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-white/5 ${
                        !n.read ? "bg-brand-green/5" : ""
                      }`}
                    >
                      <p className="font-medium text-slate-700 dark:text-slate-100">{n.title}</p>
                      <p className="text-xs text-slate-400">{n.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-brand-green/30"
            />
            <span className="hidden text-sm font-medium sm:block">{user?.name?.split(" ")[0]}</span>
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="glass-panel absolute right-0 mt-2 w-56 rounded-2xl p-2"
              >
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <div className="my-1 h-px bg-slate-100 dark:bg-white/10" />
                <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-white/5">
                  <FiUser size={16} /> My Profile
                </Link>
                <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-white/5">
                  <FiSettings size={16} /> Settings
                </Link>
                <div className="my-1 h-px bg-slate-100 dark:bg-white/10" />
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <FiLogOut size={16} /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
