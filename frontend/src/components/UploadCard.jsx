import { useState } from "react";
import { analyzeResume } from "../services/analyzeResume";

export default function UploadCard({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const jd = "Looking for MERN Stack Developer with React, Node, MongoDB, Express, JavaScript";
      const result = await analyzeResume(file, jd);
      
      // Check if result has error from backend
      if (result.error) {
        setError(`Backend Error: ${result.error}`);
        return;
      }
      
      // Validate required fields in result
      if (!result.skillsMatch && result.skillsMatch !== 0) {
        setError("Invalid response from server. Please check backend logs.");
        return;
      }
      
      onResult(result);
    } catch (err) {
      setError(`Failed to analyze resume: ${err.message || "Network error. Check if backend is running on localhost:5000"}`);
      console.error("Analysis error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-8">
      <h2 className="card-header text-xl mb-6">Upload & Analyze Resume</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-medium">⚠️ Error</p>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <p className="text-red-600 text-xs mt-2">💡 Make sure the backend server is running on localhost:5000</p>
        </div>
      )}
      
      <div className="upload-box border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100">
        <div className="text-4xl mb-4">📄</div>
        <label className="cursor-pointer">
          <span className="text-blue-600 font-semibold hover:text-blue-700">Click to upload</span>
          <span className="text-slate-500"> or drag and drop</span>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>
        <p className="text-xs text-slate-500 mt-2">PDF files only, max 10MB</p>
        {file && (
          <p className="text-sm text-green-600 font-medium mt-3">
            ✓ {file.name}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Job Description</label>
        <textarea
          placeholder="Paste the job description here (currently using default MERN stack job)"
          className="input-field"
          rows="4"
          disabled
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="btn-primary w-full mt-6"
      >
        {loading ? "⏳ Analyzing..." : "🚀 Analyze with AI"}
      </button>
    </div>
  );
}
