import CandidateScoreChart from "../components/CandidateScoreChart";
import SkillMatchChart from "../components/SkillMatchChart";
import Topbar from "../components/Topbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const trendData = [
  { month: "Jan", analyzed: 45, shortlisted: 12 },
  { month: "Feb", analyzed: 58, shortlisted: 18 },
  { month: "Mar", analyzed: 72, shortlisted: 28 },
  { month: "Apr", analyzed: 85, shortlisted: 35 },
  { month: "May", analyzed: 95, shortlisted: 40 },
];

export default function Analytics({ onMenuToggle, onAdminClick, user, onLogout }) {
  return (
    <>
      <Topbar onMenuToggle={onMenuToggle} onAdminClick={onAdminClick} user={user} onLogout={onLogout} />
      <div className="section">
        <h1 className="section-title">📈 Analytics & Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <p className="stat-title">Total Resumes Analyzed</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">432</p>
            <p className="text-xs text-slate-500 mt-2">↑ 12% from last month</p>
          </div>
          <div className="card p-6">
            <p className="stat-title">Avg ATS Score</p>
            <p className="text-3xl font-bold text-green-600 mt-2">72</p>
            <p className="text-xs text-slate-500 mt-2">↑ 5% from last month</p>
          </div>
          <div className="card p-6">
            <p className="stat-title">Shortlist Rate</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">28%</p>
            <p className="text-xs text-slate-500 mt-2">↑ 3% from last month</p>
          </div>
          <div className="card p-6">
            <p className="stat-title">Avg Skills Match</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">65%</p>
            <p className="text-xs text-slate-500 mt-2">↑ 8% from last month</p>
          </div>
        </div>

        <div className="card p-6 mb-6">
          <h3 className="card-header text-lg">Recruitment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="analyzed" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="shortlisted" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CandidateScoreChart />
          <SkillMatchChart />
        </div>
      </div>
    </>
  );
}
