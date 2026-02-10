import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Matched Skills", value: 70 },
  { name: "Missing Skills", value: 30 },
];

const COLORS = ["#10b981", "#ef4444"];

export default function SkillMatchChart() {
  return (
    <div className="card p-6">
      <h3 className="card-header text-lg">Skill Match Breakdown</h3>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value}%`}
            contentStyle={{
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex gap-4 justify-center mt-4">
        <div className="text-center">
          <div className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></div>
          <span className="text-sm text-slate-600">Matched</span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-red-500 rounded-full inline-block mr-2"></div>
          <span className="text-sm text-slate-600">Missing</span>
        </div>
      </div>
    </div>
  );
}
