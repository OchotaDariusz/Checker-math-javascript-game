const loginForm = document.querySelector('#signin');
const registerForm = document.querySelector('#signup');
const form = document.querySelectorAll('.form');
const usernameLogin = document.querySelector('#username-login');
const passwordLogin = document.querySelector('#password-login');
const usernameRegister = document.querySelector('#username-register');
const passwordRegister = document.querySelector('#password-register');
const passwordRegister2 = document.querySelector('#password2-register');
const popup = document.querySelector('.popup');
const popupRegister = document.querySelector('.popup-register');
const gameBox = document.querySelector('.game-box');
const popupLink = document.querySelectorAll('.popup-link');
const login = document.querySelector('#login');
const logout = document.querySelector('#logout');

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const urlTarget = `${window.location.href}login`;

    const userData = {
        username: usernameLogin.value,
        password: passwordLogin.value
    };

    fetch(urlTarget, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = data['url'];
        })
        .catch(error => console.error(error));

    loginForm.reset();
    closePopup(popup);
});

registerForm.addEventListener('submit', event => {
    event.preventDefault();

    const urlTarget = `${window.location.href}registration`;

    const userData = {
        username: usernameRegister.value,
        password: passwordRegister.value,
        password2: passwordRegister2.value
    };

    fetch(urlTarget, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = data['url'];
        })
        .catch(error => console.error(error));

    registerForm.reset();
    closePopup(popupRegister);
});

form.forEach(item => {
    item.addEventListener('click', event => {
        event.stopPropagation();
    });
});

popup.addEventListener('click', () => {
    popup.classList.remove('fade-in')
    popup.classList.add('fade-out')
    setTimeout( () => {
        closePopup(popup);
    }, 400);
});

popupRegister.addEventListener('click', () => {
    popupRegister.classList.remove('fade-in')
    popupRegister.classList.add('fade-out')
    setTimeout(() => {
        closePopup(popupRegister);
    }, 400);
});

const closePopup = element => {
    element.classList.remove('fade-in')
    element.style.display = 'none';
    Array.from(gameBox.children).forEach(children => {
        children.style.filter = '';
    });
}

function refreshPopupLink() {
    const popupLink = document.querySelector('.popup-link');
}

const showPopup = element => {
    element.classList.add('fade-in');
    element.classList.remove('fade-out');
    element.style.display = 'flex';
    Array.from(gameBox.children).forEach(children => {
        children.style.filter = 'blur(4px)';
    });
    refreshPopupLink();
}

// const closeRegisterPopup = () => {
//     popupRegister.classList.remove('fade-in');
//     popupRegister.style.display = 'none';
//     Array.from(gameBox.children).forEach(children => {
//         children.style.filter = '';
//     });
// }

// const showRegisterPopup = () => {
//     popupRegister.classList.add('fade-in');
//     popupRegister.classList.remove('fade-out');
//     popupRegister.style.display = 'flex';
//     Array.from(gameBox.children).forEach(children => {
//         children.style.filter = 'blur(4px)';
//     });
//     refreshPopupLink();
// };

popupLink.forEach(link => {
    link.addEventListener('click', () => {
        if (popupRegister.style.display === 'flex') {
            closePopup(popupRegister);
            showPopup(popup);
        } else if (popup.style.display === 'flex') {
            closePopup(popup);
            showPopup(popupRegister);
        }
    });
});

setTimeout(() => {
    showPopup(popup);
}, 750);

login.addEventListener('click', () => {
    showPopup(popup);
});
