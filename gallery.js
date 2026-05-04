// ==================== GALLERY PAGE JAVASCRIPT ====================

document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('emptyState');
    const refreshBtn = document.getElementById('refreshBtn');
    const loader = document.getElementById('loader');
    const statusDiv = document.getElementById('status');
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const closeModal = document.querySelector('.close');

    // Load images on page load
    loadImages();

    // Refresh button
    refreshBtn.addEventListener('click', loadImages);

    // Close modal
    closeModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Edit form submission
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await updateImageTitle();
    });
});

// ==================== LOAD IMAGES ====================

async function loadImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('emptyState');
    const loader = document.getElementById('loader');
    const statusDiv = document.getElementById('status');

    // Show loader
    loader.style.display = 'block';
    statusDiv.style.display = 'none';
    galleryGrid.innerHTML = '';
    emptyState.style.display = 'none';

    try {
        console.log('Fetching images from:', API_CONFIG.GET_URL);
        
        const response = await fetch(API_CONFIG.GET_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to load images: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received data:', data);

        // Handle different response formats
        let images = [];
        
        if (Array.isArray(data)) {
            images = data;
        } else if (data.Documents && Array.isArray(data.Documents)) {
            images = data.Documents;
        } else if (data.value && Array.isArray(data.value)) {
            images = data.value;
        }

        if (images.length === 0) {
            emptyState.style.display = 'block';
        } else {
            displayImages(images);
        }

    } catch (error) {
        console.error('Error loading images:', error);
        showStatus(`❌ Failed to load images: ${error.message}`, 'error');
        emptyState.style.display = 'block';
    } finally {
        loader.style.display = 'none';
    }
}

// ==================== DISPLAY IMAGES ====================

function displayImages(images) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    images.forEach(image => {
        const card = createImageCard(image);
        galleryGrid.appendChild(card);
    });
}

function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'gallery-item';

    // Format date
    const uploadDate = new Date(image.uploadDate || image._ts * 1000);
    const formattedDate = uploadDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    card.innerHTML = `
        <img src="${image.blobURL}" alt="${image.title}" onclick="window.open('${image.blobURL}', '_blank')">
        <div class="gallery-item-info">
            <div class="gallery-item-title" title="${image.title}">${image.title}</div>
            <div class="gallery-item-date">📅 ${formattedDate}</div>
            <div class="gallery-item-actions">
                <button class="btn-edit" onclick="openEditModal('${image.id}', '${escapeHtml(image.title)}')">
                    ✏️ Edit
                </button>
                <button class="btn-delete" onclick="deleteImage('${image.id}', '${image.blobURL}')">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `;

    return card;
}

// ==================== EDIT IMAGE ====================

function openEditModal(imageId, currentTitle) {
    const editModal = document.getElementById('editModal');
    const editImageId = document.getElementById('editImageId');
    const editTitle = document.getElementById('editTitle');

    editImageId.value = imageId;
    editTitle.value = unescapeHtml(currentTitle);
    editModal.style.display = 'block';
}

async function updateImageTitle() {
    const editImageId = document.getElementById('editImageId');
    const editTitle = document.getElementById('editTitle');
    const editModal = document.getElementById('editModal');
    const statusDiv = document.getElementById('status');

    const imageId = editImageId.value;
    const newTitle = editTitle.value.trim();

    if (!newTitle) {
        alert('Please enter a title');
        return;
    }

    try {
        console.log('Updating image:', imageId, 'with title:', newTitle);

        const payload = {
            id: imageId,
            title: newTitle
        };

        const response = await fetch(API_CONFIG.UPDATE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Update successful');
            showStatus('✅ Image title updated successfully!', 'success');
            editModal.style.display = 'none';
            
            // Reload images after short delay
            setTimeout(() => {
                loadImages();
            }, 1000);
        } else {
            throw new Error(`Update failed: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Update error:', error);
        showStatus(`❌ Update failed: ${error.message}`, 'error');
    }
}

// ==================== DELETE IMAGE ====================

async function deleteImage(imageId, blobURL) {
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
        return;
    }

    const statusDiv = document.getElementById('status');
    const loader = document.getElementById('loader');

    // Extract filename from blobURL
    const fileName = blobURL.split('/').pop();

    try {
        console.log('Deleting image:', imageId, fileName);

        const payload = {
            id: imageId,
            fileName: fileName
        };

        loader.style.display = 'block';

        const response = await fetch(API_CONFIG.DELETE_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Delete successful');
            showStatus('✅ Image deleted successfully!', 'success');
            
            // Reload images after short delay
            setTimeout(() => {
                loadImages();
            }, 1000);
        } else {
            throw new Error(`Delete failed: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Delete error:', error);
        showStatus(`❌ Delete failed: ${error.message}`, 'error');
    } finally {
        loader.style.display = 'none';
    }
}

// ==================== HELPER FUNCTIONS ====================

function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = `status-message ${type}`;
    statusDiv.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function unescapeHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent;
}

// Make functions globally accessible
window.openEditModal = openEditModal;
window.deleteImage = deleteImage;
