<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weighted Job Scheduler</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="container">
      <h1>Weighted Job Scheduling Visualizer</h1>
      <p class="subtitle">
        Solve using Dynamic Programming and compare with a Greedy strategy.
      </p>

      <section class="card form-card">
        <h2>Add Job</h2>
        <div class="form-grid">
          <label>
            Start Time
            <input type="number" id="start" step="0.1" />
          </label>
          <label>
            End Time
            <input type="number" id="end" step="0.1" />
          </label>
          <label>
            Profit
            <input type="number" id="profit" step="0.1" />
          </label>
          <label>
            Algorithm
            <select id="algorithm">
              <option value="dp">Dynamic Programming</option>
              <option value="greedy">Greedy</option>
            </select>
          </label>
        </div>

        <div class="actions">
          <button id="addJobBtn">Add Job</button>
          <button id="loadSampleBtn" class="secondary">Load Sample Data</button>
          <button id="runBtn" class="primary">Run Algorithm</button>
          <button id="clearBtn" class="danger">Clear All</button>
        </div>
        <p id="message" class="message"></p>
      </section>

      <section class="card">
        <h2>Entered Jobs</h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Start</th>
                <th>End</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody id="jobsTableBody"></tbody>
          </table>
        </div>
      </section>

      <section class="card">
        <h2>Results</h2>
        <div class="result-grid">
          <div><strong>Algorithm:</strong> <span id="resultAlgorithm">-</span></div>
          <div><strong>Max Profit:</strong> <span id="maxProfit">-</span></div>
          <div><strong>Time:</strong> <span id="timeComplexity">-</span></div>
          <div><strong>Space:</strong> <span id="spaceComplexity">-</span></div>
        </div>
        <h3>Selected Jobs</h3>
        <ul id="selectedJobsList"></ul>
      </section>

      <section class="card">
        <h2>Timeline Visualization</h2>
        <div class="viz-controls">
          <label>
            Animation Speed
            <select id="animationSpeed">
              <option value="900">Slow</option>
              <option value="600" selected>Normal</option>
              <option value="300">Fast</option>
            </select>
          </label>
          <button id="playStepsBtn" class="secondary">Play Steps</button>
        </div>
        <div id="timeline" class="timeline"></div>
        <div id="stepInfo" class="step-info">Run algorithm to see step-by-step execution.</div>
      </section>

      <section class="card">
        <h2>DP Table (for DP mode)</h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>i</th>
                <th>Job (start-end, profit)</th>
                <th>Last Compatible Index</th>
                <th>DP Value</th>
              </tr>
            </thead>
            <tbody id="dpTableBody"></tbody>
          </table>
        </div>
      </section>
    </main>

    <div id="resultModal" class="result-modal hidden">
      <div class="result-modal-card">
        <h3>Scheduling Result</h3>
        <p id="resultModalText"></p>
        <button id="closeResultModalBtn" class="primary">Close</button>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
