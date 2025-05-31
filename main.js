//call the fetch send request to json 
fetch("datas.json")
    .then(function (response) {
        return response.json();
    })

    .then(function (datas) {
        let placeholder = document.querySelector('#data-output');
        let out = "";
        for (let data of datas) {
            out += ` 
            <tr>
                <td><input type="checkbox" class="row-check"></td>
                <td>${data.status}</td>
                <td>${data.pc}</td>
                <td>${data.username}</td>
                <td>${data.price}</td>
            </tr>
        `;
        }

        placeholder.innerHTML = out;
    })


// Login & Register animation
const container = document.querySelector('.login-container');
const registerbtn = document.querySelector('.register-btn');
const loginbtn = document.querySelector('.login-btn');

if (registerbtn) {
    registerbtn.addEventListener('click', () => {
        container.classList.add('active');
    });
}

if (loginbtn) {
    loginbtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
}

// Show password function
const showloginPass = document.querySelector('#showPass');
const passwordField = document.querySelector('#login-pass');

if (showloginPass) {
    showloginPass.addEventListener("click", function () {
        this.classList.toggle("fa-eye");
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
    })
}

const showRegisterPass = document.querySelector('#showregisterPass');
const registerPasswordField = document.querySelector('#register-pass');

if (showRegisterPass) {
    showRegisterPass.addEventListener("click", function () {
        this.classList.toggle("fa-eye");
        const type = registerPasswordField.getAttribute("type") === "password" ? "text" : "password";
        registerPasswordField.setAttribute("type", type);
    });
}

//Password Register Validation
const confirmPasswordInput = document.getElementById('confirmPassword');
if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', function () {
        validationForm();
    });
}

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

const form = document.getElementById("dataForm");
const table = document.querySelector("#dataTable tbody");


//store data in json
let data = [];

form.addEventListener("submit", function(e){
    e.preventDefault();

    const pc = document.getElementById("pc-input").value.trim();
    const username = document.getElementById("username-input").value.trim();
    const price = document.getElementById("price-input").value.trim();

    if (pc && username && price){
        const newData = {
            status: "online",
            pc,
            username,
            price,
            lastOnline: new Date().toISOString().split("T")[0],
        };

        data.push(newData);
        renderTable();
        form.reset();
    }
});


function renderTable(){
    table.innerHTML = "";

    data.forEach((item) =>{
        const row = document.createElement("tr");

        row.innerHTML = `
        <td><input type="checkbox" class="row-check"></td>
        <td class="${item.status === 'online' ? 'status-online' : 'status-offline'}">
            ${item.status === 'online' ? 'Online' : 'Offline'}
        </td>
        <td>${item.pc}</td>
        <td>${item.username}</td>
        <td>${item.price}</td>
        `;
        table.appendChild(row);
    });
}
















// add row
// function addRow() {
//     const pc = document.getElementById('pc').value.trim();
//     const status = document.getElementById('status').value.trim();
//     const username = document.getElementById('username').value.trim();
//     const price = document.getElementById('price').value.trim();
//     const nan = document.getElementById('nan').value.trim();
//     const errorInput = document.getElementById('errorAdd');

//     const table = document.getElementById('dev-table').getElementsByTagName("tbody")[0];
//     const newrow = table.insertRow();

//     if (!status || !pc || !username || !price) {
//         errorInput.textContent = 'Please input the information!';
//         return;
//     }

//     newrow.insertCell().innerHTML = `<input type="checkbox" class="row-check">`;
//     newrow.insertCell().innerText = status;
//     newrow.insertCell().innerText = pc;
//     newrow.insertCell().innerText = username;
//     newrow.insertCell().innerText = price;
//     newrow.insertCell().innerHTML = nan;


//     //clear input
//     document.getElementById("status").value = '';
//     document.getElementById("pc").value = '';
//     document.getElementById("username").value = '';
//     document.getElementById("price").value = '';
//     document.getElementById("nan").value = '';

//     errorInput.textContent = '';
// }

// const form = document.querySelector("form");

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const formdata = new FormData(form);
//     const obj = Object.fromEntries(formdata);

//     const json = JSON.stringify(obj);
//     localStorage.setItem('form', json);
// })

// //Select All checkboxes
// function selectAll(source) {
//     const checkboxes = document.querySelectorAll('#dev-table tbody input[type="checkbox"]');
//     checkboxes.forEach(cb => {
//         cb.checked = source.checked;
//     });
//     updateCheckedCount();
// }

// function updateCheckedCount() {
//     const checkboxes = document.querySelectorAll('#dev-table tbody input[type="checkbox"]');
//     const count = Array.from(checkboxes).filter(cb => cb.checked).length;
//     document.getElementById('checkedCount').innerText = count;

//     // Update select all checkbox state if not all are selected
//     const selectAllCheckbox = document.getElementById('selectAllCheckbox');
//     selectAllCheckbox.checked = checkboxes.length && count === checkboxes.length;
//     selectAllCheckbox.indeterminate = count > 0 && count < checkboxes.length;
// }

// document.querySelectorAll('#dev-table tbody input[type="checkbox"]').forEach(cb => {
//     cb.addEventListener('change', updateCheckedCount);
// });


