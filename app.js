// ==================== UPLOAD PAGE JAVASCRIPT ====================

document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const imageFile = document.getElementById('imageFile');
    const imageTitle = document.getElementById('imageTitle');
    const uploadBtn = document.getElementById('uploadBtn');
    const statusDiv = document.getElementById('status');
    const loader = document.getElementById('loader');
    const preview = document.getElementById('preview');
    const previewImage = document.getElementById('previewImage');

    // Image preview
    imageFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                showStatus('File size must be less than 5MB', 'error');
                imageFile.value = '';
                preview.style.display = 'none';
                return;
            }

            // Validate file type
            if (!file.type.match('image/jpeg') && !file.type.match('image/jpg') && !file.type.match('image/png')) {
                showStatus('Only JPG and PNG images are allowed', 'error');
                imageFile.value = '';
                preview.style.display = 'none';
                return;
            }

            // Show preview
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Form submission
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const file = imageFile.files[0];
        const title = imageTitle.value.trim();

        if (!file || !title) {
            showStatus('Please fill in all fields', 'error');
            return;
        }

        // Disable form during upload
        uploadBtn.disabled = true;
        uploadBtn.textContent = '⏳ Uploading...';
        loader.style.display = 'block';
        statusDiv.style.display = 'none';

        try {
            // Convert image to base64
            const base64Image = await fileToBase64(file);
            
            // Remove the data URL prefix (data:image/jpeg;base64,)
            const base64Data = base64Image.split(',')[1];

            // Get file extension
            const fileExtension = file.name.split('.').pop().toLowerCase();
            
            // Generate unique filename
            const fileName = `${Date.now()}_${sanitizeFilename(file.name)}`;

            // Prepare payload
            const payload = {
                title: title,
                imageData: base64Data,
                fileName: fileName,
                fileType: fileExtension
            };

            console.log('Uploading image:', fileName);

            // Call Logic App
            const response = await fetch(API_CONFIG.UPLOAD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Upload successful:', result);
                
                showStatus('✅ Image uploaded successfully!', 'success');
                
                // Reset form
                uploadForm.reset();
                preview.style.display = 'none';
                
                // Redirect to gallery after 2 seconds
                setTimeout(() => {
                    window.location.href = 'gallery.html';
                }, 2000);
            } else {
                throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Upload error:', error);
            showStatus(`❌ Upload failed: ${error.message}`, 'error');
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.textContent = '📤 Upload Image';
            loader.style.display = 'none';
        }
    });
});

// ==================== HELPER FUNCTIONS ====================

/**
 * Convert file to base64 string
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

/**
 * Sanitize filename to remove special characters
 */
function sanitizeFilename(filename) {
    return filename
        .replace(/[^a-z0-9._-]/gi, '_')
        .toLowerCase();
}

/**
 * Show status message
 */
function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = `status-message ${type}`;
    statusDiv.style.display = 'block';

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}
