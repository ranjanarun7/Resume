import React, { useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";

export default function DynamicRoleScoring({ scores, bestMatch }) {
  const [selectedRole, setSelectedRole] = useState(bestMatch?.role || "MERN");
  const selectedData = scores[selectedRole];

  const roleColors = {
    MERN: { bg: "bg-purple-50", border: "border-purple-300", text: "text-purple-700", bar: "bg-purple-500" },
    Frontend: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", bar: "bg-blue-500" },
    Backend: { bg: "bg-green-50", border: "border-green-300", text: "text-green-700", bar: "bg-green-500" }
  };

  const getVerdictColor = (verdict) => {
    if (verdict === "Strong Fit") return "text-green-600 bg-green-100";
    if (verdict === "Moderate Fit") return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const ScoreBar = ({ label, score }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all ${roleColors[selectedRole].bar}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Role Selection Tabs */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(scores).map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedRole === role
                ? `${roleColors[role].bg} ${roleColors[role].text} border-2 ${roleColors[role].border}`
                : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
            }`}
          >
            {role} Role
          </button>
        ))}
      </div>

      {/* Selected Role Analysis */}
      {selectedData && (
        <div className={`p-6 rounded-lg border-l-4 ${roleColors[selectedRole].bg} ${roleColors[selectedRole].border} border`}>
          {/* Verdict and Match % */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-lg font-bold ${roleColors[selectedRole].text}`}>
                {selectedRole} Developer
              </h3>
              <p className="text-sm text-gray-600 mt-1">{selectedData.summary}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getVerdictColor(selectedData.verdict)}`}>
              {selectedData.verdict}
            </span>
          </div>

          {/* Score Breakdown */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={20} className={roleColors[selectedRole].text} />
              <h4 className="font-semibold text-gray-900">Score Breakdown</h4>
            </div>
            <ScoreBar label="ATS Score" score={selectedData.atsScore} />
            <ScoreBar label="Skills Match" score={selectedData.skillsMatch} />
            <ScoreBar label="Experience Match" score={selectedData.experienceMatch} />
          </div>

          {/* Key Strengths */}
          {selectedData.keyStrengths && selectedData.keyStrengths.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-green-700 mb-2">✓ Key Strengths for This Role</h4>
              <ul className="space-y-1">
                {selectedData.keyStrengths.map((strength, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvement Areas */}
          {selectedData.improvementAreas && selectedData.improvementAreas.length > 0 && (
            <div>
              <h4 className="font-semibold text-orange-700 mb-2">→ Areas to Improve</h4>
              <ul className="space-y-1">
                {selectedData.improvementAreas.map((area, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Why Low Score */}
          {selectedData.atsScore < 70 && selectedData.whyLowScore && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-sm text-red-700">
              <strong>Why is the score lower?</strong><br />
              {selectedData.whyLowScore}
            </div>
          )}

          {/* Matched & Missing Keywords */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {selectedData.matchedKeywords && selectedData.matchedKeywords.length > 0 && (
              <div>
                <h5 className="text-xs font-bold text-green-700 uppercase mb-2">Matched Keywords</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedData.matchedKeywords.slice(0, 5).map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedData.missingSkills && selectedData.missingSkills.length > 0 && (
              <div>
                <h5 className="text-xs font-bold text-red-700 uppercase mb-2">Missing Skills</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedData.missingSkills.slice(0, 5).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Best Match Summary */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="text-blue-600" size={20} />
          <h4 className="font-semibold text-gray-900">Best Role Match</h4>
        </div>
        <p className="text-sm text-gray-700">
          Your resume is best suited for a <strong>{bestMatch.role}</strong> position with a score of{" "}
          <strong>{bestMatch.score}/100</strong>
        </p>
      </div>
    </div>
  );
}
