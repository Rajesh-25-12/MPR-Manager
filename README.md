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
- If an employee is assigned to a job:
  - Displays employee name, code, and profile photo

### 3. Unassigned Jobs Handling
- If no employee is mapped to the job:
  - Displays a button to raise a Man Power Request (MPR) for that job

### 4. Man Power Request (MPR) Management
- When a user raises an MPR:
  - Captures Job ID, Job Title, Date of Request, and Requested By
  - User can add one or more candidates under each MPR

### 5. Candidate Management
- For each candidate added to an MPR, user can enter:
  - Name
  - Email
  - Phone Number
  - Description
  - Experience
  - Expected Salary
  - Upload Resume
- User can view all candidates associated with an MPR

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── OrganizationChart.js      # Main tree structure component
│   ├── JobNode.js                 # Individual job node component
│   ├── MPRModal.js                # Modal for creating MPR
│   ├── CandidatesModal.js         # Modal for viewing MPR and candidates
│   ├── CandidateForm.js           # Form for adding/editing candidates
│   └── *.css                      # Component styles
├── context/
│   └── AppContext.js              # Global state management
├── data/
│   └── mockData.js                # Mock data for jobs, employees, MPRs
├── App.js                          # Main app component
└── index.js                        # Entry point
```

## Technologies Used

- React 18.2.0
- React Context API for state management
- CSS3 for styling
- Create React App

## Usage

1. **View Organization Chart**: The main page displays the organization chart in a tree structure.

2. **Raise MPR**: Click on "Raise MPR" button for any unassigned job to create a new Manpower Request.

3. **Add Candidates**: After creating an MPR, click on "View MPR" to see the MPR details and add candidates.

4. **Manage Candidates**: Add candidate details including name, email, phone, experience, expected salary, and upload resume.

## Notes

- The application uses mock data for demonstration purposes
- File uploads are simulated (file names are stored but actual file handling would need backend integration)
- The organization chart is responsive and adapts to different screen sizes

