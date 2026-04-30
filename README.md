# Weighted Job Scheduling Visualizer

Full-stack web application to solve and visualize the **Weighted Job Scheduling Problem**.

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js + Express
- Algorithm Engine: Python

## Features

- Add jobs with `start`, `end`, `profit`
- Run **Dynamic Programming** (primary)
- Run **Greedy** (comparison mode)
- View maximum profit and selected jobs
- Timeline visualization (selected vs non-selected)
- DP table visualization (in DP mode)

## Project Structure

```text
project/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   └── scheduler.py
│
└── package.json
```

## Prerequisites

- Node.js 18+ recommended
- Python 3 installed and available in PATH
  - You can also set a custom executable path:
    - Windows PowerShell: `$env:PYTHON_PATH="C:\Path\To\python.exe"`
    - macOS/Linux: `export PYTHON_PATH=/usr/bin/python3`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open in browser:

- [http://localhost:3000](http://localhost:3000)

## Windows PowerShell Fix (for npm.ps1 blocked)

If PowerShell shows:
`npm.ps1 cannot be loaded because running scripts is disabled on this system`

use either of these options:

1. Use npm via cmd shim:

```powershell
npm.cmd install
npm.cmd start
```

2. Start without npm:

```powershell
node backend/server.js
```

3. Use the included Windows launcher:

```powershell
.\start-server.bat
```

It auto-installs dependencies (if needed) and starts the server.

## Python Requirement

This project uses `backend/scheduler.py` for the core DP algorithm.
If `/schedule` fails, install Python 3 and verify:

```powershell
python --version
```

Note: the backend now includes a Node.js fallback implementation for DP/Greedy, so the app still works even if Python is not available. When Python is installed, it remains the primary engine.

## API

### POST `/schedule`

Request:

```json
{
  "jobs": [
    { "start": 1, "end": 3, "profit": 50 },
    { "start": 2, "end": 5, "profit": 20 },
    { "start": 4, "end": 6, "profit": 70 }
  ],
  "algorithm": "dp"
}
```

`algorithm` can be:
- `dp`
- `greedy`

Response:

```json
{
  "algorithm": "dp",
  "maxProfit": 120,
  "selectedJobs": [
    { "start": 1, "end": 3, "profit": 50, "originalIndex": 0 },
    { "start": 4, "end": 6, "profit": 70, "originalIndex": 2 }
  ],
  "dpTable": [],
  "complexity": { "time": "O(n log n)", "space": "O(n)" }
}
```

## Sample Test Data

Use this set in UI or API:

```json
[
  { "start": 1, "end": 3, "profit": 50 },
  { "start": 2, "end": 5, "profit": 20 },
  { "start": 4, "end": 6, "profit": 70 },
  { "start": 6, "end": 7, "profit": 60 },
  { "start": 5, "end": 8, "profit": 30 },
  { "start": 7, "end": 9, "profit": 40 }
]
```
