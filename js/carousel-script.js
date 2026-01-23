document.addEventListener('DOMContentLoaded', ()=> {
    let carousel = document.querySelector('.carousel');
    let cards = document.querySelectorAll('.car-card');
    let prevBtn = document.querySelector('.prev-btn');
    let nextBtn = document.querySelector('.next-btn');
    
    let visibleCards = 3; //видимые карточки
    let currentIndex = 0; //индекс текущей (первой) видимой карточки
    let totalCards = cards.length; //всего карточек
    
    //обновление позиции карусели
    function updateCarousel() {

        let cardWidth = cards[0].offsetWidth + 20; //ширина + gap
        let translateX = -currentIndex * cardWidth; //сдвиг карусели влево
        
        carousel.style.transform = `translateX(${translateX}px)`;
        
        //прокрутка
        if (currentIndex >= totalCards) {
            currentIndex = 0;
            carousel.style.transform = `translateX(0)`;
            
            //анимация
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }
    }
    
    //прокрутка вперед
    function nextSlide() {
        if (currentIndex < totalCards - visibleCards)
            currentIndex++; 
        else 
            currentIndex = 0;
        updateCarousel();
    }
    
    //прокрутка назад
    function prevSlide() {
        if (currentIndex > 0)
            currentIndex--;
        else 
            currentIndex = totalCards - visibleCards;
        updateCarousel();
    }
    
    //обработчики кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
});