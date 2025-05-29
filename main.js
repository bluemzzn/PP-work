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

//Password Register Validation
document.getElementById('confirmPassword').addEventListener('input', 
    function(){
        validationForm();
    }
);

function validationForm() {
    const password = document.getElementById('register-pass').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const submitBtn = document.getElementById('submitbtn');
    const errorElement = document.getElementById('passwordError');

    if (!password || !confirmPassword) {
        errorElement.textContent = '';
        errorElement.classList.remove('success', 'error');
        submitBtn.classList.remove('enabled');
        submitBtn.disabled = true;
        return;
    }

    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        errorElement.classList.remove('success');
        errorElement.classList.add('error');
        submitBtn.classList.remove('enabled');
        submitBtn.disabled = true;
    } else {
        errorElement.textContent = 'Passwords match';
        errorElement.classList.add('success');
        errorElement.classList.remove('error');
        submitBtn.classList.add('enabled');
        submitBtn.disabled = false;
    }
}


//Animation hidden & show when enter the site

