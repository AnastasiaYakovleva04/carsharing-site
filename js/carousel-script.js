document.addEventListener('DOMContentLoaded', ()=> {
    let carousel = document.querySelector('.carousel');
    let cards = document.querySelectorAll('.car-card');
    let prevBtn = document.querySelector('.prev-btn');
    let nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let totalCards = cards.length;
    
    // функция для определения количества видимых карточек в зависимости от ширины
    function getVisibleCards() {
        if (window.innerWidth <= 768) {
            return 1;
        }
        return 3;
    }
    
    // обновление позиции карусели
    function updateCarousel() {
        let visibleCards = getVisibleCards();
        let cardWidth = cards[0].offsetWidth + 20; // ширина + gap
        let translateX = -currentIndex * cardWidth; // сдвиг карусели влево
        
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${translateX}px)`;
    }
    
    // прокрутка вперед
    function nextSlide() {
        let visibleCards = getVisibleCards();
        let maxIndex = totalCards - visibleCards;
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }
    
    // прокрутка назад
    function prevSlide() {
        let visibleCards = getVisibleCards();
        let maxIndex = totalCards - visibleCards;
        
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }
    
    // обработчики кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // обновление при изменении размера окна
    window.addEventListener('resize', function() {
        let visibleCards = getVisibleCards();
        let maxIndex = totalCards - visibleCards;
        
        // корректируем currentIndex, если он вышел за пределы
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });
});