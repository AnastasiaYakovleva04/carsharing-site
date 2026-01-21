 document.addEventListener('DOMContentLoaded', ()=> {
    let learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    
    function FlipNew(event) {
        //карточка, в которой была нажата кнопка
        let card = event.currentTarget.closest('.new');
        
        let content = card.querySelector('.new-content');
        let img = card.querySelector('.news-img');
        
        if (content.style.opacity === '0') {
            content.style.opacity = '1';
            img.style.opacity = '0';
        } 
        else {
            content.style.opacity = '0';
            img.style.opacity = '1';
        }
    }

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', FlipNew);
    });
});