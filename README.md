# Organization Chart & Manpower Request Management

A ReactJS application that displays an Organization Chart in a Tree Structure, shows job and employee details, manages Manpower Requests (MPR), and allows adding and tracking candidates associated with each request.

## Features

### 1. Organization Chart in Tree Structure

- Displays all jobs in the organization in a hierarchical (tree) format
- Each job node shows:
  - Job Title
  - Department
  - Reporting Structure (parent → child relationship)

### 2. Employee Details Display

# MPR Manager

A small React app for viewing an organization chart and managing Manpower Requests (MPRs) and candidates. It uses local state and mock data for demonstration; no backend is required to run the demo.

**Key features**

- View jobs in a hierarchical organization chart
- See assigned employee details or raise an MPR for unassigned jobs
- Create and view MPRs (Job ID, Job Title, Requested By, Date)
- Add and manage candidates per MPR (name, email, phone, experience, expected salary, resume upload)

## Quick start

Prerequisites: `Node.js` (v14+) and `npm` or `yarn`.

1. Install dependencies

```powershell
npm install
```

2. Start the development server

```powershell
npm start
```

3. Open the app

Open `http://localhost:3000` in your browser.

## Available scripts

- `npm start` - run the app in development mode
- `npm run build` - build for production
- `npm test` - run tests (if present)

## Project structure

The important files and folders in this workspace:

```
.
├─ public/
│  └─ index.html
├─ src/
│  ├─ App.js
│  ├─ index.js
│  ├─ components/
│  │  ├─ CandidateForm.js
│  │  ├─ FileUploadField.js
│  │  ├─ FormikTextField.js
│  │  └─ JobNode.js
│  ├─ data/
│  │  └─ mockData.js
│  ├─ pages/
│  │  └─ OrganizationChart.js
│  ├─ popups/
│  │  ├─ CandidatesModal.js
│  │  └─ MPRModal.js
│  └─ store/
│     └─ useStore.js
├─ package.json
└─ README.md
```

## Notes and next steps

- The app uses mock data in `src/data/mockData.js`. Integrate a backend API for persistence.
- File uploads are simulated — a backend endpoint is required to store resumes.
- If you'd like, I can: run the app locally, add a CONTRIBUTING section, or create a small API mock server. Tell me which you prefer.

---

Updated README for clarity and developer onboarding.

2. **Raise MPR**: Click on "Raise MPR" button for any unassigned job to create a new Manpower Request.
