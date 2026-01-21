document.addEventListener('DOMContentLoaded', ()=> {
    if (window.location.hash) {
        let vin = window.location.hash.substring(1);
        let car = document.querySelector(`[id="${vin}"]`);
        if (car) {
            setTimeout(() => {
                //как бы нажатие на кнопку с такой же машиной
                car.closest('.car-card').querySelector('.bron-btn').click();
            }, 500);
        }
    }
    let bronBtns = document.querySelectorAll('.bron-btn');

    function BronCar(event) {
        //машина, которую хотят забронировать
        let car = event.currentTarget.closest('.car-card-content');
        
        let vin = car.querySelector('.desc').id;
        let title = car.querySelector('h2').textContent.trim();
        let parts = title.split(' ');
        let mark = parts[0];
        let model = parts.slice(1).join(' ');
        let num = generateCarNumber();
        let price = car.querySelector('h6').textContent.trim().replace('р', '').replace(' ', '').trim();
        
        fillForm({
            vin: vin,
            mark: mark,
            model: model,
            price: price,
            num: num
        });

        let formSection = document.querySelector('.bron');
    
        //плавный скролл к форме
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    

    function generateCarNumber() {
        let letters = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х'];
        let regionCodes = [
                77, 97, 99, 177, 197, 199, // Москва
                78, 98, 178, 198, 278, // СПб
                54, 154, // Новосибирск
                23, 93, 123, 193, // Краснодар
                50, 90, 150, 190];

        let letter1 = letters[Math.floor(Math.random() * letters.length)];
        let numbers = Math.floor(100 + Math.random() * 900); 
        let letter2 = letters[Math.floor(Math.random() * letters.length)];
        let letter3 = letters[Math.floor(Math.random() * letters.length)];
        let regionCode = regionCodes[Math.floor(Math.random() * regionCodes.length)]
        
        return `${letter1}${numbers}${letter2}${letter3}${regionCode}`;
    }

    function fillForm(data){
        let form = document.querySelector('.form');
        if (form.querySelector('[name="vin"]'))
            form.querySelector('[name="vin"]').value = data.vin;
        if (form.querySelector('[name="mark"]')) 
            form.querySelector('[name="mark"]').value = data.mark;
        if (form.querySelector('[name="model"]')) 
            form.querySelector('[name="model"]').value = data.model;
        if (form.querySelector('[name="num"]')) 
            form.querySelector('[name="num"]').value = data.num;
        if (form.querySelector('[name="price"]')) 
            form.querySelector('[name="price"]').value = data.price;  
    }

    bronBtns.forEach(btn => {
        btn.addEventListener('click', BronCar);
    });


    let bronDate = document.querySelector('#bron-date');
    let backDate = document.querySelector('#back-date');
    let birthday = document.querySelector('#bd');
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+1)
    let maxBd = new Date();
    maxBd.setFullYear(today.getFullYear() - 18);

    
    let formatDate = (date) => date.toISOString().split('T')[0];
    
    bronDate.min = formatDate(today);
    bronDate.value = formatDate(today);
    backDate.min = formatDate(tomorrow);
    backDate.value = formatDate(tomorrow);
    birthday.max = formatDate(maxBd);

});