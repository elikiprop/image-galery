// Advanced Image Gallery Application
class ImageGallery {
    constructor() {
        this.images = {
            2023: [
                { id: 1, src: 'images/2023/1.jpeg', name: 'Summer Sunset', uploadDate: '2023-06-15' },
                { id: 2, src: 'images/2023/2.jpeg', name: 'Mountain View', uploadDate: '2023-07-20' },
                { id: 3, src: 'images/2023/3.jpeg', name: 'Ocean Waves', uploadDate: '2023-08-10' },
                { id: 4, src: 'images/2023/4.jpeg', name: 'City Lights', uploadDate: '2023-09-05' },
                { id: 5, src: 'images/2023/5.jpeg', name: 'Forest Path', uploadDate: '2023-10-12' },
                { id: 6, src: 'images/2023/6.jpeg', name: 'Desert Dunes', uploadDate: '2023-11-18' },
                { id: 7, src: 'images/2023/7.jpeg', name: 'Winter Snow', uploadDate: '2023-12-25' }
            ],
            2024: [
                { id: 8, src: 'images/2024/8.jpeg', name: 'Spring Flowers', uploadDate: '2024-03-15' },
                { id: 9, src: 'images/2024/9.jpeg', name: 'River Rapids', uploadDate: '2024-04-20' },
                { id: 10, src: 'images/2024/10.jpeg', name: 'Golden Hour', uploadDate: '2024-05-10' },
                { id: 11, src: 'images/2024/11.jpeg', name: 'Urban Architecture', uploadDate: '2024-06-05' },
                { id: 12, src: 'images/2024/12.jpeg', name: 'Wildlife Safari', uploadDate: '2024-07-12' },
                { id: 13, src: 'images/2024/13.jpeg', name: 'Coastal Beauty', uploadDate: '2024-08-18' },
                { id: 14, src: 'images/2024/14.jpeg', name: 'Autumn Colors', uploadDate: '2024-09-25' },
                { id: 15, src: 'images/2024/Mekatilili.jpg', name: 'Mekatilili Portrait', uploadDate: '2024-10-08' },
                { id: 16, src: 'images/2024/15.jpeg', name: 'Starry Night', uploadDate: '2024-11-12' },
                { id: 17, src: 'images/2024/16.jpeg', name: 'Beach Paradise', uploadDate: '2024-11-20' },
                { id: 18, src: 'images/2024/17.jpeg', name: 'Mountain Peak', uploadDate: '2024-12-05' },
                { id: 19, src: 'images/2024/18.jpeg', name: 'Winter Landscape', uploadDate: '2024-12-18' }
            ],
            2025: [],
            2026: []
        };
        
        this.currentYear = '2024';
        this.currentImages = [];
        this.filteredImages = [];
        this.selectedImages = new Set();
        this.currentImageIndex = 0;
        this.viewMode = 'grid'; // grid or list
        this.imagesPerPage = 12;
        this.currentPage = 1;
        
        this.countdownInterval = null;
        this.uploadedFiles = [];
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.loadImages(this.currentYear);
        this.updateStats();
    }

    // Storage Management
    loadFromStorage() {
        const stored = localStorage.getItem('galleryImages');
        if (stored) {
            try {
                this.images = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading from storage:', e);
            }
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('galleryImages', JSON.stringify(this.images));
        } catch (e) {
            console.error('Error saving to storage:', e);
            this.showToast('Storage quota exceeded. Some images may not be saved.', 'warning');
        }
    }

    // Event Bindings
    bindEvents() {
        // Year selection
        document.getElementById('yearSelect').addEventListener('change', (e) => {
            this.currentYear = e.target.value;
            this.loadImages(this.currentYear);
        });

        // Upload functionality
        document.getElementById('uploadBtn').addEventListener('click', () => {
            this.openUploadModal();
        });

        document.getElementById('closeUploadModal').addEventListener('click', () => {
            this.closeUploadModal();
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
        document.getElementById('downloadImage').addEventListener('click', () => {
            this.downloadCurrentImage();
        });

        document.getElementById('deleteImage').addEventListener('click', () => {
            this.deleteCurrentImage();
        });
    }

    // Image Loading and Display
    loadImages(year) {
        this.showLoading(true);
        this.currentYear = year;
        
        setTimeout(() => { // Simulate loading time
            this.currentImages = this.images[year] || [];
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
            this.updateDeleteButton();
            this.showLoading(false);
        }, 500);
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
                this.updateDeleteButton();
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
                image.name.toLowerCase().includes(query.toLowerCase())
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
                    name: file.name.split('.')[0]
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
    }

    confirmUpload() {
        if (this.uploadedFiles.length === 0) {
            this.showToast('Please select images to upload', 'warning');
            return;
        }

        this.showLoading(true);
        const uploadYear = document.getElementById('uploadYear').value;
        const currentDate = new Date().toISOString().split('T')[0];
        
        setTimeout(() => {
            this.uploadedFiles.forEach((fileData) => {
                const newImage = {
                    id: Date.now() + Math.random(),
                    src: fileData.dataUrl,
                    name: fileData.name,
                    uploadDate: currentDate
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
        
        modalImage.src = image.src;
        imageName.textContent = image.name;
        imageDetails.textContent = `Uploaded: ${this.formatDate(image.uploadDate)}`;
        
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
        
        this.updateDeleteButton();
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

    updateDeleteButton() {
        const btn = document.getElementById('deleteSelectedBtn');
        btn.disabled = this.selectedImages.size === 0;
        btn.textContent = `Delete Selected (${this.selectedImages.size})`;
    }

    // View Mode
    toggleViewMode() {
        this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
        const btn = document.getElementById('viewModeBtn');
        btn.innerHTML = this.viewMode === 'grid' ? 
            '<i class="fas fa-list"></i>' : '<i class="fas fa-th-large"></i>';
        
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
        document.getElementById('totalImages').textContent = totalImages;
        document.getElementById('currentYear').textContent = this.currentYear;
        document.getElementById('viewingImages').textContent = this.filteredImages.length;
    }

    updateGalleryTitle() {
        document.getElementById('galleryTitle').textContent = `Gallery ${this.currentYear}`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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