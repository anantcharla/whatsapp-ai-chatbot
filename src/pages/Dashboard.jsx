import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown, FiZap, FiSend, FiUsers, FiBookOpen } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import Card from "../components/common/Card.jsx";
import LineChartCard from "../components/charts/LineChartCard.jsx";
import DonutChartCard from "../components/charts/DonutChartCard.jsx";
import { kpis, messageVolume, resolutionSplit, recentActivity, currentUser } from "../data/dummyData.js";

const ACTIVITY_ICONS = {
  ai: <HiOutlineSparkles className="text-brand-green" size={16} />,
  broadcast: <FiSend className="text-brand-blue" size={16} />,
  human: <FiUsers className="text-amber-500" size={16} />,
  kb: <FiBookOpen className="text-purple-500" size={16} />,
  prompt: <FiZap className="text-brand-dark dark:text-brand-green" size={16} />,
};

/**
 * Dashboard — landing page after login. High-level KPIs, trends, and
 * recent activity feed. All data comes from src/data/dummyData.js.
 * 🔌 BACKEND HOOK: replace with GET /api/dashboard/summary
 */
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title text-2xl">Welcome back, {currentUser.name.split(" ")[0]} 👋</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening with your WhatsApp AI assistant today.
          </p>
        </div>
        <button className="btn-primary self-start sm:self-auto">
          <HiOutlineSparkles size={16} /> Ask AI for a summary
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card>
              <p className="text-xs font-medium text-slate-400">{kpi.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{kpi.value}</p>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    kpi.trend === "up"
                      ? "bg-brand-green/10 text-brand-dark dark:text-brand-green"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {kpi.trend === "up" ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
                  {kpi.delta}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <LineChartCard
          title="Message Volume (7 days)"
          subtitle="Total inbound messages vs. AI-handled"
          data={messageVolume}
        />
        <DonutChartCard
          title="Resolution Breakdown"
          subtitle="How conversations get resolved"
          data={resolutionSplit}
        />
      </div>

      {/* Recent activity */}
      <Card>
        <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">Recent Activity</h3>
        <div className="space-y-1">
          {recentActivity.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient-soft">
                {ACTIVITY_ICONS[a.type]}
              </div>
              <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">{a.text}</p>
              <span className="shrink-0 text-xs text-slate-400">{a.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
