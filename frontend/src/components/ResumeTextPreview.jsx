import DOMPurify from "dompurify";
import { highlightText } from "../utils/highlightText";

export default function ResumeTextPreview({
  resumeText,
  matchedKeywords,
  missingSkills,
}) {
  const highlightedHTML = highlightText(
    resumeText,
    matchedKeywords,
    missingSkills
  );

  return (
    <div className="card p-6 h-[500px] overflow-y-auto">
      <h3 className="card-header text-lg mb-6">Resume Content (AI Highlighted)</h3>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-xs font-semibold text-slate-600 mb-2">Matched Keywords:</p>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords && matchedKeywords.length > 0 ? (
              matchedKeywords.slice(0, 8).map((keyword, idx) => (
                <span key={idx} className="badge badge-success">
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500">No matches found</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-600 mb-2">Missing Skills:</p>
          <div className="flex flex-wrap gap-2">
            {missingSkills && missingSkills.length > 0 ? (
              missingSkills.slice(0, 8).map((skill, idx) => (
                <span key={idx} className="badge badge-danger">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500">No missing skills identified</span>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <p className="text-xs font-semibold text-slate-600 mb-3">Full Resume Text:</p>
        <div
          className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(highlightedHTML),
          }}
        />
      </div>
    </div>
  );
}
