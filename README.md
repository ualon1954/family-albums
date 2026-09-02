<<<<<<< HEAD
# family-albums
=======
<<<<<<< HEAD
# family-album
=======
# Family Photo Album ULTIMATE v3 — PHOTO DISPLAY FIX
A complete family photo album with a static HTML/CSS/JS frontend and Google Apps Script + Google Sheets + Google Drive backend.

## Features
- Hebrew RTL responsive UI
- Dashboard and albums
- Gallery, lightbox and slideshow
- Login and sessions
- Admin dashboard
- Create/edit/delete albums
- Upload/delete photos
- Favorites
- Users and roles
- Album permissions
- Activity log
- Google Drive storage
- Google Sheets database
- Setup helper and health endpoint

## Quick start
1. Create a Google Sheet.
2. Extensions → Apps Script.
3. Copy all `.gs` files from `backend/` into the Apps Script project.
4. Copy `backend/appsscript.json` as the manifest.
5. Run `setupDatabase()` once and authorize.
6. Deploy → New deployment → Web app.
7. Execute as: Me. Who has access: Anyone.
8. Copy the Web App URL into `frontend/js/config.js`.
9. Serve `frontend/` from a local web server (recommended) or GitHub Pages.

## Default admin
Email: admin@example.com
Password: ChangeMe123!
Change it immediately.

## Important security note
For a real private family album, keep Drive files private and serve authorized images through a controlled endpoint. The demo upload implementation uses link-view access so a static frontend can display images easily.

\n## V3 photo display fix
V3 fixes the most common reason uploaded Google Drive photos do not appear in the gallery:
- Uploaded images now use Google Drive thumbnail URLs instead of `uc?export=view`.
- Existing photos are automatically converted to thumbnail URLs when `driveFileId` exists.
- Album cover URLs are normalized as well.
- Gallery images use `referrerpolicy="no-referrer"` and show a useful error state.
- No changes are required to the Google Sheets columns.

### IMPORTANT — redeploy Apps Script
Because the photo URL logic is in the `.gs` backend files, you must replace the old Apps Script code with the V3 backend files and create a **new deployment/version**.

### Google Drive sharing
The upload code still sets each uploaded file to **Anyone with the link → Viewer**. If your Google Workspace administrator blocks public link sharing, images may still be blocked by Google Drive policy.

### Upgrade from V2
1. Keep your existing Google Sheet and Drive folders.
2. Replace the Apps Script `.gs` files with the V3 files.
3. Save and deploy a new Web App version.
4. Put the new Web App URL in `frontend/js/config.js`.
5. Reload the frontend with Ctrl+F5.
6. Existing rows in the `Photos` sheet that have `driveFileId` will automatically receive the new display URL when requested.


## Photo titles and dates
The Admin upload panel now supports a title and date for every uploaded photo. Existing Photos sheets are migrated automatically by `setupDatabase()`.


V3.1 UI fixes: favorite buttons no longer open the fullscreen viewer; responsive hamburger navigation remains available on small screens.


## V3.4 additions
- Added virtual **כל האלבומים** album that shows all photos from albums the current user can view.
- Added photo delete button for users with delete permission and admins. Deleting also removes favorites and trashes the Drive file.


## V3.5.2 changes
- Photo captions now show the album name together with the photo year.
- Photo search in the gallery now includes a dedicated search field for album name.
- Backend photo/favorites responses include `albumTitle` so the album name is available for captions and filtering.


## V3.5.4 – Automatic Login Protection

- Dashboard now checks for a valid session/user before rendering user data.
- If the dashboard is opened without a logged-in username/session, it automatically redirects to the login screen.
- Login supports returning to the dashboard after successful authentication.
- Existing V3.5.3 album-loading, album-name/year caption and album-name search features are preserved.


## V3.5.5 – Automatic Modal Login Gate

- On opening the system home page without an active Session, the login Modal opens automatically.
- Protected pages (Dashboard, Albums, Album, Favorites, Trash and Admin) redirect to the home page and open the same login Modal when no Session exists.
- After successful login, the user returns to the page they originally requested.
- The password show/hide control remains available in the Modal.


## V3.5.6 – Password Eye Icon

- Password visibility control is now represented by an eye icon.
- Closed-eye icon = password is currently visible; clicking hides it.
- Open-eye icon = password is currently hidden; clicking shows it.
- Hebrew accessibility labels and tooltips are included.
- Works with the existing Modal Login and Dark Mode.

## V3.5.7 – Advanced Login
- Advanced login form with email and password visual icons.
- Email field includes a mail/envelope icon.
- Password field includes a lock icon.
- Preserves password show/hide eye control.
- Preserves Modal Login, automatic session check and Dark Mode.


## V3.5.8 – Advanced Session Manager
- Session expires after 60 minutes by default.
- Session is extended by user activity.
- Optional "Remember me" can extend the session to 7 days.
- Warning modal appears 5 minutes before expiry.
- Automatic logout and return to the home/login flow when the session expires.
- Direct access to protected pages is guarded when no valid session exists.
- Session state is centralized in `frontend/js/session-manager.js`.


## V3.5.9 – Mandatory Login Modal
- Removed the text "הצג/הסתר" password button from the login modal; the eye icon remains.
- When there is no active Session, the login modal cannot be closed with X or Escape.
- Clicking the backdrop does not close the mandatory login modal.
- The X close button is hidden while login is mandatory.
- After a valid Session exists, the modal can be closed normally.


## V3.5.10 – Login Field Icons
- Added an envelope icon to the email field in the login modal.
- Added a lock/password icon to the password field.
- Icons are embedded SVG, lightweight and work in Dark Mode.
- The eye icon remains the only password visibility control.
- Mandatory login locking from V3.5.9 is preserved.
>>>>>>> 8e7073a (Initial commit)
>>>>>>> c478544 (Initial commit)
