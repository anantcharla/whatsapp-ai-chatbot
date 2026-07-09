import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

/** NotFound — catch-all 404 page. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-surface-light dark:bg-surface-dark px-4 text-center">
      <p className="bg-brand-gradient bg-clip-text text-6xl font-black text-transparent">404</p>
      <h1 className="text-xl font-bold text-slate-800 dark:text-white">Page not found</h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard" className="btn-primary mt-3">
        <FiArrowLeft size={16} /> Back to Dashboard
      </Link>
    </div>
  );
}
