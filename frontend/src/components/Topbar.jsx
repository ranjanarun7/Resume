import { useState } from "react";

export default function Topbar({ onMenuToggle, onAdminClick, user, onLogout }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="topbar">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-slate-700 text-2xl"
          title="Toggle menu"
        >
          ☰
        </button>
        <div>
          <h1 className="topbar-title">Resume Analysis Dashboard</h1>
          <p className="text-slate-600 text-sm mt-1">Welcome back {user?.name}! Here's your screening overview.</p>
        </div>
      </div>
      <div className="flex gap-4 items-center relative">
        <div className="badge badge-warning">3 Pending</div>
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="bg-white px-4 py-2.5 rounded-lg shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
            title="User menu"
          >
            👤 {user?.name}
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
              <div className="p-3 border-b border-slate-200">
                <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-600">{user?.email}</p>
                {user?.role === "admin" && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded">
                    Admin
                  </span>
                )}
              </div>
              
              {user?.role === "admin" && (
                <button
                  onClick={() => {
                    onAdminClick();
                    setShowProfile(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-200"
                >
                  🔐 Admin Panel
                </button>
              )}
              
              <button
                onClick={() => {
                  onLogout();
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
