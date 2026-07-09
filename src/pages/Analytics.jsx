import { useState } from "react";
import { FiDownload, FiCalendar } from "react-icons/fi";
import Card from "../components/common/Card.jsx";
import LineChartCard from "../components/charts/LineChartCard.jsx";
import BarChartCard from "../components/charts/BarChartCard.jsx";
import DonutChartCard from "../components/charts/DonutChartCard.jsx";
import { messageVolume, resolutionSplit, topIntents, kpis } from "../data/dummyData.js";
import { useToast } from "../context/ToastContext.jsx";

const RANGES = ["7 Days", "30 Days", "90 Days"];

/**
 * Analytics — deeper reporting page with filterable date range,
 * message trends, resolution breakdown, and top intents.
 * 🔌 BACKEND HOOK: GET /api/analytics?range=... to refresh chart data
 */
export default function Analytics() {
  const [range, setRange] = useState("7 Days");
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title text-2xl">Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Deep dive into conversation performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  range === r ? "bg-brand-gradient text-white" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => showToast("Report exported as CSV", "success")}
            className="btn-secondary !py-2"
          >
            <FiDownload size={15} /> Export
          </button>
        </div>
      </div>

      {/* Mini KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="text-center">
            <p className="text-xs text-slate-400">{kpi.label}</p>
            <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">{kpi.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <LineChartCard title="Message Trends" subtitle={`Showing last ${range.toLowerCase()}`} data={messageVolume} />
        <DonutChartCard title="Resolution Breakdown" subtitle="AI vs human vs unresolved" data={resolutionSplit} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BarChartCard title="Top Customer Intents" subtitle="Most common reasons customers reach out" data={topIntents} />
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Peak Hours</h3>
            <FiCalendar className="text-slate-400" size={16} />
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: 24 }).map((_, hour) => {
              const intensity = Math.random();
              return (
                <div
                  key={hour}
                  title={`${hour}:00 — ${Math.round(intensity * 100)} msgs`}
                  className="aspect-square rounded-md"
                  style={{ backgroundColor: `rgba(37, 211, 102, ${0.15 + intensity * 0.7})` }}
                />
              );
            })}
          </div>
          <p className="mt-3 text-xs text-slate-400">Darker cells indicate higher message volume for that hour (24h view).</p>
        </Card>
      </div>
    </div>
  );
}
