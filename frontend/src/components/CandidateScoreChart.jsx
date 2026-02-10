import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Arun", score: 78 },
  { name: "Rahul", score: 55 },
  { name: "Neha", score: 82 },
  { name: "Amit", score: 64 },
];

export default function CandidateScoreChart() {
  return (
    <div className="card p-6">
      <h3 className="card-header text-lg">Candidate ATS Scores</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="score" 
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
