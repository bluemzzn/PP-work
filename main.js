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


// add row
function addRow(){
    const pc = document.getElementById('pc').value.trim();
    const status = document.getElementById('status').value.trim();
    const username = document.getElementById('username').value.trim();
    const price = document.getElementById('price').value.trim();
    const errorInput = document.getElementById('errorAdd');

    const table = document.getElementById('dev-table').getElementsByTagName("tbody")[0];
    const newrow = table.insertRow();

        if (!status || !pc || !username || !price) {
        errorInput.textContent = 'Please input the information!';    
        return;
      }

    newrow.insertCell().innerHTML = `<input type="checkbox" class="row-check">`;
    newrow.insertCell().innerText = status;
    newrow.insertCell().innerText = pc;
    newrow.insertCell().innerText = username;
    newrow.insertCell().innerText = price;

    //clear input
    document.getElementById("status").value = '';
    document.getElementById("pc").value = '';
    document.getElementById("username").value = '';
    document.getElementById("price").value = '';

    errorInput.textContent = '';

    updateCheckedCount();

}   

//Select All checkboxes
function selectAll(source){
    const checkboxes = document.querySelectorAll('#dev-table tbody input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = source.checked;
    });
    updateCheckedCount();
}

function updateCheckedCount(){
     const checkboxes = document.querySelectorAll('#dev-table tbody input[type="checkbox"]');
    const count = Array.from(checkboxes).filter(cb => cb.checked).length;
    document.getElementById('checkedCount').innerText = count;

    // Update select all checkbox state if not all are selected
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    selectAllCheckbox.checked = checkboxes.length && count === checkboxes.length;
    selectAllCheckbox.indeterminate = count > 0 && count < checkboxes.length;
}

document.querySelectorAll('#dev-table tbody input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', updateCheckedCount);
});


//sort table
const table_head = document.querySelectorAll('thead th');

table_head.forEach((head) =>{
    head.onclick = () => {
        head.classList.add('active');
    }
})