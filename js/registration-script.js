document.addEventListener('DOMContentLoaded', () => {
    //текст из формы
    let name = document.getElementById('name');
    let surname = document.getElementById('surname');
    let patr = document.getElementById('patr');
    let phone = document.getElementById('phone');
    let passport = document.getElementById('passport');
    let bd = document.getElementById('bd');
    let pass = document.getElementById('password');
    let passConf = document.getElementById('password-conf');

    //кнопка регистрации
    let regBtn = document.getElementById('reg-btn');

    function validatePassport(value) {
        // Убираем пробелы
        const clean = value.replace(/\s/g, '');
        // Проверяем: ровно 10 цифр (серия 4 цифры + номер 6 цифр)
        return /^\d{10}$/.test(clean);
    }

    // Функция форматирования паспорта (автоматически)
    function formatPassport(value) {
        const clean = value.replace(/\D/g, '');
        if (clean.length <= 4) return clean;
        return clean.substring(0, 4) + ' ' + clean.substring(4, 10);
    }

    // Автоформатирование при вводе
    passport.addEventListener('input', function() {
        this.value = formatPassport(this.value);
    });

    //обработчик нажатия
    regBtn.addEventListener('click', () => {
        //пустые поля
        if (name.value.trim() === '' || surname.value.trim() === '' || 
            phone.value.trim() === '' || passport.value.trim() === '' ||
            bd.value === '' || pass.value === '' || passConf.value === '') {
            alert('Все поля кроме отчества обязательны для заполнения');
            return;
        }

        //не совпадают пароли
        if (pass.value != passConf.value){
            alert("Пароли не совпадают");
            return;
        }

        const passportClean = passport.value.replace(/\s/g, '');
        if (!validatePassport(passportClean)) {
            alert('Некорректный ввод паспортных данных.\nФормат: XXXX XXXXXX (4 цифры серия, 6 цифр номер)');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.phone === phone.value.trim())) {
            alert('Пользователь с таким номером телефона уже зарегистрирован');
            return;
        }

        let fullName = `${name.value} ${surname.value} ${patr.value}`
        const newUser = {
            id: Date.now(),
            name: fullName,
            phone: phone.value.trim(),
            passport: passportClean,
            birthDate: bd.value,
            password: pass.value,
            cards: [],
            bookings: [],
            history: [],
            points: 0,
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = '../pages/account.html';
    })
});