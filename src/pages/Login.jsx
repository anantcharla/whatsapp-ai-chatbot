import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Loader from "../components/common/Loader.jsx";

/**
 * Login — dummy authentication screen (no real backend).
 * 🔌 BACKEND HOOK: wire handleSubmit to your real /api/auth/login endpoint
 * via AuthContext.login().
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email });
    showToast("Welcome back! Logged in successfully.", "success");
    navigate("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-light dark:bg-surface-dark px-4">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel relative z-10 grid w-full max-w-4xl overflow-hidden rounded-3xl md:grid-cols-2"
      >
        {/* Left: brand panel */}
        <div className="hidden flex-col justify-between bg-brand-gradient p-10 text-white md:flex">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <HiOutlineSparkles size={20} />
            </div>
            <span className="text-lg font-bold">ChatWave AI</span>
          </div>
          <div>
            <FaWhatsapp size={44} className="mb-4 opacity-90" />
            <h2 className="text-2xl font-bold leading-snug">
              Automate WhatsApp conversations with AI that sounds like you.
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Manage chats, broadcasts, and prompts from one premium dashboard.
            </p>
          </div>
          <div className="flex -space-x-2">
            {[47, 12, 25, 51].map((id) => (
              <img
                key={id}
                src={`https://i.pravatar.cc/80?img=${id}`}
                className="h-9 w-9 rounded-full border-2 border-white/40 object-cover"
                alt="team member"
              />
            ))}
            <span className="ml-4 self-center text-xs text-white/80">Trusted by 2,000+ teams</span>
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white/60 dark:bg-transparent p-8 md:p-10">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Log in to your ChatWave AI dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Email address</label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Password</label>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <input type="checkbox" className="rounded border-slate-300 text-brand-green focus:ring-brand-green" />
                Remember me
              </label>
              <a href="#" className="font-medium text-brand-dark dark:text-brand-green hover:underline">
                Forgot password?
              </a>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full">
              {isLoading ? <Loader size="sm" /> : (
                <>
                  Log in <FiArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              This is a demo — any email/password will log you in.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
