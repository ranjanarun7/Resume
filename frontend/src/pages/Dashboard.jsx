import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UploadCard from "../components/UploadCard";
import ResumePreview from "../components/ResumePreview";
import ResumeTextPreview from "../components/ResumeTextPreview";
import CandidateTable from "../components/CandidateTable";
import CandidateScoreChart from "../components/CandidateScoreChart";
import SkillMatchChart from "../components/SkillMatchChart";
import StatsCard from "../components/StatsCard";
import Resumes from "./Resumes";
import Shortlisted from "./Shortlisted";
import Analytics from "./Analytics";
import Settings from "./Settings";
import Admin from "./Admin";
import Login from "./Login";
import Signup from "./Signup";

export default function Dashboard() {
  const [aiResult, setAiResult] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login"); // "login" or "signup"
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  // Handle login success
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setActiveTab("dashboard");
  };

  // Check admin access
  const isAdmin = user?.role === "admin";

  // If not logged in, show auth pages
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return authPage === "login" ? (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onSignupClick={() => setAuthPage("signup")}
      />
    ) : (
      <Signup
        onSignupSuccess={handleLoginSuccess}
        onLoginClick={() => setAuthPage("login")}
      />
    );
  }

  // If trying to access admin without admin role
  if (activeTab === "admin" && !isAdmin) {
    setActiveTab("dashboard");
  }

  const renderContent = () => {
    const menuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
    const adminClick = () => {
      if (isAdmin) {
        setActiveTab("admin");
      } else {
        alert("Only admin users can access the admin panel");
      }
    };
    
    switch (activeTab) {
      case "resumes":
        return <Resumes onMenuToggle={menuToggle} onAdminClick={adminClick} user={user} onLogout={handleLogout} />;
      case "shortlisted":
        return <Shortlisted onMenuToggle={menuToggle} onAdminClick={adminClick} user={user} onLogout={handleLogout} />;
      case "analytics":
        return <Analytics onMenuToggle={menuToggle} onAdminClick={adminClick} user={user} onLogout={handleLogout} />;
      case "settings":
        return <Settings onMenuToggle={menuToggle} onAdminClick={adminClick} user={user} onLogout={handleLogout} />;
      case "admin":
        return isAdmin ? <Admin onMenuToggle={menuToggle} onAdminClick={adminClick} user={user} onLogout={handleLogout} /> : null;
      default:
        return (
          <>
            <Topbar 
              onMenuToggle={menuToggle}
              onAdminClick={adminClick}
              user={user}
              onLogout={handleLogout}
            />
            
            {/* Upload Section */}
            <section className="section">
              <UploadCard onResult={setAiResult} />
            </section>

            {/* Analysis Results */}
            {aiResult && (
              <section className="section">
                <h2 className="section-title">Analysis Results</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResumePreview
                    skills={aiResult.skillsMatch}
                    ats={aiResult.atsScore}
                    exp={aiResult.experienceMatch}
                    verdict={aiResult.verdict}
                    summary={aiResult.summary}
                  />

                  <ResumeTextPreview
                    resumeText={aiResult.resumeText}
                    matchedKeywords={aiResult.matchedKeywords}
                    missingSkills={aiResult.missingSkills}
                  />
                </div>
              </section>
            )}

            {/* Statistics */}
            <section className="section">
              <h2 className="section-title">Quick Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Candidates" value="150" />
                <StatsCard title="Shortlisted" value="45" />
                <StatsCard title="Strong Fits" value="28" />
                <StatsCard title="Weak Fits" value="77" />
              </div>
            </section>

            {/* Charts Section */}
            <section className="section">
              <h2 className="section-title">Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CandidateScoreChart />
                <SkillMatchChart />
              </div>
            </section>

            {/* Candidates Table */}
            <section className="section">
              <h2 className="section-title">Recent Candidates</h2>
              <CandidateTable />
            </section>
          </>
        );
    }
  };

  return (
    <div className="app-layout relative">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar 
          activeTab={activeTab} 
          isAdmin={isAdmin}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileMenuOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="main-content w-full overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
