# Health Portfolio — Deepak Bansal

A personalized, privacy-first web dashboard to manage health reports, track diet plans, and maintain an organized medical timeline. This project is built using basic HTML, CSS, and Vanilla JS, making it extremely lightweight and perfect for hosting on GitHub Pages.

## Features

- **Tabbed Interface**: Switch between Today, Food List, Safety, and Reports without mixing daily actions with reference material.
- **Summer Diet + Hunger Plan**: Configured with a diabetic-friendly summer diet plan, measured hunger snacks, hydration, multi-grain atta guidance, and strict portion controls.
- **Report Tracking**: Keep track of key markers (e.g., Fasting Sugar, HbA1c, Triglycerides) historically without clutter.
- **Privacy First**: All data is stored in local JSON files.

## Project Structure

- `index.html` — The main interface.
- `app.js` — The logic for loading data and rendering the UI.
- `style.css` — The styling (premium and responsive).
- `data/` — The directory where all data is stored.
  - `data/manifest.json` — Tracks which reports are available. Add new reports here.
  - `data/diet.json` — The current active diet plan (goals, schedule, hunger/snack rules, recipes, safety, lifestyle).
  - `data/reports/*.json` — Historical data files, one per report.
- `raw/` — Contains raw research files or reference documents (e.g., `chatgpt-research.html`).

## How to Run Locally

Because the dashboard fetches data from local JSON files, you cannot just open `index.html` directly in a browser (CORS policy will block it). You must serve it through a local web server.

### Option 1: Using Python (Recommended)
If you are on a Mac or Linux machine, you likely already have Python installed.
1. Open your terminal.
2. Navigate to this directory.
3. Run the following command:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to `http://localhost:8000`.

### Option 2: Using Node.js (npx)
If you have Node.js installed, you can use the `serve` package:
1. Open your terminal in this directory.
2. Run:
   ```bash
   npx serve .
   ```
3. Open the link provided in the terminal (usually `http://localhost:3000`).

## How to Update Data

1. **Diet Plan**: Edit `data/diet.json`. The UI will automatically re-render based on your updates to goals, schedule, recipes, and lifestyle rules.
2. **Adding a New Report**:
   - Create a new JSON file in `data/reports/` (e.g., `2026-06-01.json`). Use existing files as a template.
   - Update `data/manifest.json` by adding a new entry to the `"reports"` array with the date, filename, and display label.

## Deployment (GitHub Pages)

Since this is a standard static site, it can be hosted for free on GitHub Pages.
1. Push this entire repository to GitHub.
2. Go to the repository **Settings** > **Pages**.
3. Under "Build and deployment", select the `main` branch and `/ (root)` folder.
4. Click **Save**. Within a few minutes, your dashboard will be live on a public URL.
