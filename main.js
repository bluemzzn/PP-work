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
const showPass = document.querySelector('#showPass');

showPass.addEventListener('click', () =>{
    this.classList.toggle("bxs-lock");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
})