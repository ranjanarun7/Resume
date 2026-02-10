import React, { useState } from "react";
import { BookOpen, Award, Clock, Star, CheckCircle } from "lucide-react";

export default function SkillsWithLearningPath({ skillsData }) {
  const [expandedPhase, setExpandedPhase] = useState("phase1");

  if (!skillsData) return null;

  const SkillCard = ({ skill, resources, estimatedTime, importance }) => {
    const importanceColor = {
      Critical: "bg-red-100 text-red-700",
      High: "bg-orange-100 text-orange-700",
      Medium: "bg-yellow-100 text-yellow-700",
      Low: "bg-blue-100 text-blue-700",
    };

    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
          <span className={`text-xs font-bold px-2 py-1 rounded ${importanceColor[skill.importance]}`}>
            {skill.importance}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {skill.whyImportant || skill.whyBeneficial}
        </p>
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-700">
          <Clock size={16} />
          <span>{skill.estimatedTime}</span>
        </div>
        {skill.learningResources && skill.learningResources.length > 0 && (
          <div>
            <h5 className="text-xs font-bold text-gray-700 mb-2">Learning Resources:</h5>
            <ul className="space-y-1">
              {skill.learningResources.map((resource, i) => (
                <li key={i} className="text-xs text-blue-600 flex items-start gap-2">
                  <span>→</span>
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Current Strengths */}
      {skillsData.currentStrengths && skillsData.currentStrengths.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-green-600" size={20} />
            <h3 className="font-semibold text-gray-900">Your Current Strengths</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsData.currentStrengths.map((strength, i) => (
              <span key={i} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                ✓ {strength}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Learning Duration Overview */}
      {skillsData.totalLearningDuration && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <Clock className="text-blue-600" size={20} />
            <div>
              <h4 className="font-semibold text-gray-900">Total Learning Duration</h4>
              <p className="text-sm text-gray-700">{skillsData.totalLearningDuration}</p>
            </div>
          </div>
        </div>
      )}

      {/* Must-Have Skills */}
      {skillsData.mustHaveSkills && skillsData.mustHaveSkills.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
            <Star className="text-red-600" size={24} />
            Must-Have Skills (Critical)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillsData.mustHaveSkills.map((skill, i) => (
              <SkillCard key={i} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {/* Nice-to-Have Skills */}
      {skillsData.niceToHaveSkills && skillsData.niceToHaveSkills.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
            <Award className="text-blue-600" size={24} />
            Nice-to-Have Skills (Bonus)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillsData.niceToHaveSkills.map((skill, i) => (
              <SkillCard key={i} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {/* Learning Path */}
      {skillsData.learningPath && (
        <div>
          <h3 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
            <BookOpen className="text-purple-600" size={24} />
            Structured Learning Path
          </h3>

          <div className="space-y-3">
            {Object.entries(skillsData.learningPath).map(([phaseKey, phase], phaseIndex) => (
              <div key={phaseKey} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedPhase(expandedPhase === phaseKey ? null : phaseKey)}
                  className="w-full p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-purple-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      {phaseIndex + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {phaseKey === "phase1" ? "Phase 1: Foundation" : "Phase 2: Advanced"}
                      </h4>
                      <p className="text-sm text-gray-600">{phase.duration}</p>
                    </div>
                  </div>
                  <span className="text-purple-600 font-bold">
                    {expandedPhase === phaseKey ? "−" : "+"}
                  </span>
                </button>

                {expandedPhase === phaseKey && (
                  <div className="p-4 bg-white border-t border-gray-200 space-y-4">
                    {/* Focus Skills */}
                    {phase.focus && phase.focus.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Focus Areas:</h5>
                        <div className="flex flex-wrap gap-2">
                          {phase.focus.map((focus, i) => (
                            <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {phase.projects && phase.projects.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Hands-on Projects:</h5>
                        <ul className="space-y-2">
                          {phase.projects.map((project, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="text-purple-600 font-bold mt-0.5">→</span>
                              <span className="text-gray-700">{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Career Advice */}
      {skillsData.careerAdvice && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-2">📈 Career Progression Advice</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{skillsData.careerAdvice}</p>
        </div>
      )}
    </div>
  );
}
