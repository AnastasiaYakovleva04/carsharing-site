document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.form-lk .cta');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');

    //если пользователь уже залогинен, сразу в аккаунт
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && window.location.href.includes('login.html')) {
        window.location.href = 'account.html';
        return;
    }

    loginBtn.addEventListener('click', () => {
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();

        if (!phone || !password) {
            alert('Заполните все поля');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.phone === phone && u.password === password);

        if (!user) {
            alert('Неверный номер телефона или пароль');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Вход выполнен успешно!');
        window.location.href = 'account.html';
    });
});