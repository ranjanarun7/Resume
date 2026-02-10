import express from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractText } from "../utils/extractText.js";

const router = express.Router();
const upload = multer();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ error: "No resume file provided" });
    }

    if (!req.body.jobDescription) {
      return res.status(400).json({ error: "No job description provided" });
    }

    console.log("📄 Extracting text from resume...");
    const resumeText = await extractText(req.file.buffer);
    
    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ error: "Could not extract text from PDF" });
    }

    console.log("✓ Text extracted. Analyzing with Gemini AI...");
    const jobDescription = req.body.jobDescription;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert ATS (Applicant Tracking System) and career counselor. Analyze the resume against the job description and provide COMPREHENSIVE detailed feedback.

Return ONLY valid JSON (no markdown, no extra text):
{
  "skillsMatch": <number 0-100>,
  "atsScore": <number 0-100>,
  "experienceMatch": <number 0-100>,
  "verdict": "<Strong Fit | Moderate Fit | Weak Fit>",
  "matchedKeywords": [<list of matched skills/keywords>],
  "missingSkills": [<list of missing skills>],
  "weakExperienceAreas": [<areas where experience is weak or missing>],
  "atsKeywordGaps": [<keywords from job description not found in resume>],
  "actionableFeedback": [
    <specific, actionable suggestions like "Add React hooks experience", "Mention quantified achievements", "Improve ATS keyword density">
  ],
  "summary": "<brief 2-3 line summary>",
  "highlightSuggestions": {
    "shouldHighlight": [<skills/keywords to add>],
    "weakAreas": [<areas with red flags>]
  }
}

Resume (first 3000 chars):
${resumeText.substring(0, 3000)}

Job Description:
${jobDescription}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log("✓ Response received from Gemini. Parsing JSON...");

    // Extract JSON from response (in case of markdown formatting)
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      // Try to extract JSON from code block if present
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        json = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse response as JSON");
      }
    }

    // Validate JSON response
    if (!json.skillsMatch && json.skillsMatch !== 0) {
      throw new Error("Missing skillsMatch in response");
    }

    // Ensure all expected fields exist
    json.weakExperienceAreas = json.weakExperienceAreas || [];
    json.atsKeywordGaps = json.atsKeywordGaps || [];
    json.actionableFeedback = json.actionableFeedback || [];
    json.highlightSuggestions = json.highlightSuggestions || { shouldHighlight: [], weakAreas: [] };
    json.resumeText = resumeText;
    
    console.log("✅ Analysis complete");
    res.json(json);

  } catch (error) {
    console.error("❌ Analysis error:", error.message);
    console.error("Full error:", error);
    
    res.status(500).json({ 
      error: error.message || "AI analysis failed",
      type: error.constructor.name,
      hint: "Make sure GEMINI_API_KEY is valid in .env file"
    });
  }
});

// Dynamic scoring for different roles - Analyze same resume across multiple roles
router.post("/dynamic-score", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file provided" });
    }

    console.log("📄 Extracting resume for dynamic scoring...");
    const resumeText = await extractText(req.file.buffer);
    
    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ error: "Could not extract text from PDF" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Define different role job descriptions
    const roles = {
      MERN: "Full Stack MERN Developer: 3+ years experience with MongoDB, Express, React, Node.js. Need React hooks, REST APIs, database design, Git, deployment. Lead projects, mentor juniors.",
      Frontend: "Senior Frontend Engineer: 4+ years React/Vue.js. Need component architecture, state management (Redux), responsive design, performance optimization, testing (Jest, RTL).",
      Backend: "Backend Engineer: 3+ years server-side development. Need Node.js/Express, database design (SQL/NoSQL), API design, scalability, microservices, caching, security."
    };

    const dynamicScores = {};

    // Analyze resume against each role
    for (const [role, jobDesc] of Object.entries(roles)) {
      const prompt = `You are an ATS expert. Score this resume against a ${role} position.

Return ONLY valid JSON (no markdown):
{
  "role": "${role}",
  "skillsMatch": <0-100>,
  "atsScore": <0-100>,
  "experienceMatch": <0-100>,
  "verdict": "<Strong Fit | Moderate Fit | Weak Fit>",
  "matchedKeywords": [<matched skills>],
  "missingSkills": [<missing key skills>],
  "whyLowScore": "<explanation if score < 70>",
  "keyStrengths": [<2-3 top strengths for this role>],
  "improvementAreas": [<2-3 areas to improve>]
}

Resume:
${resumeText.substring(0, 2500)}

Job Requirements:
${jobDesc}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      let json;
      try {
        json = JSON.parse(text);
      } catch {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          json = JSON.parse(jsonMatch[0]);
        }
      }

      dynamicScores[role] = json;
    }

    console.log("✅ Dynamic scoring complete");
    res.json({
      resumeText,
      scores: dynamicScores,
      bestMatch: Object.entries(dynamicScores).reduce((best, [role, score]) => 
        score.atsScore > best.score ? { role, score: score.atsScore } : best,
        { role: "", score: 0 }
      )
    });

  } catch (error) {
    console.error("❌ Dynamic scoring error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Extract missing skills with learning path
router.post("/missing-skills", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file provided" });
    }

    if (!req.body.jobDescription) {
      return res.status(400).json({ error: "No job description provided" });
    }

    console.log("🎯 Analyzing missing skills...");
    const resumeText = await extractText(req.file.buffer);
    const jobDescription = req.body.jobDescription;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a career development expert. Extract missing skills from resume vs job description and provide learning path.

Return ONLY valid JSON (no markdown):
{
  "mustHaveSkills": [
    {
      "skill": "skill name",
      "importance": "Critical | High | Medium",
      "whyImportant": "brief explanation",
      "learningResources": ["resource 1", "resource 2"],
      "estimatedTime": "weeks"
    }
  ],
  "niceToHaveSkills": [
    {
      "skill": "skill name",
      "importance": "Medium | Low",
      "whyBeneficial": "brief explanation",
      "learningResources": ["resource 1", "resource 2"],
      "estimatedTime": "weeks"
    }
  ],
  "learningPath": {
    "phase1": {
      "duration": "weeks",
      "focus": ["skill", "skill"],
      "projects": ["project idea 1", "project idea 2"]
    },
    "phase2": {
      "duration": "weeks",
      "focus": ["skill", "skill"],
      "projects": ["project idea 1", "project idea 2"]
    }
  },
  "currentStrengths": ["strength 1", "strength 2"],
  "totalLearningDuration": "weeks estimate",
  "careerAdvice": "overall suggestion for career progression"
}

Resume:
${resumeText.substring(0, 2500)}

Job Description:
${jobDescription}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        json = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse response");
      }
    }

    console.log("✅ Missing skills analysis complete");
    res.json(json);

  } catch (error) {
    console.error("❌ Missing skills error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
