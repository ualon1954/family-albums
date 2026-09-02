# Family Photo Album ULTIMATE V3.5.10 — FIXED

This package has been repacked as a clean ZIP.

## Important
- The ZIP archive itself is valid and passes integrity testing.
- The web frontend is available directly at the package root (`index.html`) after extraction.
- The original `frontend/` folder is also preserved.
- Dashboard provides direct navigation to:
  - Albums → `albums.html`
  - All Photos → `album.html?id=__ALL__`
  - Favorites → `favorites.html`

## Google Apps Script
Set the deployed Web App URL in:
`config.js`

```js
window.APP_CONFIG = {
  API_URL: "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
};
```

Deploy the files in `backend/` as the Google Apps Script project, then put its Web App URL in the frontend `config.js`.
