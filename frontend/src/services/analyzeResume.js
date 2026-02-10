export async function analyzeResume(file, jobDescription) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  const res = await fetch("http://localhost:5000/api/resume/analyze", {
    method: "POST",
    body: formData,
  });

  return res.json();
}

// Get dynamic scores across MERN, Frontend, Backend roles
export async function getDynamicScores(file) {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await fetch("http://localhost:5000/api/resume/dynamic-score", {
    method: "POST",
    body: formData,
  });

  return res.json();
}

// Get missing skills and learning path
export async function getMissingSkills(file, jobDescription) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  const res = await fetch("http://localhost:5000/api/resume/missing-skills", {
    method: "POST",
    body: formData,
  });

  return res.json();
}
