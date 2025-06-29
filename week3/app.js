document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.slider .list .item');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const thumbnails = document.querySelectorAll('.thumbnail .item');

    let countItem = items.length;
    let itemActive = 0;

    // Start automatic slide
    let refreshInterval = setInterval(() => {
        next.click();
    }, 5000);

    next.onclick = () => {
        itemActive = (itemActive + 1) % countItem;
        showSlider();
    };

    prev.onclick = () => {
        itemActive = (itemActive - 1 + countItem) % countItem;
        showSlider();
    };

    function showSlider() {
        // Remove current active classes
        const oldActiveItem = document.querySelector('.slider .list .item.active');
        const oldActiveThumbnail = document.querySelector('.thumbnail .item.active');

        if (oldActiveItem) oldActiveItem.classList.remove('active');
        if (oldActiveThumbnail) oldActiveThumbnail.classList.remove('active');

        // Add active to new items
        items[itemActive].classList.add('active');
        thumbnails[itemActive].classList.add('active');

        setPositionThumbnail();

        // Restart interval
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next.click();
        }, 5000);
    }

    function setPositionThumbnail() {
        const activeThumbnail = document.querySelector('.thumbnail .item.active');
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Handle thumbnail clicks
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            itemActive = index;
            showSlider();
        });
    });

    // Initialize first slide
    showSlider();
});
