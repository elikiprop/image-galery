document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const yearSelect = document.getElementById('yearSelect');

    const imagesByYear = {
        2023: [
            'images/2023/1.jpeg',
            'images/2023/2.jpeg',
            'images/2023/3.jpeg',
            'images/2023/4.jpeg',
            'images/2023/5.jpeg',
            'images/2023/6.jpeg',
            'images/2023/7.jpeg',
        ],
        2024: [
            'images/2024/8.jpeg',
            'images/2024/9.jpeg',
            'images/2024/10.jpeg',
            'images/2024/11.jpeg',
            'images/2024/12.jpeg',
            'images/2024/13.jpeg',
            'images/2024/14.jpeg',
            'images/2024/Mekatilili.jpg',
            'images/2024/15.jpeg',
            'images/2024/16.jpeg',
            'images/2024/17.jpeg',
            'images/2024/18.jpeg',



        ],
        2025: []
    
    };

    function loadImages(year) {
        gallery.innerHTML = '';
        const images = imagesByYear[year];
        if (images && images.length > 0) {
            images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                gallery.appendChild(img);
            });
        } else {
            gallery.innerHTML = '<p><h2>Coming soon</h2>.</p>';
        }
    }

    loadImages(yearSelect.value);

    yearSelect.addEventListener('change', function() {
        loadImages(yearSelect.value);
    });
});
