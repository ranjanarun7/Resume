import AIScoreBar from "./AIScoreBar";

export default function ResumePreview({ skills, ats, exp, verdict, summary }) {
  const getVerdictColor = (v) => {
    if (v?.includes("Strong")) return "verdict-strong";
    if (v?.includes("Moderate")) return "verdict-moderate";
    return "verdict-weak";
  };

  return (
    <div className="card p-8">
      <h3 className="card-header text-lg mb-6">AI Analysis Results</h3>
      
      <div className="space-y-6">
        <AIScoreBar label="Skills Match" score={skills} color="#3b82f6" />
        <AIScoreBar label="ATS Score" score={ats} color="#10b981" />
        <AIScoreBar label="Experience Match" score={exp} color="#f59e0b" />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="mb-4">
          <p className="text-sm text-slate-600 font-medium mb-2">Verdict</p>
          <p className={`text-xl font-bold ${getVerdictColor(verdict)}`}>
            {verdict || "Pending Analysis"}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-slate-600 font-medium mb-2">Summary</p>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg">
            {summary || "Upload a resume to see the summary"}
          </p>
        </div>
      </div>
    </div>
  );
}
