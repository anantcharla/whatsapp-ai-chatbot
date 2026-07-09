import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import Card from "../common/Card.jsx";

/**
 * DonutChartCard — donut chart, e.g. AI vs. human resolution split.
 * data: [{ name, value, color }]
 */
export default function DonutChartCard({ title, subtitle, data }) {
  return (
    <Card>
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{title}</h3>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.name}
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{d.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
