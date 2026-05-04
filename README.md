# CloudSnap - Frontend Files

## 📁 Files Included

- `index.html` - Upload page
- `gallery.html` - Image gallery page
- `style.css` - Styling for all pages
- `config.js` - API endpoint configuration
- `app.js` - Upload functionality
- `gallery.js` - Gallery functionality

## 🚀 Quick Start - Local Testing

### Option 1: Using Python (Recommended)
```bash
# Navigate to the folder containing these files
cd cloudsnap-frontend

# Start a local server
python -m http.server 8000

# Open in browser: http://localhost:8000
```

### Option 2: Using VS Code Live Server
1. Open folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"

### Option 3: Direct File Opening
- Simply double-click `index.html`
- Note: Some browsers may block CORS requests when opening files directly

## ☁️ Deploy to Azure Static Web App

### Step 1: Create GitHub Repository
1. Go to https://github.com
2. Create new repository: `cloudsnap-app`
3. Upload all frontend files to this repository

### Step 2: Create Azure Static Web App
1. Go to Azure Portal
2. Search for "Static Web Apps"
3. Click "+ Create"
4. Fill in:
   - **Resource group:** `cloudsnap-rg`
   - **Name:** `cloudsnap-webapp`
   - **Plan type:** Free
   - **Region:** West Europe (or closest)
   - **Source:** GitHub
   - **GitHub account:** Sign in and authorize
   - **Repository:** Select `cloudsnap-app`
   - **Branch:** `main`
   - **Build presets:** Custom
   - **App location:** `/`
   - **Output location:** Leave empty
5. Click "Review + Create" → "Create"

### Step 3: Wait for Deployment
- Azure will automatically deploy your app
- Check the deployment status in GitHub Actions
- Your app will be available at: `https://cloudsnap-webapp.azurestaticapps.net`

## 🔧 Configuration

All API endpoints are already configured in `config.js` with your Logic App URLs:

```javascript
POST (Upload):    https://prod-04.francecentral.logic.azure.com/...
GET (Retrieve):   https://prod-05.francecentral.logic.azure.com/...
PUT (Update):     https://prod-30.francecentral.logic.azure.com/...
DELETE (Remove):  https://prod-10.francecentral.logic.azure.com/...
```

## ✅ Features

### Upload Page (`index.html`)
- Image file selection with preview
- Image title input
- File validation (JPG, PNG only, max 5MB)
- Upload progress indicator
- Success/error messages
- Auto-redirect to gallery after successful upload

### Gallery Page (`gallery.html`)
- Display all uploaded images in a grid
- Image preview (click to open in new tab)
- Edit image title with modal dialog
- Delete image with confirmation
- Refresh button to reload images
- Empty state when no images exist

## 🎨 Design Features

- **Responsive design** - Works on desktop, tablet, and mobile
- **Modern gradient background**
- **Smooth animations and transitions**
- **Professional card-based layout**
- **Loading indicators**
- **Status messages** (success, error, info)

## 🧪 Testing Your Application

### Test Upload:
1. Open `index.html`
2. Enter a title (e.g., "Test Image")
3. Select a JPG or PNG image
4. Click "Upload Image"
5. Wait for success message
6. Should redirect to gallery

### Test Gallery:
1. Open `gallery.html`
2. Should see your uploaded image
3. Click "Edit" to change title
4. Click "Delete" to remove image
5. Click "Refresh" to reload

### Test Each CRUD Operation:
- ✅ **CREATE** - Upload new image
- ✅ **READ** - View gallery
- ✅ **UPDATE** - Edit title
- ✅ **DELETE** - Remove image

## 🐛 Troubleshooting

### Images not loading?
- Check browser console for errors (F12)
- Verify Logic App URLs in `config.js`
- Check that Blob Storage has public access enabled
- Verify CORS is enabled on Storage Account

### Upload fails?
- Check file size (max 5MB)
- Check file type (JPG or PNG only)
- Check Logic App is running (go to Azure Portal → Logic App → Run History)

### CORS errors?
- Add CORS rule to Blob Storage (allow all origins for testing)
- Check Logic App response headers

## 📊 For Your Video Demo

Show these in your 5-minute video:

1. **Running Application** (2 min)
   - Upload an image
   - Show it in gallery
   - Edit the title
   - Delete an image

2. **Azure Resources** (2 min)
   - Show all 4 Logic Apps
   - Show Blob Storage with images
   - Show Cosmos DB with documents
   - Show Static Web App deployment

3. **Advanced Features** (30 sec)
   - Application Insights (if configured)
   - Azure Monitor (if configured)
   - CI/CD from GitHub

4. **Conclusion** (30 sec)
   - What works / what's partial
   - Any known issues

## 📝 Notes

- All your Logic App endpoints are already configured
- No code changes needed unless you recreate Logic Apps
- Files are ready to deploy as-is
- Compatible with Azure Static Web Apps free tier

## 🎓 For Coursework Submission

This frontend demonstrates:
- ✅ Static HTML hosting
- ✅ REST API integration
- ✅ CRUD operations
- ✅ Cloud-native architecture
- ✅ Responsive design
- ✅ Error handling
- ✅ User-friendly interface

Good luck with your presentation! 🚀
