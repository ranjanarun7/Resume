export default function AIScoreBar({ label, score, color }) {
  const percentage = score || 0;

  return (
    <div className="score-bar-container">
      <div className="score-bar-label">
        <span>{label}</span>
        <span className="text-blue-600 font-bold text-lg">{percentage}%</span>
      </div>
      <div className="score-bar">
        <div
          className="score-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color || '#3b82f6',
          }}
        />
      </div>
    </div>
  );
}
