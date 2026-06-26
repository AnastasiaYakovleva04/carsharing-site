try{
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (userData){
        console.log(window.location.href)
        const account = document.querySelectorAll('.account');
        if (window.location.href == 'http://127.0.0.1:5500/index.html'){
            console.log("это главная")
            account.forEach(element => {
            element.href = "pages/account.html";
            console.log(element.href)});
        }
        else{
            account.forEach(element => {
            element.href = "account.html";
            console.log(element.href)});
        }
    }
}
catch{}
