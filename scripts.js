// Advanced Photo Album Manager
class PhotoAlbumManager {
    constructor() {
        this.albums = new Map();
        this.currentAlbum = null;
        this.selectedPhotos = new Set();
        this.currentPhotoIndex = 0;
        this.viewMode = 'grid'; // grid or list
        this.photosPerPage = 12;
        this.currentPage = 1;
        this.uploadedFiles = [];
        this.filteredPhotos = [];
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateStats();
        this.updateAlbumSelect();
        this.showWelcomeScreen();
    }

    // Storage Management
    loadFromStorage() {
        const stored = localStorage.getItem('photoAlbums');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.albums = new Map(Object.entries(data));
            } catch (e) {
                console.error('Error loading from storage:', e);
                this.showToast('Error loading saved albums', 'error');
            }
        }
    }

    saveToStorage() {
        try {
            const data = Object.fromEntries(this.albums);
            localStorage.setItem('photoAlbums', JSON.stringify(data));
            this.showToast('Albums saved successfully', 'success');
        } catch (e) {
            console.error('Error saving to storage:', e);
            this.showToast('Error saving albums. Storage may be full.', 'error');
        }
    }

    // Event Bindings
    bindEvents() {
        // Create Album Modal
        document.getElementById('createAlbumBtn').addEventListener('click', () => {
            this.openCreateAlbumModal();
        });

        document.getElementById('closeCreateAlbumModal').addEventListener('click', () => {
            this.closeCreateAlbumModal();
        });

        document.getElementById('cancelCreateAlbum').addEventListener('click', () => {
            this.closeCreateAlbumModal();
        });

        document.getElementById('createAlbumForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createAlbum();
        });

        // Album cover preview
        document.getElementById('albumCover').addEventListener('change', (e) => {
            this.previewAlbumCover(e.target.files[0]);
        });

        // Album Selection
        document.getElementById('albumSelect').addEventListener('change', (e) => {
            if (e.target.value) {
                this.selectAlbum(e.target.value);
            } else {
                this.showWelcomeScreen();
            }
        });

        // Upload Modal
        document.getElementById('uploadBtn').addEventListener('click', () => {
            this.openUploadModal();
        });

        document.getElementById('closeUploadModal').addEventListener('click', () => {
            this.closeUploadModal();
        });

        // File input and drag & drop
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');

        uploadArea.addEventListener('click', () => {
            if (this.currentAlbum) {
                fileInput.click();
            } else {
                this.showToast('Please select an album first', 'warning');
            }
        });

        fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));

        // Drag and drop events
        uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadArea.addEventListener('drop', this.handleDrop.bind(this));

        // Upload actions
        document.getElementById('clearUpload').addEventListener('click', () => {
            this.clearUploadPreview();
        });

        document.getElementById('confirmUpload').addEventListener('click', () => {
            this.confirmUpload();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchPhotos(e.target.value);
        });

        // Gallery actions
        document.getElementById('selectAllBtn').addEventListener('click', () => {
            this.toggleSelectAll();
        });

        document.getElementById('deleteSelectedBtn').addEventListener('click', () => {
            this.deleteSelectedPhotos();
        });

        // View mode toggle
        document.getElementById('viewModeBtn').addEventListener('click', () => {
            this.toggleViewMode();
        });

        // Album actions
        document.getElementById('editAlbumBtn').addEventListener('click', () => {
            this.editCurrentAlbum();
        });

        document.getElementById('deleteAlbumBtn').addEventListener('click', () => {
            this.deleteCurrentAlbum();
        });

        // Photo modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closePhotoModal();
        });

        document.getElementById('imageModal').addEventListener('click', (e) => {
            if (e.target.id === 'imageModal') {
                this.closePhotoModal();
            }
        });

        // Photo modal navigation
        document.getElementById('prevImage').addEventListener('click', () => {
            this.navigatePhoto(-1);
        });

        document.getElementById('nextImage').addEventListener('click', () => {
            this.navigatePhoto(1);
        });

        // Photo modal actions
        document.getElementById('editPhotoBtn').addEventListener('click', () => {
            this.openEditPhotoModal();
        });

        document.getElementById('downloadImage').addEventListener('click', () => {
            this.downloadCurrentPhoto();
        });

        document.getElementById('deleteImage').addEventListener('click', () => {
            this.deleteCurrentPhoto();
        });

        // Edit Photo Modal
        document.getElementById('closeEditPhotoModal').addEventListener('click', () => {
            this.closeEditPhotoModal();
        });

        document.getElementById('cancelEditPhoto').addEventListener('click', () => {
            this.closeEditPhotoModal();
        });

        document.getElementById('editPhotoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePhotoEdit();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('imageModal').style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closePhotoModal();
                        break;
                    case 'ArrowLeft':
                        this.navigatePhoto(-1);
                        break;
                    case 'ArrowRight':
                        this.navigatePhoto(1);
                        break;
                }
            }
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                if (e.target.id === 'createAlbumModal') this.closeCreateAlbumModal();
                if (e.target.id === 'uploadModal') this.closeUploadModal();
                if (e.target.id === 'editPhotoModal') this.closeEditPhotoModal();
            }
        });
    }

    // Album Management
    openCreateAlbumModal() {
        document.getElementById('createAlbumModal').style.display = 'block';
        document.getElementById('albumName').focus();
    }

    closeCreateAlbumModal() {
        document.getElementById('createAlbumModal').style.display = 'none';
        document.getElementById('createAlbumForm').reset();
        document.getElementById('coverPreview').innerHTML = '';
    }

    previewAlbumCover(file) {
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('coverPreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Album Cover Preview">`;
        };
        reader.readAsDataURL(file);
    }

    createAlbum() {
        const formData = new FormData(document.getElementById('createAlbumForm'));
        const albumName = formData.get('albumName').trim();
        const albumDescription = formData.get('albumDescription').trim();
        const albumCategory = formData.get('albumCategory');
        const coverFile = formData.get('albumCover');

        if (!albumName) {
            this.showToast('Album name is required', 'error');
            return;
        }

        if (this.albums.has(albumName)) {
            this.showToast('Album name already exists', 'error');
            return;
        }

        // Create album object
        const album = {
            id: Date.now().toString(),
            name: albumName,
            description: albumDescription,
            category: albumCategory,
            cover: null,
            photos: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Handle cover image
        if (coverFile && coverFile.size > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                album.cover = e.target.result;
                this.finalizeAlbumCreation(album);
            };
            reader.readAsDataURL(coverFile);
        } else {
            this.finalizeAlbumCreation(album);
        }
    }

    finalizeAlbumCreation(album) {
        this.albums.set(album.name, album);
        this.saveToStorage();
        this.updateAlbumSelect();
        this.updateStats();
        this.closeCreateAlbumModal();
        this.showToast(`Album "${album.name}" created successfully!`, 'success');
        
        // Auto-select the new album
        document.getElementById('albumSelect').value = album.name;
        this.selectAlbum(album.name);
    }

    updateAlbumSelect() {
        const select = document.getElementById('albumSelect');
        const currentValue = select.value;
        
        select.innerHTML = '<option value="">Select an Album</option>';
        
        this.albums.forEach((album, name) => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        
        if (currentValue && this.albums.has(currentValue)) {
            select.value = currentValue;
        }
    }

    selectAlbum(albumName) {
        const album = this.albums.get(albumName);
        if (!album) return;

        this.currentAlbum = album;
        this.filteredPhotos = [...album.photos];
        this.selectedPhotos.clear();
        this.currentPage = 1;
        
        this.showAlbumOverview();
        this.displayGallery();
        this.updateStats();
        this.updateDeleteButton();
    }

    showAlbumOverview() {
        const overview = document.getElementById('albumOverview');
        const album = this.currentAlbum;
        
        // Update album cover
        const coverImg = document.getElementById('currentAlbumCover');
        if (album.cover) {
            coverImg.src = album.cover;
            coverImg.style.display = 'block';
        } else {
            coverImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjZjBmMGYwIi8+CjxwYXRoIGQ9Ik02MCA0MEw4MCA3MEg0MFoiIGZpbGw9IiNjY2MiLz4KPGNpcmNsZSBjeD0iNDUiIGN5PSI0NSIgcj0iNSIgZmlsbD0iI2NjYyIvPgo8L3N2Zz4K';
        }
        
        // Update album info
        document.getElementById('currentAlbumName').textContent = album.name;
        document.getElementById('currentAlbumDescription').textContent = album.description || 'No description';
        document.getElementById('currentAlbumCategory').textContent = album.category;
        document.getElementById('currentAlbumCount').textContent = `${album.photos.length} photo${album.photos.length !== 1 ? 's' : ''}`;
        document.getElementById('currentAlbumDate').textContent = `Created ${this.formatDate(album.createdAt)}`;
        
        overview.style.display = 'block';
    }

    editCurrentAlbum() {
        if (!this.currentAlbum) return;
        // This would open an edit album modal - implementation similar to create album
        this.showToast('Edit album functionality can be added here', 'info');
    }

    deleteCurrentAlbum() {
        if (!this.currentAlbum) return;
        
        const albumName = this.currentAlbum.name;
        if (!confirm(`Are you sure you want to delete the album "${albumName}" and all its photos?`)) {
            return;
        }
        
        this.albums.delete(albumName);
        this.saveToStorage();
        this.updateAlbumSelect();
        this.updateStats();
        this.showWelcomeScreen();
        this.showToast(`Album "${albumName}" deleted successfully`, 'success');
    }

    // Photo Upload
    openUploadModal() {
        if (!this.currentAlbum) {
            this.showToast('Please select an album first', 'warning');
            return;
        }
        
        const modal = document.getElementById('uploadModal');
        const albumInfo = document.getElementById('uploadAlbumInfo');
        albumInfo.innerHTML = `<p><strong>Adding photos to:</strong> ${this.currentAlbum.name}</p>`;
        
        modal.style.display = 'block';
    }

    closeUploadModal() {
        document.getElementById('uploadModal').style.display = 'none';
        this.clearUploadPreview();
    }

    handleDragOver(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.remove('dragover');
        if (!this.currentAlbum) {
            this.showToast('Please select an album first', 'warning');
            return;
        }
        this.handleFileSelect(e.dataTransfer.files);
    }

    handleFileSelect(files) {
        if (!this.currentAlbum) {
            this.showToast('Please select an album first', 'warning');
            return;
        }

        const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        
        if (validFiles.length !== files.length) {
            this.showToast('Some files were skipped (only images allowed)', 'warning');
        }
        
        validFiles.forEach(file => {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                this.showToast(`${file.name} is too large (max 10MB)`, 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedFiles.push({
                    file: file,
                    src: e.target.result,
                    title: file.name.split('.')[0],
                    description: '',
                    tags: '',
                    date: new Date().toISOString().split('T')[0],
                    location: ''
                });
                this.updateUploadPreview();
            };
            reader.readAsDataURL(file);
        });
    }

    updateUploadPreview() {
        const preview = document.getElementById('uploadPreview');
        preview.innerHTML = '';
        
        this.uploadedFiles.forEach((fileData, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            previewItem.innerHTML = `
                <img src="${fileData.src}" alt="${fileData.title}">
                <div class="preview-item-info">
                    <input type="text" placeholder="Photo title" value="${fileData.title}" 
                           onchange="photoAlbumManager.updateUploadFileData(${index}, 'title', this.value)">
                    <textarea placeholder="Description" rows="2"
                             onchange="photoAlbumManager.updateUploadFileData(${index}, 'description', this.value)">${fileData.description}</textarea>
                </div>
                <button class="preview-remove" onclick="photoAlbumManager.removeUploadFile(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            preview.appendChild(previewItem);
        });
    }

    updateUploadFileData(index, field, value) {
        if (this.uploadedFiles[index]) {
            this.uploadedFiles[index][field] = value;
        }
    }

    removeUploadFile(index) {
        this.uploadedFiles.splice(index, 1);
        this.updateUploadPreview();
    }

    clearUploadPreview() {
        this.uploadedFiles = [];
        this.updateUploadPreview();
        document.getElementById('fileInput').value = '';
    }

    confirmUpload() {
        if (this.uploadedFiles.length === 0) {
            this.showToast('Please select images to upload', 'warning');
            return;
        }

        if (!this.currentAlbum) {
            this.showToast('No album selected', 'error');
            return;
        }

        this.showLoading(true);
        
        setTimeout(() => {
            this.uploadedFiles.forEach((fileData) => {
                const photo = {
                    id: Date.now().toString() + Math.random().toString(36),
                    src: fileData.src,
                    title: fileData.title || 'Untitled Photo',
                    description: fileData.description || '',
                    tags: fileData.tags ? fileData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
                    date: fileData.date || new Date().toISOString().split('T')[0],
                    location: fileData.location || '',
                    uploadedAt: new Date().toISOString()
                };
                
                this.currentAlbum.photos.push(photo);
            });
            
            this.currentAlbum.updatedAt = new Date().toISOString();
            this.saveToStorage();
            this.filteredPhotos = [...this.currentAlbum.photos];
            this.displayGallery();
            this.updateStats();
            this.showAlbumOverview();
            this.closeUploadModal();
            this.showToast(`${this.uploadedFiles.length} photo${this.uploadedFiles.length !== 1 ? 's' : ''} uploaded successfully!`, 'success');
            this.showLoading(false);
        }, 1000);
    }

    // Gallery Display
    showWelcomeScreen() {
        this.currentAlbum = null;
        document.getElementById('albumOverview').style.display = 'none';
        document.getElementById('galleryTitle').textContent = 'Select an Album';
        
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = `
            <div class="welcome-screen">
                <i class="fas fa-photo-video welcome-icon"></i>
                <h2>Welcome to Your Photo Albums</h2>
                <p>Create your first album to start organizing your memories</p>
                <button class="btn btn-primary" onclick="photoAlbumManager.openCreateAlbumModal()">
                    <i class="fas fa-plus"></i> Create Your First Album
                </button>
            </div>
        `;
        
        document.getElementById('pagination').innerHTML = '';
        this.updateStats();
    }

    displayGallery() {
        if (!this.currentAlbum) {
            this.showWelcomeScreen();
            return;
        }

        const gallery = document.getElementById('gallery');
        const startIndex = (this.currentPage - 1) * this.photosPerPage;
        const endIndex = startIndex + this.photosPerPage;
        const photosToShow = this.filteredPhotos.slice(startIndex, endIndex);
        
        document.getElementById('galleryTitle').textContent = this.currentAlbum.name;
        
        if (photosToShow.length === 0) {
            gallery.innerHTML = `
                <div class="welcome-screen">
                    <i class="fas fa-images welcome-icon"></i>
                    <h2>No photos in this album</h2>
                    <p>Start adding photos to bring this album to life!</p>
                    <button class="btn btn-primary" onclick="photoAlbumManager.openUploadModal()">
                        <i class="fas fa-plus"></i> Add Photos
                    </button>
                </div>
            `;
            document.getElementById('pagination').innerHTML = '';
            return;
        }

        gallery.innerHTML = '';
        
        photosToShow.forEach((photo, index) => {
            const photoContainer = document.createElement('div');
            photoContainer.className = 'photo-container';
            
            photoContainer.innerHTML = `
                <input type="checkbox" class="photo-checkbox" data-id="${photo.id}">
                <img src="${photo.src}" alt="${photo.title}" loading="lazy" 
                     onclick="photoAlbumManager.openPhotoModal(${startIndex + index})">
                <div class="photo-overlay">
                    <div class="photo-info">
                        <h4>${photo.title}</h4>
                        <p>${photo.description || 'No description'}</p>
                        ${photo.tags.length > 0 ? `
                            <div class="photo-tags">
                                ${photo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <div class="photo-actions">
                        <button onclick="event.stopPropagation(); photoAlbumManager.openPhotoModal(${startIndex + index})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="event.stopPropagation(); photoAlbumManager.downloadPhoto('${photo.id}')" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button onclick="event.stopPropagation(); photoAlbumManager.deletePhoto('${photo.id}')" title="Delete" style="color: #dc3545;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // Add checkbox event listener
            const checkbox = photoContainer.querySelector('.photo-checkbox');
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectedPhotos.add(photo.id);
                } else {
                    this.selectedPhotos.delete(photo.id);
                }
                this.updateDeleteButton();
            });
            
            gallery.appendChild(photoContainer);
        });
        
        this.updatePagination();
    }

    // Photo Modal
    openPhotoModal(index) {
        this.currentPhotoIndex = index;
        const photo = this.filteredPhotos[index];
        
        if (!photo) return;
        
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const imageTitle = document.getElementById('modalImageTitle');
        const imageDescription = document.getElementById('modalImageDescription');
        const imageDate = document.getElementById('modalImageDate');
        const imageLocation = document.getElementById('modalImageLocation');
        const imageTags = document.getElementById('modalImageTags');
        
        modalImage.src = photo.src;
        imageTitle.textContent = photo.title;
        imageDescription.textContent = photo.description || 'No description available';
        imageDate.textContent = this.formatDate(photo.date) || 'No date';
        imageLocation.textContent = photo.location || 'No location';
        
        // Update tags
        imageTags.innerHTML = '';
        if (photo.tags && photo.tags.length > 0) {
            photo.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                imageTags.appendChild(tagElement);
            });
        } else {
            imageTags.innerHTML = '<span style="color: #999; font-style: italic;">No tags</span>';
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closePhotoModal() {
        document.getElementById('imageModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    navigatePhoto(direction) {
        this.currentPhotoIndex += direction;
        
        if (this.currentPhotoIndex < 0) {
            this.currentPhotoIndex = this.filteredPhotos.length - 1;
        } else if (this.currentPhotoIndex >= this.filteredPhotos.length) {
            this.currentPhotoIndex = 0;
        }
        
        this.openPhotoModal(this.currentPhotoIndex);
    }

    downloadCurrentPhoto() {
        const photo = this.filteredPhotos[this.currentPhotoIndex];
        if (photo) {
            this.downloadPhoto(photo.id);
        }
    }

    deleteCurrentPhoto() {
        const photo = this.filteredPhotos[this.currentPhotoIndex];
        if (photo && confirm(`Delete "${photo.title}"?`)) {
            this.deletePhoto(photo.id);
            this.closePhotoModal();
        }
    }

    // Edit Photo Modal
    openEditPhotoModal() {
        const photo = this.filteredPhotos[this.currentPhotoIndex];
        if (!photo) return;
        
        // Populate form
        document.getElementById('editPhotoPreview').src = photo.src;
        document.getElementById('photoTitle').value = photo.title;
        document.getElementById('photoDescription').value = photo.description || '';
        document.getElementById('photoTags').value = photo.tags ? photo.tags.join(', ') : '';
        document.getElementById('photoDate').value = photo.date || '';
        document.getElementById('photoLocation').value = photo.location || '';
        
        document.getElementById('editPhotoModal').style.display = 'block';
    }

    closeEditPhotoModal() {
        document.getElementById('editPhotoModal').style.display = 'none';
    }

    savePhotoEdit() {
        const photo = this.filteredPhotos[this.currentPhotoIndex];
        if (!photo) return;
        
        const form = document.getElementById('editPhotoForm');
        const formData = new FormData(form);
        
        // Update photo data
        photo.title = formData.get('photoTitle').trim() || 'Untitled Photo';
        photo.description = formData.get('photoDescription').trim();
        photo.tags = formData.get('photoTags').split(',').map(tag => tag.trim()).filter(tag => tag);
        photo.date = formData.get('photoDate');
        photo.location = formData.get('photoLocation').trim();
        
        this.saveToStorage();
        this.displayGallery();
        this.openPhotoModal(this.currentPhotoIndex); // Refresh modal
        this.closeEditPhotoModal();
        this.showToast('Photo updated successfully!', 'success');
    }

    // Photo Actions
    downloadPhoto(photoId) {
        const photo = this.currentAlbum.photos.find(p => p.id === photoId);
        if (!photo) return;
        
        const link = document.createElement('a');
        link.href = photo.src;
        link.download = `${photo.title || 'photo'}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast('Photo downloaded successfully!', 'success');
    }

    deletePhoto(photoId) {
        if (!confirm('Are you sure you want to delete this photo?')) return;
        
        this.currentAlbum.photos = this.currentAlbum.photos.filter(p => p.id !== photoId);
        this.currentAlbum.updatedAt = new Date().toISOString();
        this.filteredPhotos = this.filteredPhotos.filter(p => p.id !== photoId);
        this.selectedPhotos.delete(photoId);
        
        this.saveToStorage();
        this.displayGallery();
        this.showAlbumOverview();
        this.updateStats();
        this.updateDeleteButton();
        this.showToast('Photo deleted successfully!', 'success');
    }

    // Search and Filter
    searchPhotos(query) {
        if (!this.currentAlbum) return;
        
        if (!query.trim()) {
            this.filteredPhotos = [...this.currentAlbum.photos];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredPhotos = this.currentAlbum.photos.filter(photo => 
                photo.title.toLowerCase().includes(searchTerm) ||
                photo.description.toLowerCase().includes(searchTerm) ||
                photo.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                photo.location.toLowerCase().includes(searchTerm)
            );
        }
        
        this.currentPage = 1;
        this.displayGallery();
        this.updateStats();
    }

    // Bulk Actions
    toggleSelectAll() {
        if (!this.currentAlbum) return;
        
        const checkboxes = document.querySelectorAll('.photo-checkbox');
        const allSelected = this.selectedPhotos.size === this.filteredPhotos.length;
        
        if (allSelected) {
            this.selectedPhotos.clear();
            checkboxes.forEach(cb => cb.checked = false);
        } else {
            this.filteredPhotos.forEach(photo => this.selectedPhotos.add(photo.id));
            checkboxes.forEach(cb => cb.checked = true);
        }
        
        this.updateDeleteButton();
    }

    deleteSelectedPhotos() {
        if (this.selectedPhotos.size === 0) return;
        
        const count = this.selectedPhotos.size;
        if (!confirm(`Delete ${count} selected photo${count !== 1 ? 's' : ''}?`)) return;
        
        this.currentAlbum.photos = this.currentAlbum.photos.filter(
            photo => !this.selectedPhotos.has(photo.id)
        );
        
        this.filteredPhotos = this.filteredPhotos.filter(
            photo => !this.selectedPhotos.has(photo.id)
        );
        
        this.selectedPhotos.clear();
        this.currentAlbum.updatedAt = new Date().toISOString();
        this.saveToStorage();
        this.displayGallery();
        this.showAlbumOverview();
        this.updateStats();
        this.updateDeleteButton();
        this.showToast(`${count} photo${count !== 1 ? 's' : ''} deleted successfully!`, 'success');
    }

    updateDeleteButton() {
        const btn = document.getElementById('deleteSelectedBtn');
        btn.disabled = this.selectedPhotos.size === 0;
        btn.innerHTML = `<i class="fas fa-trash"></i> Delete Selected (${this.selectedPhotos.size})`;
    }

    // View Mode
    toggleViewMode() {
        this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
        const btn = document.getElementById('viewModeBtn');
        btn.innerHTML = this.viewMode === 'grid' ? 
            '<i class="fas fa-list"></i>' : '<i class="fas fa-th-large"></i>';
        
        const gallery = document.getElementById('gallery');
        if (this.viewMode === 'list') {
            gallery.classList.add('list-view');
        } else {
            gallery.classList.remove('list-view');
        }
        
        this.displayGallery();
    }

    // Pagination
    updatePagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredPhotos.length / this.photosPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="pagination-btn" onclick="photoAlbumManager.goToPage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage || 
                i === 1 || 
                i === totalPages || 
                (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                    onclick="photoAlbumManager.goToPage(${i})">${i}</button>`;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += '<span class="pagination-ellipsis">...</span>';
            }
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="pagination-btn" onclick="photoAlbumManager.goToPage(${this.currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>`;
        }
        
        pagination.innerHTML = paginationHTML;
    }

    goToPage(page) {
        this.currentPage = page;
        this.displayGallery();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Stats and Updates
    updateStats() {
        const totalAlbums = this.albums.size;
        const totalPhotos = Array.from(this.albums.values()).reduce((total, album) => total + album.photos.length, 0);
        const viewingPhotos = this.filteredPhotos.length;
        
        document.getElementById('totalAlbums').textContent = totalAlbums;
        document.getElementById('totalPhotos').textContent = totalPhotos;
        document.getElementById('viewingPhotos').textContent = viewingPhotos;
    }

    // Utility Functions
    formatDate(dateString) {
        if (!dateString) return 'No date';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid date';
        
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        spinner.style.display = show ? 'flex' : 'none';
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconClass = type === 'success' ? 'check' : 
                         type === 'error' ? 'times' : 
                         type === 'warning' ? 'exclamation-triangle' : 'info-circle';
        
        toast.innerHTML = `
            <i class="fas fa-${iconClass}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (container.contains(toast)) {
                toast.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (container.contains(toast)) {
                        container.removeChild(toast);
                    }
                }, 300);
            }
        }, 4000);
    }

    // Data Export/Import (bonus feature)
    exportAlbums() {
        try {
            const data = {
                albums: Object.fromEntries(this.albums),
                exportDate: new Date().toISOString(),
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `photo-albums-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            this.showToast('Albums exported successfully!', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showToast('Export failed. Please try again.', 'error');
        }
    }

    importAlbums(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.albums) {
                    // Merge with existing albums
                    Object.entries(data.albums).forEach(([name, album]) => {
                        if (!this.albums.has(name)) {
                            this.albums.set(name, album);
                        }
                    });
                    
                    this.saveToStorage();
                    this.updateAlbumSelect();
                    this.updateStats();
                    this.showToast('Albums imported successfully!', 'success');
                } else {
                    this.showToast('Invalid backup file format', 'error');
                }
            } catch (error) {
                console.error('Import failed:', error);
                this.showToast('Import failed. Invalid file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Keyboard Shortcuts
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only activate shortcuts when no modal is open and no input is focused
            if (document.querySelector('.modal[style*="block"]') || 
                document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key.toLowerCase()) {
                case 'n':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.openCreateAlbumModal();
                    }
                    break;
                case 'u':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.openUploadModal();
                    }
                    break;
                case 'a':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.toggleSelectAll();
                    }
                    break;
                case 'delete':
                    if (this.selectedPhotos.size > 0) {
                        this.deleteSelectedPhotos();
                    }
                    break;
            }
        });
    }

    // Search with debouncing
    initDebouncedSearch() {
        let searchTimeout;
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchPhotos(e.target.value);
            }, 300); // 300ms debounce
        });
    }

    // Initialize everything
    initialize() {
        this.initKeyboardShortcuts();
        this.initDebouncedSearch();
        
        // Add helpful tooltips
        this.addTooltips();
        
        // Check for saved state
        const lastAlbum = localStorage.getItem('lastSelectedAlbum');
        if (lastAlbum && this.albums.has(lastAlbum)) {
            document.getElementById('albumSelect').value = lastAlbum;
            this.selectAlbum(lastAlbum);
        }
    }

    addTooltips() {
        // Add title attributes for better UX
        document.getElementById('createAlbumBtn').title = 'Create new album (Ctrl+N)';
        document.getElementById('uploadBtn').title = 'Upload photos (Ctrl+U)';
        document.getElementById('selectAllBtn').title = 'Select all photos (Ctrl+A)';
        document.getElementById('deleteSelectedBtn').title = 'Delete selected photos (Delete)';
        document.getElementById('viewModeBtn').title = 'Toggle view mode';
        document.getElementById('searchInput').title = 'Search photos by title, description, tags, or location';
    }

    // Save last selected album
    selectAlbum(albumName) {
        const album = this.albums.get(albumName);
        if (!album) return;

        this.currentAlbum = album;
        this.filteredPhotos = [...album.photos];
        this.selectedPhotos.clear();
        this.currentPage = 1;
        
        // Save last selected album
        localStorage.setItem('lastSelectedAlbum', albumName);
        
        this.showAlbumOverview();
        this.displayGallery();
        this.updateStats();
        this.updateDeleteButton();
    }
}

