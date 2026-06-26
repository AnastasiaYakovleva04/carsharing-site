document.addEventListener('DOMContentLoaded', ()=> {
    
    function autoFillUserData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
    
        // Разбиваем ФИО на части
        const nameParts = currentUser.name.split(' ');
        const surname = nameParts[0] || '';
        const firstName = nameParts[1] || '';
        const patronymic = nameParts[2] || '';
    
        document.getElementById('name').value = firstName;
        document.getElementById('surname').value = surname;
        document.getElementById('patr').value = patronymic;
        document.getElementById('phone').value = currentUser.phone;
        document.getElementById('bd').value = currentUser.birthDate;
        
        // Если есть привязанная карта — подставить первую
        if (currentUser.cards && currentUser.cards.length > 0) {
            // Можно подставить маскированный номер, но лучше оставить пустым для безопасности
            document.getElementById('bank-card').placeholder = `**** **** **** ${currentUser.cards[0].number.slice(-4)}`;
        }
    }

// Вызвать при загрузке страницы
    autoFillUserData();

    let dailyPrice = 0;
    //если пришло что-то из другого окна
    //используется для передачи данных о машине с главной страницы на форму аренды
    if (window.location.hash) {
        let vin = window.location.hash.substring(1); 
        let car = document.querySelector(`[id="${vin}"]`); //карточка машины с переданным vin
        setTimeout(() => {
                //как бы нажатие на кнопку с такой же машиной
                car.closest('.car-card').querySelector('.bron-btn').click();
        }, 500);
        
    }
    //все кнопки забронировать
    let bronBtns = document.querySelectorAll('.bron-btn');

    //форматирование дат

    let bronDate = document.querySelector('#bron-date'); //дата бронирования
    let backDate = document.querySelector('#back-date'); //дата возврата
    let birthday = document.querySelector('#bd'); //дата рождения 

    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+1)
    let maxBd = new Date(); //максимальная дата рождения
    maxBd.setFullYear(today.getFullYear() - 18); //только 18-летний может оформить бронь
    let minBd = new Date(today);
    minBd.setFullYear(today.getFullYear() - 80);
    
    let formatDate = (date) => date.toISOString().split('T')[0];
    
    //установка значений
    bronDate.min = formatDate(today);
    bronDate.value = formatDate(today);
    backDate.min = formatDate(tomorrow);
    backDate.value = formatDate(tomorrow);
    birthday.min = formatDate(minBd);
    birthday.max = formatDate(maxBd);

    //изменение значения даты брони
    bronDate.addEventListener('change', () => {
        let selected = new Date(bronDate.value); //выбранная дата
        let nextDay = new Date(selected); //след день
        nextDay.setDate(selected.getDate() + 1);
        
        //дата возврата не раньше новой даты брони
        let currentReturn = new Date(backDate.value);
        if (currentReturn <= selected) 
            backDate.value = formatDate(nextDay);
        backDate.min = formatDate(nextDay);

        CountPrice();
    });
    backDate.addEventListener('change', ()=>{
        CountPrice();
    });

    function BronCar(event) {
        //машина, которую хотят забронировать
        let car = event.currentTarget.closest('.car-card-content');
        
        //ее характеристики
        let vin = car.querySelector('.desc').id;
        let title = car.querySelector('h2').textContent.trim();
        let parts = title.split(' ');
        let mark = parts[0];
        let model = parts[1];
        let num = generateCarNumber();
        let priceText = car.querySelector('h6').textContent.replace('р', '').replace(' ', '').trim();
        dailyPrice = parseInt(priceText);

        //заполнение формы данными с карточки
        fillForm({
            vin: vin,
            mark: mark,
            model: model,
            price: dailyPrice,
            num: num
        });

        //секция с формой
        let formSection = document.querySelector('.bron');
    
        //плавный скролл к форме
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    //генерация номера машины
    function generateCarNumber() {
        let letters = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х']; //буквы
        let regionCodes = [ //коды регионов филиалов
                77, 97, 99, 177, 197, 199, //москва
                78, 98, 178, 198, 278, //спб
                54, 154, //новосибирск
                23, 93, 123, 193, //краснодар
                50, 90, 150, 190]; //московская область

        let letter1 = letters[Math.floor(Math.random() * letters.length)];
        let numbers = Math.floor(100 + Math.random() * 900); 
        let letter2 = letters[Math.floor(Math.random() * letters.length)];
        let letter3 = letters[Math.floor(Math.random() * letters.length)];
        let regionCode = regionCodes[Math.floor(Math.random() * regionCodes.length)]
        
        return `${letter1}${numbers}${letter2}${letter3}${regionCode}`;
    }

    //заполнение формы
    function fillForm(data){
        let form = document.querySelector('.form');
        form.querySelector('[name="vin"]').value = data.vin;
        form.querySelector('[name="mark"]').value = data.mark;
        form.querySelector('[name="model"]').value = data.model;
        form.querySelector('[name="num"]').value = data.num;
        form.querySelector('[name="price"]').value = data.price;  
    }

    function CountPrice(){
        let startDate = new Date(bronDate.value);
        let endDate = new Date(backDate.value);
        
        //разница в днях
        let timeDiff = endDate.getTime() - startDate.getTime();
        let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let temp = days;
        
        let discount = 0;
        for (i = 0; i < 5; i++){
            if (temp - 3 >= 0){
                discount+=0.05;
                temp-=3;
            }
        }
        
        //итоговая цена
        let totalPrice = dailyPrice * days;
        if (discount > 0)
            totalPrice *= 1 - discount;
        document.querySelector('[name="price"]').value = totalPrice;
    }

    //обработчик нажатия для всех кнопок брони
    bronBtns.forEach(btn => {
        btn.addEventListener('click', BronCar);
    });
    
function saveBooking(bookingData) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Пожалуйста, войдите в аккаунт');
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
        alert('Ошибка: пользователь не найден');
        return false;
    }

    //сохранение существующих данных
    const existingCards = users[userIndex].cards || [];
    const existingPoints = users[userIndex].points || 0;
    const existingHistory = users[userIndex].history || [];
    const existingBookings = users[userIndex].bookings || [];

    //бронь
    const booking = {
        id: Date.now(),
        carName: bookingData.carName || `${bookingData.mark} ${bookingData.model}`,
        carMark: bookingData.mark,
        carModel: bookingData.model,
        vin: bookingData.vin,
        number: bookingData.num,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        price: bookingData.totalPrice,
        status: 'active',
        createdAt: new Date().toISOString()
    };

    //обновление данных
    users[userIndex].bookings = [...existingBookings, booking];
    users[userIndex].history = existingHistory;
    users[userIndex].cards = existingCards; // <-- ВАЖНО!
    users[userIndex].points = existingPoints + Math.floor(booking.price * 0.1);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

    alert(`Бронь оформлена! Начислено ${Math.floor(booking.price * 0.1)} баллов.`);
    return true;
}

document.querySelector('.form-user .cta')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name')?.value || '',
        surname: document.getElementById('surname')?.value || '',
        patr: document.getElementById('patr')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        passport: document.getElementById('passport')?.value || '',
        birthDate: document.getElementById('bd')?.value || '',
        vin: document.getElementById('vin')?.value || '',
        mark: document.getElementById('mark')?.value || '',
        model: document.getElementById('model')?.value || '',
        num: document.getElementById('num')?.value || '',
        startDate: document.getElementById('bron-date')?.value || '',
        endDate: document.getElementById('back-date')?.value || '',
        totalPrice: document.getElementById('price')?.value || '',
        bankCard: document.getElementById('bank-card')?.value || '',
        filial: document.getElementById('filial')?.value || ''
    };

        if (formData.name === '' || formData.surname === '' || 
            formData.phone === '' || formData.passport === '' ||
            formData.bankCard === '' || formData.birthDate ===''
            || formData.filial === '') {
            alert('Все поля кроме отчества обязательны для заполнения');
            return;
        }

    const success = saveBooking(formData);
    if (success) {
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 2000);
    }});
});