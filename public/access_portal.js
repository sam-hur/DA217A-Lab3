const registerSelect = document.querySelector('#btn-register');
const loginSelect = document.querySelector('#btn-login');

const registerName = document.querySelector('#register-name');
const registerEmail = document.querySelector('#register-email');
const registerPassword = document.querySelector('#register-password');

const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');

const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');

// error messages
const errMsg = document.querySelector('#error');
const accessHeader = document.querySelector('#access-header');

function showRegisterForm() {  // displays the register/create account form
    accessHeader.innerHTML = "Create Account";
    document.getElementById("register").style.display = "block";
    document.getElementById("login").style.display = "none";
    errMsg.innerHTML = '';

}

function showLoginForm() {  // displays the login form
    accessHeader.innerHTML = "Login";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "block";
    errMsg.innerHTML = '';
}

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const registerDetails = {
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value,
    };

    fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerDetails)
    })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                errMsg.innerHTML = response.error;
            } else {
                errMsg.innerHTML = '';
                localStorage.setItem('auth-token', response.token);
                location.href = response.redirect;
            }
        })
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginDetails = {
        email: loginEmail.value,
        password: loginPassword.value,
    };

    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)
    })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                errMsg.innerHTML = response.error;
            } else {
                errMsg.innerHTML = '';
                localStorage.setItem('auth-token', response.token);
                location.href = response.redirect;
            }
        })
});
