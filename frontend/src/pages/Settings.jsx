import { useState } from "react";
import Topbar from "../components/Topbar";

export default function Settings({ onMenuToggle, onAdminClick, user, onLogout }) {
  const [settings, setSettings] = useState({
    jobTitle: "MERN Stack Developer",
    minAtsScore: 70,
    skillsMatchThreshold: 60,
    emailNotifications: true,
    autoShortlist: false,
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <>
      <Topbar onMenuToggle={onMenuToggle} onAdminClick={onAdminClick} user={user} onLogout={onLogout} />
      <div className="section">
        <h1 className="section-title">⚙️ Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Form */}
          <div className="lg:col-span-2 card p-8">
            <h3 className="card-header text-lg mb-6">Screening Preferences</h3>
            
            <div className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Job Title
                </label>
                <input
                  type="text"
                  value={settings.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  className="input-field"
                />
              </div>

              {/* ATS Score Threshold */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Minimum ATS Score: <span className="text-blue-600">{settings.minAtsScore}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.minAtsScore}
                  onChange={(e) => handleChange("minAtsScore", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Skills Match Threshold */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Skills Match Threshold: <span className="text-blue-600">{settings.skillsMatchThreshold}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.skillsMatchThreshold}
                  onChange={(e) => handleChange("skillsMatchThreshold", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-900">Email Notifications</p>
                  <p className="text-sm text-slate-600">Receive email alerts for high matches</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange("emailNotifications", e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              {/* Auto Shortlist */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-900">Auto Shortlist</p>
                  <p className="text-sm text-slate-600">Automatically shortlist candidates above threshold</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoShortlist}
                  onChange={(e) => handleChange("autoShortlist", e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <button onClick={handleSave} className="btn-primary w-full mt-8">
                💾 Save Settings
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="card-header text-base mb-4">❓ Quick Help</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong>ATS Score:</strong> Overall resume compatibility score</li>
                <li>• <strong>Skills Match:</strong> Percentage of required skills found</li>
                <li>• <strong>Experience Match:</strong> Years of relevant experience</li>
                <li>• <strong>Auto Shortlist:</strong> Automatically screens resumes 24/7</li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="card-header text-base mb-4">📝 Account</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Admin Email</p>
                  <p className="font-medium text-slate-900">admin@company.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Team Members</p>
                  <p className="font-medium text-slate-900">5 users</p>
                </div>
                <button className="btn-secondary w-full text-sm mt-4">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
