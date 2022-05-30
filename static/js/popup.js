const form = document.querySelector('.form');
const firstInput = document.querySelector('#input1');
const secondInput = document.querySelector('#input2');
const popup = document.querySelector('.popup');
const header = document.querySelector('h1');
const gameBox = document.querySelector('.game-box');

form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(form.input1.value);
    alert(`1st: ${firstInput.value}`);
    alert(`2nd: ${secondInput.value}`);
    firstInput.value = '';
    secondInput.value = '';
    closePopup();
});

form.addEventListener('click', event => {
    event.stopPropagation();
});

popup.addEventListener('click', () => {
    // closePopup();

    popup.classList.remove('fade-in')
    popup.classList.add('fade-out')
    setTimeout(closePopup, 400);
});

const closePopup = () => {
    popup.style.display = 'none';
    Array.from(gameBox.children).forEach(children => {
        children.style.filter = '';
    });
}

const showPopup = () => {
    popup.classList.add('fade-in')
    popup.classList.remove('fade-out')
    popup.style.display = 'flex';
    Array.from(gameBox.children).forEach(children => {
        children.style.filter = 'blur(4px)';
    });
}

header.addEventListener('click', showPopup);

setTimeout(() => {
    showPopup();
}, 750);