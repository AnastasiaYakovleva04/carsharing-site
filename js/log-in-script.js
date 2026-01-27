document.addEventListener('DOMContentLoaded', () => {
    let userData = JSON.parse(localStorage.getItem('userData'));

    let name = document.getElementById("name");
    let phone = document.getElementById("phone");
    let bd = document.getElementById("bd");
    name.textContent = userData[0];
    phone.textContent = userData[1];
    bd.textContent = userData[2];
    console.log(`${userData[0]} ${userData[1]} ${userData[2]}`);

});