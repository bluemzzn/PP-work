// //call the fetch send request to json 
// fetch("datas.json")
//     .then(function (response) {
//         return response.json();
//     })

//     .then(function (datas) {
//         let placeholder = document.querySelector('#data-output');
//         let out = "";
//         for (let data of datas) {
//             out += ` 
//             <tr>
//                 <td><input type="checkbox" class="row-check"></td>
//                 <td>${data.status}</td>
//                 <td>${data.pc}</td>
//                 <td>${data.username}</td>
//                 <td>${data.price}</td>
//             </tr>
//         `;
//         }

//         placeholder.innerHTML = out;
//     })


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


//Add data on the row 
const form = document.getElementById("dataForm");
const table = document.querySelector("#dataTable tbody");


//store data in json
let data = JSON.parse(localStorage.getItem("pcData")) || [];

renderTable();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById("status-input").value.trim();
    const pc = document.getElementById("pc-input").value.trim();
    const username = document.getElementById("username-input").value.trim();
    const price = document.getElementById("price-input").value.trim();
    const other = document.getElementById("other-input").value.trim();


    if (pc && username && price) {
        const newData = {
            status,
            pc,
            username,
            price,
            other,
            lastOnline: new Date().toISOString().split("T")[0],
        };

        data.push(newData);
        localStorage.setItem("pcData", JSON.stringify(data));
        renderTable();
        form.reset();
    }
});


function renderTable() {
    table.innerHTML = "";

    data.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td><input type="checkbox" class="row-check"></td>
        <td>${item.status === 'Online' ? 'Online' : 'Offline'}</td>
        <td>${item.pc}</td>
        <td>${item.username}</td>
        <td>${item.price}</td>
         <td>${item.other === '✅' ? '✅' : '❌'}</td>
        `;
        table.appendChild(row);
    });

 
}

//selected delete row
function deleteSelectedRows() {
    const checkboxes = document.querySelectorAll('.row-check:checked');
    const errorDelete = document.querySelector('.errorDelete');
    if (checkboxes.length === 0) {
        errorDelete.textContent = " Please select rows to delete";
        return;
    }

    if (confirm("Are you sure you want to delete selected rows?")) {
        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const rowIndex = Array.from(row.parentNode.children).indexOf(row);
            data.splice(rowIndex, 1);
        });
        localStorage.setItem("pcData", JSON.stringify(data));
        renderTable();
        errorDelete.textContent = '';
    }
}

const deleteTable = document.getElementById("delete");

deleteTable.addEventListener('click', deleteSelectedRows);


//Select all check box
const checkboxall = document.getElementById("selectAllcheckbox");

checkboxall.addEventListener(('click'), function () {
    if (this.checked) {
        const inputall = document.querySelectorAll(".row-check");
        inputall.forEach(tick => {
            tick.checked = true;
        });
    } else {
        const inputall = document.querySelectorAll(".row-check");
        inputall.forEach(tick => {
            tick.checked = false;
        });
    }
})


//count check box

function updateSelectedCount() {
    const count_check = document.querySelectorAll(".row-check");
    let count = 0;
    for(const checkbox of count_check){
        if(checkbox.checked === true){
            count++;
        }
    }
    document.getElementById('selectedCount').innerHTML = count;
}

// Add event listeners for checkbox changes
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('row-check') || e.target.id === 'selectAllcheckbox') {
        updateSelectedCount();
    }
});













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



