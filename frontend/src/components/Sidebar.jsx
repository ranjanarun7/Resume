export default function Sidebar({ activeTab, setActiveTab, isAdmin }) {
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "resumes", icon: "📁", label: "Resumes" },
    { id: "shortlisted", icon: "✅", label: "Shortlisted" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "settings", icon: "⚙️", label: "Settings" },
    ...(isAdmin ? [{ id: "admin", icon: "🔐", label: "Admin" }] : []),
  ];

  return (
    <aside className="sidebar hidden md:flex md:flex-col">
      <div className="sidebar-content">
        <div className="sidebar-title">
          📄 AI Resume Screener
        </div>

        <nav className="sidebar-nav space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left sidebar-item rounded-lg ${
                activeTab === item.id ? "sidebar-item-active" : ""
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-12 pt-6 border-t border-slate-700">
          <div className="text-xs text-slate-400 mb-3">Need Help?</div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
}
