import Topbar from "../components/Topbar";

export default function Admin({ onMenuToggle, onAdminClick, user, onLogout }) {
  return (
    <>
      <Topbar onMenuToggle={onMenuToggle} onAdminClick={onAdminClick} user={user} onLogout={onLogout} />
      
      <section className="section">
        <h2 className="section-title">Admin Panel</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">API Connection</span>
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Database</span>
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">PDF Processor</span>
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">AI Engine</span>
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  API Key Status
                </label>
                <div className="px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-600">
                  ✓ Loaded & Active
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Upload Limit
                </label>
                <input 
                  type="number" 
                  defaultValue="50" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Logs */}
      <section className="section">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Timestamp</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-3 text-sm text-slate-700">Resume Analyzed</td>
                <td className="px-6 py-3 text-sm text-slate-600">system</td>
                <td className="px-6 py-3 text-sm text-slate-600">Today 2:45 PM</td>
                <td className="px-6 py-3"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Success</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-3 text-sm text-slate-700">PDF Extracted</td>
                <td className="px-6 py-3 text-sm text-slate-600">system</td>
                <td className="px-6 py-3 text-sm text-slate-600">Today 2:44 PM</td>
                <td className="px-6 py-3"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Success</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-3 text-sm text-slate-700">File Uploaded</td>
                <td className="px-6 py-3 text-sm text-slate-600">admin</td>
                <td className="px-6 py-3 text-sm text-slate-600">Today 2:43 PM</td>
                <td className="px-6 py-3"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Success</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="section">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Danger Zone</h3>
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <h4 className="font-semibold text-red-900 mb-2">Clear Cache</h4>
          <p className="text-sm text-red-700 mb-4">Remove all cached data and restart analysis engine.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Clear Cache
          </button>
        </div>
      </section>
    </>
  );
}
