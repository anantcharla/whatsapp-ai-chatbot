import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import Card from "../common/Card.jsx";

const COLORS = ["#25D366", "#128C7E", "#34B7F1", "#4ADE80", "#7DD3FC"];

/**
 * BarChartCard — horizontal bar chart, e.g. top customer intents.
 * data: [{ intent, count }]
 */
export default function BarChartCard({ title, subtitle, data, dataKey = "count", labelKey = "intent" }) {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{title}</h3>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-slate-100 dark:text-white/5" />
          <XAxis type="number" hide />
          <YAxis dataKey={labelKey} type="category" tickLine={false} axisLine={false} width={110} tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <Tooltip
            cursor={{ fill: "rgba(37,211,102,0.06)" }}
            contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: 12 }}
          />
          <Bar dataKey={dataKey} radius={[0, 8, 8, 0]} barSize={16}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
