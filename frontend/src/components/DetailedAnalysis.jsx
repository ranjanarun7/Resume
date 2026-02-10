import React from "react";
import { AlertCircle, TrendingUp, Target, Lightbulb } from "lucide-react";

export default function DetailedAnalysis({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Why Score is Low/High */}
      {analysis.verdict && (
        <div
          className={`p-4 rounded-lg border-l-4 ${
            analysis.verdict === "Strong Fit"
              ? "bg-green-50 border-green-500"
              : analysis.verdict === "Moderate Fit"
              ? "bg-yellow-50 border-yellow-500"
              : "bg-red-50 border-red-500"
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className={
                analysis.verdict === "Strong Fit"
                  ? "text-green-600"
                  : "text-yellow-600"
              }
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                Verdict: {analysis.verdict}
              </h3>
              <p className="text-gray-700 mt-1">{analysis.summary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Weak Experience Areas */}
      {analysis.weakExperienceAreas && analysis.weakExperienceAreas.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-red-600" size={20} />
            <h3 className="font-semibold text-gray-900">Weak Experience Areas</h3>
          </div>
          <ul className="space-y-2">
            {analysis.weakExperienceAreas.map((area, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-500 mt-1">•</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ATS Keyword Gaps */}
      {analysis.atsKeywordGaps && analysis.atsKeywordGaps.length > 0 && (
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2 mb-3">
            <Target className="text-orange-600" size={20} />
            <h3 className="font-semibold text-gray-900">ATS Keyword Gaps</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.atsKeywordGaps.map((keyword, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white border border-orange-300 text-orange-700 text-sm rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">
            These keywords appear in job description but not prominently in your resume
          </p>
        </div>
      )}

      {/* Matched Keywords (Green) */}
      {analysis.matchedKeywords && analysis.matchedKeywords.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Matched Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.matchedKeywords.map((keyword, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills (Red) */}
      {analysis.missingSkills && analysis.missingSkills.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="font-semibold text-gray-900 mb-3">✗ Missing Skills</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actionable Feedback */}
      {analysis.actionableFeedback && analysis.actionableFeedback.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-900">Actionable Feedback for Candidates</h3>
          </div>
          <ul className="space-y-2">
            {analysis.actionableFeedback.map((feedback, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-500 font-bold mt-0.5">→</span>
                <span>{feedback}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
