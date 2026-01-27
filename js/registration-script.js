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
    //обработчик нажатия
    regBtn.addEventListener('click', () => {
        //пустые поля
        if (name.value == "" || surname.value == "" || 
            phone.value == "" || passport.value == "" ||
            bd.value == null || pass.value == "" || passConf.value == ""){
            alert("Все поля кроме отчества обязательны для заполнения");
            return;
        }
        //не совпадают пароли
        if (pass.value != passConf.value){
            alert("Пароли не совпадают");
            return;
        }
        let fullName = `${name.value} ${surname.value} ${patr.value}`
        let userData = [fullName, phone.value, bd.value];
        localStorage.setItem('userData', JSON.stringify(userData)); //добавление массива в локальное хранилище
        window.location.href='../pages/account.html';
    })
});