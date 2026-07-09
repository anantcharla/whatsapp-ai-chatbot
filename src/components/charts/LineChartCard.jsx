import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Card from "../common/Card.jsx";

/**
 * LineChartCard — area chart comparing total messages vs. AI-handled messages.
 * data: [{ day, messages, aiHandled }]
 */
export default function LineChartCard({ title, subtitle, data }) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="msgGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34B7F1" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#34B7F1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#25D366" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#25D366" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-white/5" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="messages" name="Total Messages" stroke="#34B7F1" fill="url(#msgGradient)" strokeWidth={2} />
          <Area type="monotone" dataKey="aiHandled" name="AI Handled" stroke="#25D366" fill="url(#aiGradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
