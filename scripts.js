// Enhanced Image Gallery Application
class ImageGallery {
    constructor() {
        this.images = {
            2023: [
                { 
                    id: 1, 
                    src: 'images/2023/1.jpeg', 
                    name: 'Summer Sunset', 
                    uploadDate: '2023-06-15',
                    description: 'Beautiful sunset over the mountains during summer vacation.',
                    album: 'default',
                    size: 1024000 // bytes
                },
                { 
                    id: 2, 
                    src: 'images/2023/2.jpeg', 
                    name: 'Mountain View', 
                    uploadDate: '2023-07-20',
                    description: 'Breathtaking mountain landscape with snow-capped peaks.',
                    album: 'default',
                    size: 2048000 
                },
                { 
                    id: 3, 
                    src: 'images/2023/3.jpeg', 
                    name: 'Ocean Waves', 
                    uploadDate: '2023-08-10',
                    description: 'Powerful ocean waves crashing on the rocky shore.',
                    album: 'default',
                    size: 1536000 
                },
                { 
                    id: 4, 
                    src: 'images/2023/4.jpeg', 
                    name: 'City Lights', 
                    uploadDate: '2023-09-05',
                    description: 'Dazzling city skyline illuminated at night.',
                    album: 'default',
                    size: 1792000 
                },
                { 
                    id: 5, 
                    src: 'images/2023/5.jpeg', 
                    name: 'Forest Path', 
                    uploadDate: '2023-10-12',
                    description: 'Peaceful walking trail through dense autumn forest.',
                    album: 'default',
                    size: 1344000 
                },
                { 
                    id: 6, 
                    src: 'images/2023/6.jpeg', 
                    name: 'Desert Dunes', 
                    uploadDate: '2023-11-18',
                    description: 'Golden sand dunes stretching endlessly into the horizon.',
                    album: 'default',
                    size: 1600000 
                },
                { 
                    id: 7, 
                    src: 'images/2023/7.jpeg', 
                    name: 'Winter Snow', 
                    uploadDate: '2023-12-25',
                    description: 'Fresh snow covering the landscape on Christmas morning.',
                    album: 'default',
                    size: 1152000 
                }
            ],
            2024: [
                { 
                    id: 8, 
                    src: 'images/2024/8.jpeg', 
                    name: 'Spring Flowers', 
                    uploadDate: '2024-03-15',
                    description: 'Colorful wildflowers blooming in the spring meadow.',
                    album: 'default',
                    size: 1280000 
                },
                { 
                    id: 9, 
                    src: 'images/2024/9.jpeg', 
                    name: 'River Rapids', 
                    uploadDate: '2024-04-20',
                    description: 'Fast-flowing river rapids surrounded by lush greenery.',
                    album: 'default',
                    size: 1888000 
                },
                { 
                    id: 10, 
                    src: 'images/2024/10.jpeg', 
                    name: 'Golden Hour', 
                    uploadDate: '2024-05-10',
                    description: 'Perfect golden hour lighting over rolling hills.',
                    album: 'default',
                    size: 1472000 
                },
                { 
                    id: 11, 
                    src: 'images/2024/11.jpeg', 
                    name: 'Urban Architecture', 
                    uploadDate: '2024-06-05',
                    description: 'Modern architectural marvels in the city center.',
                    album: 'default',
                    size: 2100000 
                },
                { 
                    id: 12, 
                    src: 'images/2024/12.jpeg', 
                    name: 'Wildlife Safari', 
                    uploadDate: '2024-07-12',
                    description: 'Amazing wildlife encounter during African safari adventure.',
                    album: 'default',
                    size: 1728000 
                },
                { 
                    id: 13, 
                    src: 'images/2024/13.jpeg', 
                    name: 'Coastal Beauty', 
                    uploadDate: '2024-08-18',
                    description: 'Stunning coastal cliffs meeting the deep blue ocean.',
                    album: 'default',
                    size: 1664000 
                },
                { 
                    id: 14, 
                    src: 'images/2024/14.jpeg', 
                    name: 'Autumn Colors', 
                    uploadDate: '2024-09-25',
                    description: 'Vibrant fall foliage creating a natural masterpiece.',
                    album: 'default',
                    size: 1408000 
                },
                { 
                    id: 15, 
                    src: 'images/2024/Mekatilili.jpg', 
                    name: 'Mekatilili Portrait', 
                    uploadDate: '2024-10-08',
                    description: 'Historical portrait of the legendary Kenyan freedom fighter.',
                    album: 'default',
                    size: 956000 
                },
                { 
                    id: 16, 
                    src: 'images/2024/15.jpeg', 
                    name: 'Starry Night', 
                    uploadDate: '2024-11-12',
                    description: 'Spectacular night sky filled with countless stars.',
                    album: 'default',
                    size: 1216000 
                },
                { 
                    id: 17, 
                    src: 'images/2024/16.jpeg', 
                    name: 'Beach Paradise', 
                    uploadDate: '2024-11-20',
                    description: 'Tropical beach paradise with crystal clear waters.',
                    album: 'default',
                    size: 1792000 
                },
                { 
                    id: 18, 
                    src: 'images/2024/17.jpeg', 
                    name: 'Mountain Peak', 
                    uploadDate: '2024-12-05',
                    description: 'Majestic mountain peak reaching towards the clouds.',
                    album: 'default',
                    size: 1536000 
                },
                { 
                    id: 19, 
                    src: 'images/2024/18.jpeg', 
                    name: 'Winter Landscape', 
                    uploadDate: '2024-12-18',
                    description: 'Serene winter landscape blanketed in pristine snow.',
                    album: 'default',
                    size: 1344000 
                }
            ],
            2025: [],
            2026: []
        };
        
        this.albums = {
            'default': {
                name: 'Default Album',
                description: 'Default album for all images',
                createdDate: '2024-01-01'
            }
        };
        
        this.currentYear = '2024';
        this.currentAlbum = 'all';
        this.currentImages = [];
        this.filteredImages = [];
        this.selectedImages = new Set();
        this.currentImageIndex = 0;
        this.viewMode = 'grid';
        this.sortBy = 'date';
        this.imagesPerPage = 12;
        this.currentPage = 1;
        this.currentTheme = 'dark';
        
        this.countdownInterval = null;
        this.uploadedFiles = [];
        this.currentEditingImage = null;
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.loadTheme();
        this.loadImages(this.currentYear);
        this.updateStats();
        this.updateAlbumSelectors();
    }

