document.addEventListener('DOMContentLoaded', () => {

 let cars = [
    {
        mark: "Toyota",
        model: "Corolla",
        type: "econom",
        vin: "JTNBV51E2K1234567",
        price: 1700,
        img: "./img/cars/2012-toyota-corolla-2011-toyota-corolla-le-car-png-no-bg-preview (carve.photos).png",
        details: "Двигатель: 1.6 л, бензин, 122 л.с.<br>Коробка передач: вариатор (CVT)<br>Передний привод<br>Расход топлива: 6.5 л / 100км",
        description: "[Идеально для города. Есть камера заднего вида, Apple CarPlay и обогрев сидений]"
    },
    {
        mark: "Hyundai",
        model: "Creta", 
        type: "econom",
        vin: "Z94CB41D0BR789012",
        price: 1500,
        img: "./img/cars/orange-huynday.png",
        details: "Двигатель: 2.0 л, бензин, 150 л.с.<br>Коробка передач: 6-ст. автомат<br>Передний привод<br>Расход топлива: 7.4 л / 100км",
        description: "[Популярный городской кроссовер. Высокая посадка, просторный салон]"
    },
    {
        mark: "Volkswagen",
        model: "Polo",
        type: "econom",
        vin: "WVWZZZ6RZHY123456",
        price: 1300,
        img: "./img/cars/red-wolsvagen.png",
        details: "Двигатель: 1.6 л, бензин, 110 л.с.<br>Коробка передач: 6-ст. автомат (Tiptronic)<br>Передний привод<br>Расход топлива: 6.2 л / 100км",
        description: "[Надежный компакт для города. Простой в управлении]"
    },
    {
        mark: "Nissan",
        model: "Altima",
        type: "econom",
        vin: "1N4BL3AP2LC123456",
        price: 3200,
        img: "./img/cars/5-2-toyota-car-png.png",
        details: "Двигатель: 2.5 л, гибрид, 188 л.с.<br>Коробка передач: вариатор (e-CVT)<br>Передний привод<br>Расход топлива: 4.8 л / 100км",
        description: "[Гибридный седан бизнес-класса. Плавный ход, высокая топливная эффективность]"
    },
    {
        mark: "Toyota",
        model: "RAV4",
        type: "econom",
        vin: "2T3W1RFV1LC123456",
        price: 4500,
        img: "./img/cars/blue-tayota.png",
        details: "Двигатель: 2.5 л, бензин, 203 л.с.<br>Коробка передач: вариатор<br>Полный привод (Dynamic Torque Vectoring)<br>Расход топлива: 7.3 л / 100км",
        description: "[Популярный кроссовер с просторным салоном и отличной проходимостью]"
    },
    {
        mark: "Mercedes-Benz",
        model: "GLK ",
        type: "premium",
        vin: "WDC1648221A123456",
        price: 3900,
        img: "./img/cars/white-mers.png",
        details: "Двигатель: 2.2 л, турбодизель, 170 л.с.<br>Коробка передач: 7-ст. автомат (7G-Tronic)<br>Полный привод (4MATIC)<br>Расход топлива: 6.8 л / 100км",
        description: "[Компактный и надежный SUV в стиле 'G-класса'. Отличная проходимость]"
    },
    {
        mark: "Mercedes-Benz",
        model: "C300",
        type: "premium",
        vin: "WDD2060121A123456",
        price: 6900,
        img: "./img/cars/grey-mers.png",
        details: "Двигатель: 2.0 л, турбобензин, 258 л.с.<br>Коробка передач: 9-ст. автомат (9G-Tronic)<br>Полный привод (4MATIC)<br>Расход топлива: 7.8 л / 100км",
        description: "[Премиальный седан с идеальным балансом комфорта и динамики]"
    },
    {
        mark: "Audi",
        model: "S4",
        type: "premium",
        vin: "WAU8GAF53MA123456",
        price: 6500,
        img: "./img/cars/yellow-audi.png",
        details: "Двигатель: 3.0 л, турбобензин, 354 л.с.<br>Коробка передач: 8-ст. автомат (Tiptronic)<br>Полный привод (quattro)<br>Расход топлива: 8.6 л / 100км",
        description: "[Спортивный седан. Мощный и быстрый. Есть спортивные сиденья]"
    },
    {
        mark: "BMW",
        model: "X5",
        type: "premium",
        vin: "5UXKR6C58L0A12345",
        price: 7900,
        img: "./img/cars/BMW-Car-Png-image-copy-no-bg-preview (carve.photos).png",
        details: "Двигатель: 2.0 л, турбобензин, 249 л.с.<br>Коробка передач: 8-ст. автомат (Steptronic)<br>Полный привод (xDrive)<br>Расход топлива: 7.8 л / 100км",
        description: "[Цифровая приборная панель, контроль 'слепых' зон]"
    },
    {
        mark: "Mercedes-Benz",
        model: "CL500",
        type: "premium",
        vin: "WDDTJ7HB7CA123456",
        price: 15900,
        img: "./img/cars/white-mers.png",
        details: "Двигатель: 4.7 л, турбобензин, 455 л.с. (V8)<br>Коробка передач: 9-ст. автомат (9G-Tronic)<br>Задний привод<br>Расход топлива: 10.8 л / 100км",
        description: "[Высокий уровень комфорта и технологий, идеально для длительных поездок]"
    },
    {
        mark: "Jaguar",
        model: "F-Type",
        type: "premium",
        vin: "SAJAC2P36EL123456",
        price: 12900,
        img: "./img/cars/white-jaguar.png",
        details: "Двигатель: 2.0 л, турбобензин, 300 л.с.<br>Коробка передач: 8-ст. автомат (Quickshift)<br>Задний привод<br>Расход топлива: 8.5 л / 100км",
        description: "[Роскошный британский спорткар с характерным рычанием выхлопа]"
    },
    {
        mark: "Honda",
        model: "NSX",
        type: "premium",
        vin: "JH4NA2160NT000123",
        price: 22500,
        img: "./img/cars/black-honda.png",
        details: "Двигатель: 3.5 л, гибрид, 581 л.с.<br>Коробка передач: 9-ст. робот (DCT)<br>Полный привод (SH-AWD)<br>Расход топлива: ~9.5 л / 100км",
        description: "[Суперкар нового поколения. Гибридная установка и отличная управляемость]"
    },
    {
        mark: "Ferrari",
        model: "F12berlinetta",
        type: "premium",
        vin: "ZFF74VPA6F0234567s",
        price: 42000,
        img: "./img/cars/red-lamba.png",
        details: "Двигатель: 6.3 л, бензин, 740 л.с. (V12)<br>Коробка передач: 7-ст. робот (F1 DCT)<br>Задний привод<br>Расход топлива: ~18 л / 100км",
        description: "[Один из самых мощных серийных Ferrari своего времени. Для особых случаев]"
    }
];

    let economBtn = document.getElementById("econom-btn");
    let premiumBtn = document.getElementById("premium-btn");
    let activeBtn = null;
    let searchBtn = document.getElementById("search-btn");

    let markInp = document.getElementById("mark");
    let modelInp = document.getElementById("model");

    //обработчики кнопок эконом и премиум - установка активности и добавление/удаление класса актив, для смены бг
    economBtn.addEventListener('click', ()=>{
        activeBtn = economBtn;
        economBtn.classList.add('active');
        premiumBtn.classList.remove('active');
    })
    premiumBtn.addEventListener('click', ()=>{
        activeBtn = premiumBtn;
        premiumBtn.classList.add('active');
        economBtn.classList.remove('active');
    })
    
    //обработчик нажатия кнопки найти
    searchBtn.addEventListener('click', ()=>{
        //значения из полей ввода
        let markValue = markInp.value.trim().toLowerCase();
        let modelValue = modelInp.value.trim().toLowerCase();
        let selectedType = activeBtn ? activeBtn.id.replace('-btn', '') : null;
        
        //фильтр машин
        let filteredCars = cars.filter(car => {
            let matchesMark = true;
            let matchesModel = true;
            let matchesType = true;
            
            //если введена марка
            if (markValue) 
                matchesMark = car.mark.toLowerCase().includes(markValue);
            
            //если введена модель 
            if (modelValue) 
                matchesModel = car.model.toLowerCase().includes(modelValue);
            
            //если выбран тип
            if (selectedType) 
                matchesType = car.type === selectedType;
            
            return matchesMark && matchesModel && matchesType;
        });
    
        //результаты
        showSearchResults(filteredCars);
    });

    function showSearchResults(filteredCars){
    let resultsSection = document.querySelector('.search-results-section');
    let carousel = document.querySelector('.search-results-section .carousel');
    
    if (filteredCars.length === 0) {
        carousel.style.transform = `translateX(0)`;
        carousel.innerHTML = `
            <div style="text-align: center; width: 100%;">
                <p>Ничего не найдено. Попробуйте изменить параметры поиска</p>
            </div>
        `;
         resultsSection.querySelectorAll('.carousel-btn').forEach(btn => {
            btn.style.display = 'none';
        });
    }
    else{    
        //секция с результатами
        resultsSection.style.display = 'flex';
        resultsSection.querySelectorAll('.carousel-btn').forEach(btn => {
            btn.style.display = 'block';
        });
        carousel.innerHTML = '';
        
        //карточки для найденных машин
        filteredCars.forEach(car => {
            let cardHTML = `
                <div class="car-card">
                    <img src="${car.img}" alt="${car.mark} ${car.model}" class="car-card-img">
                    <div class="car-card-content">
                        <div class="desc" id="${car.vin}">
                            <h2>${car.mark} ${car.model}</h2>
                            <p>Класс: ${car.type === 'econom' ? 'Эконом' : 'Премиум'}</p>
                            <p>${car.details}<br><span>${car.description}</span></p>
                        </div>
                        <div class="car-card-bron">
                            <h6>${car.price} р</h6>
                            <button class="cta btn-black bron-btn" onclick="window.location.href='pages/bron.html#${car.vin}'">
                                Забронировать ↗
                            </button>
                        </div>
                    </div>
                </div>
            `;
            carousel.innerHTML += cardHTML;
        });
        
        initSearchCarousel();
    }
    resultsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


//инициализация карусели для результатов поиска
function initSearchCarousel() {
    let carousel = document.querySelector('.search-results-section .carousel');
    let cards = carousel.querySelectorAll('.car-card');
    let prevBtn = document.querySelector('.search-results-section .prev-btn');
    let nextBtn = document.querySelector('.search-results-section .next-btn');
    
    let visibleCards = 3;
    let currentIndex = 0;
    let totalCards = cards.length;
    
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
    
    function nextSlide() {
        if (currentIndex < totalCards - visibleCards)
            currentIndex++;
        else 
            currentIndex = 0;
        updateCarousel();
    }
    
    function prevSlide() {
        if (currentIndex > 0)
            currentIndex--;
        else 
            currentIndex = totalCards - visibleCards;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    updateCarousel();
    }
});