// Initialize the photo album manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.photoAlbumManager = new PhotoAlbumManager();
    photoAlbumManager.initialize();
});

// Add some demo data for testing (remove in production)
function addDemoData() {
    if (photoAlbumManager.albums.size === 0) {
        // Create a demo album
        const demoAlbum = {
            id: 'demo-' + Date.now(),
            name: 'Demo Album',
            description: 'A sample album to showcase the features',
            category: 'personal',
            cover: null,
            photos: [
                {
                    id: 'demo-photo-1',
                    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVhIi8+CjxjaXJjbGUgY3g9IjMwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiNmZmY5MDAiLz4KPHBhdGggZD0iTTUwIDI1MEwyMDAgMTUwTDM1MCAyNTBINTBaIiBmaWxsPSIjNDU4NTNkIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiPkRlbW8gUGhvdG88L3RleHQ+Cjwvc3ZnPg==',
                    title: 'Beautiful Landscape',
                    description: 'A stunning view of mountains and sunset. This is a demo photo to show how descriptions work in the photo album manager.',
                    tags: ['landscape', 'sunset', 'demo'],
                    date: '2024-01-15',
                    location: 'Demo Location',
                    uploadedAt: new Date().toISOString()
                }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        photoAlbumManager.albums.set(demoAlbum.name, demoAlbum);
        photoAlbumManager.saveToStorage();
        photoAlbumManager.updateAlbumSelect();
        photoAlbumManager.updateStats();
    }
}

// Uncomment the line below to add demo data on first load
// setTimeout(() => addDemoData(), 1000);