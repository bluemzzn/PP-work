// Login & Register animation
const container = document.querySelector('.login-container');
const registerbtn = document.querySelector('.register-btn');
const loginbtn = document.querySelector('.login-btn');

registerbtn.addEventListener('click', () =>{
    container.classList.add('active');
});

loginbtn.addEventListener('click', () =>{
    container.classList.remove('active');
});

// Show password function
const showloginPass = document.querySelector('#showPass');
const passwordField = document.querySelector('#login-pass');

showloginPass.addEventListener("click", function(){
    this.classList.toggle("fa-eye");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
})

const showRegisterPass = document.querySelector('#showregisterPass');
const registerPasswordField = document.querySelector('#register-pass');

showRegisterPass.addEventListener("click", function(){
    this.classList.toggle("fa-eye");
    const type = registerPasswordField.getAttribute("type") === "password" ? "text" : "password";
    registerPasswordField.setAttribute("type", type);
});

//Animation hidden & show when enter the site

