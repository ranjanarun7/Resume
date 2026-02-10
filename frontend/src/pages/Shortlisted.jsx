import CandidateTable from "../components/CandidateTable";
import Topbar from "../components/Topbar";

export default function Shortlisted({ onMenuToggle, onAdminClick, user, onLogout }) {
  const shortlistedCandidates = [
    { name: "Arun Kumar", skills: "85%", ats: 78, email: "arun@email.com", phone: "+91-9876543210" },
    { name: "Neha Singh", skills: "78%", ats: 82, email: "neha@email.com", phone: "+91-9876543211" },
  ];

  return (
    <>
      <Topbar onMenuToggle={onMenuToggle} onAdminClick={onAdminClick} user={user} onLogout={onLogout} />
      <div className="section">
        <h1 className="section-title">✅ Shortlisted Candidates</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <p className="stat-title">Total Shortlisted</p>
            <p className="text-4xl font-bold text-green-600 mt-2">45</p>
          </div>
          <div className="card p-6">
            <p className="stat-title">Interview Scheduled</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">28</p>
          </div>
          <div className="card p-6">
            <p className="stat-title">Offers Extended</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">12</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="card-header text-lg mb-6">Shortlisted Candidates List</h3>
          
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-center">Skills Match</th>
                  <th className="text-center">ATS Score</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Phone</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {shortlistedCandidates.map((candidate, idx) => (
                  <tr key={idx} className="hover:bg-blue-50">
                    <td className="font-medium text-slate-900">{candidate.name}</td>
                    <td className="text-center">
                      <span className="badge badge-success">{candidate.skills}</span>
                    </td>
                    <td className="text-center font-bold text-green-600">{candidate.ats}</td>
                    <td className="text-center text-slate-600 text-sm">{candidate.email}</td>
                    <td className="text-center text-slate-600 text-sm">{candidate.phone}</td>
                    <td className="text-center">
                      <button className="btn-small bg-green-100 text-green-600 hover:bg-green-200">
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
