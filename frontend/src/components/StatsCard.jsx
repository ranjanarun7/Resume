export default function StatsCard({ title, value }) {
  const icons = {
    "Total Candidates": "👥",
    "Shortlisted": "✅",
    "Strong Fits": "⭐",
    "Weak Fits": "❌"
  };

  const colors = {
    "Total Candidates": "bg-blue-50 border-blue-200",
    "Shortlisted": "bg-green-50 border-green-200",
    "Strong Fits": "bg-amber-50 border-amber-200",
    "Weak Fits": "bg-red-50 border-red-200"
  };

  const valueColors = {
    "Total Candidates": "text-blue-600",
    "Shortlisted": "text-green-600",
    "Strong Fits": "text-amber-600",
    "Weak Fits": "text-red-600"
  };

  return (
    <div className={`card p-6 border-l-4 ${colors[title] || 'bg-slate-50'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-title">{title}</p>
          <h3 className={`stat-value ${valueColors[title] || 'text-slate-600'}`}>
            {value}
          </h3>
        </div>
        <div className="text-3xl">
          {icons[title] || "📊"}
        </div>
      </div>
    </div>
  );
}
