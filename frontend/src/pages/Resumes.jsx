import React, { useState } from "react";
import Topbar from "../components/Topbar";
import UploadCard from "../components/UploadCard";
import DetailedAnalysis from "../components/DetailedAnalysis";
import DynamicRoleScoring from "../components/DynamicRoleScoring";
import SkillsWithLearningPath from "../components/SkillsWithLearningPath";
import StatsCard from "../components/StatsCard";
import { analyzeResume, getDynamicScores, getMissingSkills } from "../services/analyzeResume";
import { Loader, AlertCircle, Zap } from "lucide-react";

export default function Resumes({ onMenuToggle, onAdminClick, user, onLogout }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [dynamicScores, setDynamicScores] = useState(null);
  const [skillsData, setSkillsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");

  const handleFileUpload = (file) => {
    setResumeFile(file);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);
    setDynamicScores(null);
    setSkillsData(null);
    setActiveTab("basic");

    try {
      const analysisResult = await analyzeResume(resumeFile, jobDescription);
      setAnalysis(analysisResult);

      const dynamicResult = await getDynamicScores(resumeFile);
      setDynamicScores(dynamicResult);

      const skillsResult = await getMissingSkills(resumeFile, jobDescription);
      setSkillsData(skillsResult);
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Topbar onMenuToggle={onMenuToggle} onAdminClick={onAdminClick} user={user} onLogout={onLogout} />
      <div className="section">
        <h1 className="section-title">📝 Resume Analyzer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Step 1: Upload Resume</h2>
            <UploadCard onFileSelect={handleFileUpload} />
            {resumeFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ File selected: <span className="font-semibold">{resumeFile.name}</span>
              </div>
            )}
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Step 2: Job Description</h2>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="6"
            />
            <p className="text-xs text-gray-500 mt-2">
              Include required skills, experience level, and responsibilities
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeFile || !jobDescription.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <Zap size={20} />
                Analyze Resume
              </>
            )}
          </button>
          {analysis && (
            <button
              onClick={() => {
                setResumeFile(null);
                setJobDescription("");
                setAnalysis(null);
                setDynamicScores(null);
                setSkillsData(null);
              }}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {analysis && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard label="ATS Score" value={`${analysis.atsScore}/100`} color="blue" />
              <StatsCard label="Skills Match" value={`${analysis.skillsMatch}/100`} color="green" />
              <StatsCard label="Experience Match" value={`${analysis.experienceMatch}/100`} color="purple" />
              <StatsCard label="Verdict" value={analysis.verdict} color={analysis.verdict === "Strong Fit" ? "green" : "orange"} />
            </div>

            <div className="card">
              <div className="border-b border-gray-200 flex">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                    activeTab === "basic"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  📊 Detailed Analysis
                </button>
                <button
                  onClick={() => setActiveTab("dynamic")}
                  className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                    activeTab === "dynamic"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  🎯 Role Comparison
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                    activeTab === "skills"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  📚 Learning Path
                </button>
              </div>

              <div className="p-6">
                {activeTab === "basic" && <DetailedAnalysis analysis={analysis} />}
                {activeTab === "dynamic" && dynamicScores && (
                  <DynamicRoleScoring scores={dynamicScores.scores} bestMatch={dynamicScores.bestMatch} />
                )}
                {activeTab === "skills" && skillsData && <SkillsWithLearningPath skillsData={skillsData} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
