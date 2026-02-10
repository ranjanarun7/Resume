export default function CandidateTable() {
  const candidates = [
    { name: "Arun Kumar", skillsMatch: "85%", atsScore: 78, status: "Shortlisted", color: "text-green-600" },
    { name: "Rahul Sharma", skillsMatch: "62%", atsScore: 55, status: "Rejected", color: "text-red-500" },
    { name: "Neha Singh", skillsMatch: "78%", atsScore: 82, status: "Shortlisted", color: "text-green-600" },
    { name: "Amit Patel", skillsMatch: "55%", atsScore: 64, status: "Under Review", color: "text-amber-600" },
  ];

  return (
    <div className="card p-6">
      <h3 className="card-header text-lg mb-6">Candidate List</h3>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th className="text-center">Skills Match</th>
              <th className="text-center">ATS Score</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition-colors">
                <td className="font-medium text-slate-900">{candidate.name}</td>
                <td className="text-center">
                  <span className="badge badge-info">{candidate.skillsMatch}</span>
                </td>
                <td className="text-center font-bold text-slate-700">{candidate.atsScore}</td>
                <td className="text-center">
                  <span className={`font-semibold ${candidate.color}`}>
                    {candidate.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
