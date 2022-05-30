const form = document.querySelector('.form');
const firstInput = document.querySelector('#input1');
const secondInput = document.querySelector('#input2');
const popup = document.querySelector('.popup');
const popupRegister = document.querySelector('.popup-register');
const gameBox = document.querySelector('.game-box');
const popupLink = document.querySelectorAll('.popup-link');

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
    popup.classList.remove('fade-in')
    popup.classList.add('fade-out')
    setTimeout(closePopup, 400);
});

popupRegister.addEventListener('click', () => {
    popupRegister.classList.remove('fade-in')
    popupRegister.classList.add('fade-out')
    setTimeout(closeRegisterPopup, 400);
});

const closePopup = () => {
    popup.classList.remove('fade-in')
    popup.style.display = 'none';
    Array.from(gameBox.children).forEach(children => {
        children.style.filter = '';
    });
}

function refreshPopupLink() {
    const popupLink = document.querySelector('.popup-link');
}

const showPopup = () => {
    popup.classList.add('fade-in');
    popup.classList.remove('fade-out');
    popup.style.display = 'flex';
    Array.from(gameBox.children).forEach(children => {
        children.style.filter = 'blur(4px)';
    });
    refreshPopupLink();
}

const closeRegisterPopup = () => {
    popupRegister.classList.remove('fade-in');
    popupRegister.style.display = 'none';
    Array.from(gameBox.children).forEach(children => {
        children.style.filter = '';
    });
}

const showRegisterPopup = () => {
    popupRegister.classList.add('fade-in');
    popupRegister.classList.remove('fade-out');
    popupRegister.style.display = 'flex';
    Array.from(gameBox.children).forEach(children => {
        children.style.filter = 'blur(4px)';
    });
    refreshPopupLink();
};

popupLink.forEach(link => {
    link.addEventListener('click', () => {
        if (popupRegister.style.display === 'flex') {
            closeRegisterPopup();
            showPopup();
        } else if (popup.style.display === 'flex') {
            closePopup();
            showRegisterPopup();
        }
    });
});

setTimeout(() => {
    showPopup();
}, 750);
