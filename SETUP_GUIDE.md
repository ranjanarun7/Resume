# Debug & Fix Guide

## 🔧 Issues Fixed:

### 1. **Frontend - TypeError: Cannot read properties of undefined**
- ✅ Fixed `highlightText.js` to safely handle undefined arrays
- ✅ Added null checks and default values
- ✅ Added error boundary in `UploadCard.jsx`

### 2. **Backend - 500 Error on /api/resume/analyze**
- ✅ Added environment variable loading (dotenv)
- ✅ Added detailed error logging
- ✅ Added validation for file and job description
- ✅ Added JSON parsing error recovery
- ✅ Better error messages for debugging

---

## 🚀 How to Run:

### Backend Setup:
```bash
cd backend
npm install
```

### Start Backend Server:
```bash
# Terminal 1 - Backend
cd backend
node server.js
```

Expected output:
```
✅ Server running on http://localhost:5000
📝 API Key loaded: ✓ Yes
```

### Start Frontend Dev Server:
```bash
# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 🔑 Important - Set Gemini API Key:

1. Get a free API key from: https://ai.google.dev/
2. Update `backend/.env`:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

❌ If API key is invalid:
- Backend will return 500 error
- Check console for "API Key loaded: ✗ No"

---

## ✅ Testing the Flow:

1. Go to http://localhost:5173
2. Click **"📊 Dashboard"** tab
3. Upload a PDF resume
4. Click **"🚀 Analyze with AI"**
5. Wait for analysis results

### If you get 500 error:
- Check backend console for detailed error message
- Verify GEMINI_API_KEY in `.env`
- Ensure backend is running on port 5000

---

## 📱 Frontend Error Handling:

The upload card now shows:
- ✅ Success messages with full analysis
- ❌ Error messages with troubleshooting hints
- ⏳ Loading state during analysis

---

## 🐛 Common Issues:

| Problem | Solution |
|---------|----------|
| 500 error on upload | Check `.env` file has valid GEMINI_API_KEY |
| Backend not responding | Ensure `node server.js` is running |
| "Network error" | Check if frontend can reach `localhost:5000` |
| PDF extraction fails | Try a different PDF file |

---

## 📊 Backend Endpoints:

```
GET  /api/health                    - Check if server is running
POST /api/resume/analyze            - Analyze resume with job description
```

### POST /api/resume/analyze
Request body:
```
{
  "resume": <PDF file>,
  "jobDescription": "Required skills..."
}
```

Response:
```json
{
  "skillsMatch": 85,
  "atsScore": 78,
  "experienceMatch": 82,
  "verdict": "Strong Fit",
  "matchedKeywords": ["React", "Node.js", "MongoDB"],
  "missingSkills": ["Docker", "Kubernetes"],
  "summary": "Great candidate with strong technical skills...",
  "resumeText": "Full extracted resume text..."
}
```
