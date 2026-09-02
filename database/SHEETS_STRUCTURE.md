# Google Sheets structure
The setup function creates:
- Users: id, email, name, passwordHash, role, active, createdAt
- Albums: id, title, description, coverUrl, folderId, createdAt, createdBy, active
- Photos: id, albumId, fileName, imageUrl, caption, createdAt, createdBy, favoriteCount, driveFileId, active
- Favorites: id, userId, photoId, createdAt
- Permissions: id, userId, albumId, canView, canUpload, canDelete
- ActivityLog: id, userId, action, entityType, entityId, details, createdAt
- Settings: key, value


### Photos — V3 metadata
Add these columns if your existing Photos sheet does not have them:
- `photoTitle` — title displayed with the photo
- `photoDate` — original/event date for the photo (YYYY-MM-DD)

Run `setupDatabase()` once after updating Apps Script; it will add missing columns automatically.