    // Storage Management
    loadFromStorage() {
        try {
            const storedImages = JSON.parse(localStorage.getItem('galleryImages') || 'null');
            const storedAlbums = JSON.parse(localStorage.getItem('galleryAlbums') || 'null');
            const storedTheme = localStorage.getItem('galleryTheme') || 'dark';
            
            if (storedImages) this.images = storedImages;
            if (storedAlbums) this.albums = storedAlbums;
            this.currentTheme = storedTheme;
        } catch (e) {
            console.error('Error loading from storage:', e);
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('galleryImages', JSON.stringify(this.images));
            localStorage.setItem('galleryAlbums', JSON.stringify(this.albums));
            localStorage.setItem('galleryTheme', this.currentTheme);
        } catch (e) {
            console.error('Error saving to storage:', e);
            this.showToast('Storage quota exceeded. Some data may not be saved.', 'warning');
        }
    }

    // Theme Management
    loadTheme() {
        document.body.setAttribute('data-theme', this.currentTheme);
        const themeBtn = document.getElementById('themeToggleBtn');
        themeBtn.innerHTML = this.currentTheme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.loadTheme();
        this.saveToStorage();
        this.showToast(`Switched to ${this.currentTheme} mode`, 'success');
    }

    // Event Bindings
    bindEvents() {
        // Theme toggle
        document.getElementById('themeToggleBtn').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Album selection
        document.getElementById('albumSelect').addEventListener('change', (e) => {
            this.currentAlbum = e.target.value;
            this.loadImages(this.currentYear);
        });

        // Year selection
        document.getElementById('yearSelect').addEventListener('change', (e) => {
            this.currentYear = e.target.value;
            this.loadImages(this.currentYear);
        });

        // Sort selection
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.loadImages(this.currentYear);
        });

        // Upload functionality
        document.getElementById('uploadBtn').addEventListener('click', () => {
            this.openUploadModal();
        });

        document.getElementById('closeUploadModal').addEventListener('click', () => {
            this.closeUploadModal();
        });

        // Create Album
        document.getElementById('createAlbumBtn').addEventListener('click', () => {
            this.openCreateAlbumModal();
        });

        document.getElementById('closeCreateAlbumModal').addEventListener('click', () => {
            this.closeCreateAlbumModal();
        });

        document.getElementById('confirmCreateAlbum').addEventListener('click', () => {
            this.createAlbum();
        });

        document.getElementById('cancelCreateAlbum').addEventListener('click', () => {
            this.closeCreateAlbumModal();
        });

        // Delete Album
        document.getElementById('deleteAlbumBtn').addEventListener('click', () => {
            this.deleteAlbum();
        });

        // Move Images
        document.getElementById('moveSelectedBtn').addEventListener('click', () => {
            this.openMoveImagesModal();
        });

        document.getElementById('closeMoveImagesModal').addEventListener('click', () => {
            this.closeMoveImagesModal();
        });

        document.getElementById('confirmMoveImages').addEventListener('click', () => {
            this.moveSelectedImages();
        });

        document.getElementById('cancelMoveImages').addEventListener('click', () => {
            this.closeMoveImagesModal();
        });

        // File input and drag & drop
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');

        uploadArea.addEventListener('click', () => fileInput.click());
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
            this.searchImages(e.target.value);
        });

        // Gallery actions
        document.getElementById('selectAllBtn').addEventListener('click', () => {
            this.toggleSelectAll();
        });

        document.getElementById('deleteSelectedBtn').addEventListener('click', () => {
            this.deleteSelectedImages();
        });

        // View mode toggle
        document.getElementById('viewModeBtn').addEventListener('click', () => {
            this.toggleViewMode();
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeImageModal();
        });

        document.getElementById('imageModal').addEventListener('click', (e) => {
            if (e.target.id === 'imageModal') {
                this.closeImageModal();
            }
        });

        // Navigation
        document.getElementById('prevImage').addEventListener('click', () => {
            this.navigateImage(-1);
        });

        document.getElementById('nextImage').addEventListener('click', () => {
            this.navigateImage(1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('imageModal').style.display === 'block') {
                if (e.key === 'Escape') this.closeImageModal();
                if (e.key === 'ArrowLeft') this.navigateImage(-1);
                if (e.key === 'ArrowRight') this.navigateImage(1);
            }
        });

        // Image modal actions
        document.getElementById('editImageBtn').addEventListener('click', () => {
            this.openEditImageModal();
        });

        document.getElementById('downloadImage').addEventListener('click', () => {
            this.downloadCurrentImage();
        });

        document.getElementById('deleteImage').addEventListener('click', () => {
            this.deleteCurrentImage();
        });

        // Edit Image Modal
        document.getElementById('closeEditImageModal').addEventListener('click', () => {
            this.closeEditImageModal();
        });

        document.getElementById('confirmEditImage').addEventListener('click', () => {
            this.saveImageEdits();
        });

        document.getElementById('cancelEditImage').addEventListener('click', () => {
            this.closeEditImageModal();
        });
    }

    // Album Management
    updateAlbumSelectors() {
        const selectors = [
            'albumSelect', 'uploadAlbum', 'targetAlbum', 'editImageAlbum'
        ];

        selectors.forEach(selectorId => {
            const selector = document.getElementById(selectorId);
            if (!selector) return;

            // Save current value
            const currentValue = selector.value;
            
            // Clear options (except for albumSelect which has "All Albums")
            if (selectorId === 'albumSelect') {
                selector.innerHTML = '<option value="all">All Albums</option>';
            } else {
                selector.innerHTML = '';
            }

            // Add album options
            Object.keys(this.albums).forEach(albumId => {
                const option = document.createElement('option');
                option.value = albumId;
                option.textContent = this.albums[albumId].name;
                selector.appendChild(option);
            });

            // Restore value if it still exists
            if (selector.querySelector(`option[value="${currentValue}"]`)) {
                selector.value = currentValue;
            }
        });

        // Show/hide delete album button
        const deleteAlbumBtn = document.getElementById('deleteAlbumBtn');
        if (this.currentAlbum !== 'all' && this.currentAlbum !== 'default') {
            deleteAlbumBtn.style.display = 'inline-flex';
        } else {
            deleteAlbumBtn.style.display = 'none';
        }
    }

    openCreateAlbumModal() {
        document.getElementById('createAlbumModal').style.display = 'block';
        document.getElementById('albumName').focus();
    }

    closeCreateAlbumModal() {
        document.getElementById('createAlbumModal').style.display = 'none';
        document.getElementById('albumName').value = '';
        document.getElementById('albumDescription').value = '';
    }

    createAlbum() {
        const name = document.getElementById('albumName').value.trim();
        const description = document.getElementById('albumDescription').value.trim();

        if (!name) {
            this.showToast('Please enter an album name', 'warning');
            return;
        }

        // Check if album name already exists
        const albumId = name.toLowerCase().replace(/\s+/g, '_');
        if (this.albums[albumId]) {
            this.showToast('Album name already exists', 'error');
            return;
        }

        this.albums[albumId] = {
            name: name,
            description: description,
            createdDate: new Date().toISOString().split('T')[0]
        };

        this.saveToStorage();
        this.updateAlbumSelectors();
        this.updateStats();
        this.closeCreateAlbumModal();
        this.showToast(`Album "${name}" created successfully!`, 'success');
    }

    deleteAlbum() {
        if (this.currentAlbum === 'all' || this.currentAlbum === 'default') {
            return;
        }

        const albumName = this.albums[this.currentAlbum].name;
        if (!confirm(`Are you sure you want to delete the album "${albumName}"? All images will be moved to the default album.`)) {
            return;
        }

        // Move all images from this album to default
        Object.keys(this.images).forEach(year => {
            this.images[year].forEach(image => {
                if (image.album === this.currentAlbum) {
                    image.album = 'default';
                }
            });
        });

        delete this.albums[this.currentAlbum];
        this.currentAlbum = 'all';
        document.getElementById('albumSelect').value = 'all';

        this.saveToStorage();
        this.updateAlbumSelectors();
        this.loadImages(this.currentYear);
        this.showToast(`Album "${albumName}" deleted successfully!`, 'success');
    }

    // Move Images Modal
    openMoveImagesModal() {
        if (this.selectedImages.size === 0) {
            this.showToast('Please select images to move', 'warning');
            return;
        }

        document.getElementById('selectedImagesCount').textContent = this.selectedImages.size;
        this.updateAlbumSelectors();
        document.getElementById('moveImagesModal').style.display = 'block';
    }

    closeMoveImagesModal() {
        document.getElementById('moveImagesModal').style.display = 'none';
    }

    moveSelectedImages() {
        const targetAlbum = document.getElementById('targetAlbum').value;
        let movedCount = 0;

        Object.keys(this.images).forEach(year => {
            this.images[year].forEach(image => {
                if (this.selectedImages.has(image.id)) {
                    image.album = targetAlbum;
                    movedCount++;
                }
            });
        });

        this.selectedImages.clear();
        this.saveToStorage();
        this.loadImages(this.currentYear);
        this.closeMoveImagesModal();
        this.showToast(`${movedCount} images moved successfully!`, 'success');
    }

    // Image Loading and Display with Sorting
    loadImages(year) {
        this.showLoading(true);
        this.currentYear = year;
        
        setTimeout(() => {
            let allImages = this.images[year] || [];
            
            // Filter by album if not "all"
            if (this.currentAlbum !== 'all') {
                allImages = allImages.filter(image => image.album === this.currentAlbum);
            }

            // Sort images
            this.currentImages = this.sortImages([...allImages]);
            this.filteredImages = [...this.currentImages];
            this.selectedImages.clear();
            
            if (year === '2026') {
                this.showCountdown();
                this.displayComingSoon();
            } else {
                this.hideCountdown();
                if (this.currentImages.length > 0) {
                    this.displayGallery();
                } else {
                    this.displayComingSoon();
                }
            }
            
            this.updateStats();
            this.updateGalleryTitle();
            this.updateActionButtons();
            this.showLoading(false);
        }, 500);
    }

    sortImages(images) {
        return images.sort((a, b) => {
            switch (this.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'size':
                    return (b.size || 0) - (a.size || 0);
                case 'date':
                default:
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
            }
        });
    }

    displayGallery() {
        const gallery = document.getElementById('gallery');
        const startIndex = (this.currentPage - 1) * this.imagesPerPage;
        const endIndex = startIndex + this.imagesPerPage;
        const imagesToShow = this.filteredImages.slice(startIndex, endIndex);
        
        gallery.innerHTML = '';
        
        imagesToShow.forEach((image, index) => {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            
            imageContainer.innerHTML = `
                <input type="checkbox" class="image-checkbox" data-id="${image.id}">
                <img src="${image.src}" alt="${image.name}" loading="lazy">
                <div class="image-overlay">
                    <div class="image-actions">
                        <button onclick="gallery.openImageModal(${startIndex + index})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="gallery.downloadImage(${image.id})" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button onclick="gallery.deleteImage(${image.id})" title="Delete" style="color: #dc3545;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="image-info-overlay">
                    <h4>${image.name}</h4>
                    <p>Uploaded: ${this.formatDate(image.uploadDate)}</p>
                    <p>Album: ${this.albums[image.album]?.name || 'Unknown'}</p>
                    <p>Size: ${this.formatFileSize(image.size || 0)}</p>
                    ${image.description ? `<p class="image-desc">${image.description.substring(0, 50)}${image.description.length > 50 ? '...' : ''}</p>` : ''}
                </div>
            `;
            
            // Add checkbox event listener
            const checkbox = imageContainer.querySelector('.image-checkbox');
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectedImages.add(image.id);
                } else {
                    this.selectedImages.delete(image.id);
                }
                this.updateActionButtons();
            });
            
            gallery.appendChild(imageContainer);
        });
        
        this.updatePagination();
    }

    displayComingSoon() {
        const gallery = document.getElementById('gallery');
        const isCurrentYear = this.currentYear === new Date().getFullYear().toString();
        const message = this.currentYear === '2026' ? 
            '🎉 Amazing content awaits in 2026!' : 
            isCurrentYear ? '📸 Start uploading images for this year!' : '🎊 Content coming soon for this year!';
        
        gallery.innerHTML = `
            <div class="coming-soon">
                <h2>Coming Soon!</h2>
                <p>${message}</p>
            </div>
        `;
        
        this.updatePagination();
    }

    // Search and Filter
    searchImages(query) {
        if (!query.trim()) {
            this.filteredImages = [...this.currentImages];
        } else {
            this.filteredImages = this.currentImages.filter(image => 
                image.name.toLowerCase().includes(query.toLowerCase()) ||
                (image.description && image.description.toLowerCase().includes(query.toLowerCase()))
            );
        }
        
        this.currentPage = 1;
        this.displayGallery();
        this.updateStats();
    }

    // Upload Functionality
    openUploadModal() {
        document.getElementById('uploadModal').style.display = 'block';
        document.getElementById('uploadYear').value = this.currentYear;
        document.getElementById('uploadAlbum').value = this.currentAlbum !== 'all' ? this.currentAlbum : 'default';
        this.updateAlbumSelectors();
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
        this.handleFileSelect(e.dataTransfer.files);
    }

    handleFileSelect(files) {
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
                    dataUrl: e.target.result,
                    name: file.name.split('.')[0],
                    size: file.size
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
                <img src="${fileData.dataUrl}" alt="${fileData.name}">
                <div class="preview-info">
                    <p>${fileData.name}</p>
                    <small>${this.formatFileSize(fileData.size)}</small>
                </div>
                <button class="preview-remove" onclick="gallery.removeUploadFile(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            preview.appendChild(previewItem);
        });
    }

    removeUploadFile(index) {
        this.uploadedFiles.splice(index, 1);
        this.updateUploadPreview();
    }

    clearUploadPreview() {
        this.uploadedFiles = [];
        this.updateUploadPreview();
        document.getElementById('fileInput').value = '';
        document.getElementById('imageDescription').value = '';
    }

    confirmUpload() {
        if (this.uploadedFiles.length === 0) {
            this.showToast('Please select images to upload', 'warning');
            return;
        }

        this.showLoading(true);
        const uploadYear = document.getElementById('uploadYear').value;
        const uploadAlbum = document.getElementById('uploadAlbum').value;
        const description = document.getElementById('imageDescription').value.trim();
        const currentDateTime = new Date().toISOString();
        
        setTimeout(() => {
            this.uploadedFiles.forEach((fileData) => {
                const newImage = {
                    id: Date.now() + Math.random(),
                    src: fileData.dataUrl,
                    name: fileData.name,
                    uploadDate: currentDateTime.split('T')[0],
                    uploadTime: currentDateTime,
                    description: description,
                    album: uploadAlbum,
                    size: fileData.size
                };
                
                if (!this.images[uploadYear]) {
                    this.images[uploadYear] = [];
                }
                
                this.images[uploadYear].push(newImage);
            });
            
            this.saveToStorage();
            this.showToast(`${this.uploadedFiles.length} images uploaded successfully!`, 'success');
            
            this.closeUploadModal();
            
            if (uploadYear === this.currentYear) {
                this.loadImages(this.currentYear);
            }
            
            this.showLoading(false);
        }, 1000);
    }

    // Image Modal
    openImageModal(index) {
        this.currentImageIndex = index;
        const image = this.filteredImages[index];
        
        if (!image) return;
        
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const imageName = document.getElementById('imageName');
        const imageDetails = document.getElementById('imageDetails');
        const imageDescription = document.getElementById('imageDescription');
        const imageAlbum = document.getElementById('imageAlbum');
        const imageUploadDate = document.getElementById('imageUploadDate');
        const imageSize = document.getElementById('imageSize');
        
        modalImage.src = image.src;
        imageName.textContent = image.name;
        imageDetails.textContent = `Uploaded: ${this.formatDate(image.uploadDate)}`;
        imageDescription.textContent = image.description || 'No description';
        imageAlbum.textContent = this.albums[image.album]?.name || 'Unknown';
        imageUploadDate.textContent = this.formatDate(image.uploadDate);
        imageSize.textContent = this.formatFileSize(image.size || 0);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeImageModal() {
        document.getElementById('imageModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    navigateImage(direction) {
        this.currentImageIndex += direction;
        
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.filteredImages.length - 1;
        } else if (this.currentImageIndex >= this.filteredImages.length) {
            this.currentImageIndex = 0;
        }
        
        this.openImageModal(this.currentImageIndex);
    }

    downloadCurrentImage() {
        const image = this.filteredImages[this.currentImageIndex];
        if (image) {
            this.downloadImage(image.id);
        }
    }

    deleteCurrentImage() {
        const image = this.filteredImages[this.currentImageIndex];
        if (image && confirm(`Delete "${image.name}"?`)) {
            this.deleteImage(image.id);
            this.closeImageModal();
        }
    }

    // Edit Image Modal
    openEditImageModal() {
        const image = this.filteredImages[this.currentImageIndex];
        if (!image) return;

        this.currentEditingImage = image;
        
        document.getElementById('editImageName').value = image.name;
        document.getElementById('editImageDescription').value = image.description || '';
        document.getElementById('editImageAlbum').value = image.album;
        
        this.updateAlbumSelectors();
        document.getElementById('editImageModal').style.display = 'block';
    }

    closeEditImageModal() {
        document.getElementById('editImageModal').style.display = 'none';
        this.currentEditingImage = null;
    }

    saveImageEdits() {
        if (!this.currentEditingImage) return;

        const newName = document.getElementById('editImageName').value.trim();
        const newDescription = document.getElementById('editImageDescription').value.trim();
        const newAlbum = document.getElementById('editImageAlbum').value;

        if (!newName) {
            this.showToast('Please enter an image name', 'warning');
            return;
        }

        // Find and update the image
        Object.keys(this.images).forEach(year => {
            this.images[year].forEach(image => {
                if (image.id === this.currentEditingImage.id) {
                    image.name = newName;
                    image.description = newDescription;
                    image.album = newAlbum;
                }
            });
        });

        this.saveToStorage();
        this.loadImages(this.currentYear);
        this.closeEditImageModal();
        this.closeImageModal();
        this.showToast('Image updated successfully!', 'success');
    }

    // Image Actions
    downloadImage(imageId) {
        const image = this.currentImages.find(img => img.id === imageId);
        if (!image) return;
        
        const link = document.createElement('a');
        link.href = image.src;
        link.download = image.name || 'image';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast('Image downloaded successfully!', 'success');
    }

    deleteImage(imageId) {
        if (!confirm('Are you sure you want to delete this image?')) return;
        
        this.images[this.currentYear] = this.images[this.currentYear].filter(img => img.id !== imageId);
        this.saveToStorage();
        this.loadImages(this.currentYear);
        this.showToast('Image deleted successfully!', 'success');
    }

    // Bulk Actions
    toggleSelectAll() {
        const checkboxes = document.querySelectorAll('.image-checkbox');
        const allSelected = this.selectedImages.size === this.filteredImages.length;
        
        if (allSelected) {
            this.selectedImages.clear();
            checkboxes.forEach(cb => cb.checked = false);
        } else {
            this.filteredImages.forEach(image => this.selectedImages.add(image.id));
            checkboxes.forEach(cb => cb.checked = true);
        }
        
        this.updateActionButtons();
    }

    deleteSelectedImages() {
        if (this.selectedImages.size === 0) return;
        
        const count = this.selectedImages.size;
        if (!confirm(`Delete ${count} selected image(s)?`)) return;
        
        this.images[this.currentYear] = this.images[this.currentYear].filter(
            img => !this.selectedImages.has(img.id)
        );
        
        this.selectedImages.clear();
        this.saveToStorage();
        this.loadImages(this.currentYear);
        this.showToast(`${count} image(s) deleted successfully!`, 'success');
    }

    updateActionButtons() {
        const deleteBtn = document.getElementById('deleteSelectedBtn');
        const moveBtn = document.getElementById('moveSelectedBtn');
        
        const isDisabled = this.selectedImages.size === 0;
        deleteBtn.disabled = isDisabled;
        moveBtn.disabled = isDisabled;
        
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i> Delete Selected (${this.selectedImages.size})`;
        moveBtn.innerHTML = `<i class="fas fa-arrows-alt"></i> Move Selected (${this.selectedImages.size})`;
    }

    // View Mode
    toggleViewMode() {
        this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
        const btn = document.getElementById('viewModeBtn');
        btn.innerHTML = this.viewMode === 'grid' ? 
            '<i class="fas fa-list"></i>' : '<i class="fas fa-th-large"></i>';
        
        const gallery = document.getElementById('gallery');
        gallery.setAttribute('data-view-mode', this.viewMode);
        this.displayGallery();
    }

    // Pagination
    updatePagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredImages.length / this.imagesPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="pagination-btn" onclick="gallery.goToPage(${this.currentPage - 1})">
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
                    onclick="gallery.goToPage(${i})">${i}</button>`;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += '<span class="pagination-ellipsis">...</span>';
            }
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="pagination-btn" onclick="gallery.goToPage(${this.currentPage + 1})">
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

    // Countdown
    showCountdown() {
        const container = document.getElementById('countdownContainer');
        container.style.display = 'block';
        
        const countdownDate = new Date('January 1, 2026 00:00:00').getTime();
        
        this.countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            if (distance < 0) {
                clearInterval(this.countdownInterval);
                document.getElementById('days').innerHTML = '00';
                document.getElementById('hours').innerHTML = '00';
                document.getElementById('minutes').innerHTML = '00';
                document.getElementById('seconds').innerHTML = '00';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').innerHTML = String(days).padStart(2, '0');
            document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');
        }, 1000);
    }

    hideCountdown() {
        document.getElementById('countdownContainer').style.display = 'none';
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }

    // Utility Functions
    updateStats() {
        const totalImages = Object.values(this.images).reduce((total, yearImages) => total + yearImages.length, 0);
        const totalAlbums = Object.keys(this.albums).length;
        
        document.getElementById('totalImages').textContent = totalImages;
        document.getElementById('totalAlbums').textContent = totalAlbums;
        document.getElementById('currentYear').textContent = this.currentYear;
        document.getElementById('viewingImages').textContent = this.filteredImages.length;
    }

    updateGalleryTitle() {
        const titleElement = document.getElementById('galleryTitle');
        if (this.currentAlbum === 'all') {
            titleElement.textContent = `Gallery ${this.currentYear}`;
        } else {
            const albumName = this.albums[this.currentAlbum]?.name || 'Unknown Album';
            titleElement.textContent = `${albumName} - ${this.currentYear}`;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showLoading(show) {
        document.getElementById('loadingSpinner').style.display = show ? 'block' : 'none';
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'exclamation'}-circle"></i>
            ${message}
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new ImageGallery();
});

// Add slideOut animation to CSS (should be added to styles.css)
const additionalStyles = `
@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);