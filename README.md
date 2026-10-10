# Orbit — React Frontend Dashboard

A responsive project-management dashboard starter built with React, Vite, and Lucide icons.

## Features
- Responsive sidebar and mobile navigation
- Dashboard cards and project progress indicators
- Task list with completion toggles
- Search tasks by title, project, or tag
- Create tasks with a modal dialog
- No backend required; sample data is held in React state

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract the ZIP file.
2. Open a terminal in the extracted `react-frontend-project` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Customize
- Edit `src/App.jsx` to change content and interactions.
- Edit `src/styles.css` to customize the theme and layout.
- Replace sample data with your own API when you add a backend.

This is a frontend starter only. Tasks reset when the page is refreshed because there is no database or persistent storage.
