# Security
- Passwords are stored as SHA-256 hashes for this demo.
- Session tokens are stored in Apps Script CacheService.
- Admin endpoints require ADMIN role.
- Users can only access actions allowed by their role.
- Drive upload currently makes files viewable by link for static image rendering.
- For production private photos, replace link sharing with an authenticated image proxy.
