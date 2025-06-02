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
    const errorInput = document.getElementById('errorAdd');

    
     if (!status || !pc || !username || !price || !other) {
         errorInput.textContent = 'Please input the information!';
         return;
     }


    if (pc && username && price) {
        const newData = {
            status,
            pc,
            username,
            price,
            other,
            lastOnline: new Date().toISOString().split("T")[0],
        };

          errorInput.textContent = '';
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
    for (const checkbox of count_check) {
        if (checkbox.checked === true) {
            count++;
        }
    }
    document.getElementById('selectedCount').innerHTML = count;
}

// Add event listeners for checkbox changes
document.addEventListener('change', function (e) {
    if (e.target.classList.contains('row-check') || e.target.id === 'selectAllcheckbox') {
        updateSelectedCount();
    }
});

// Search filter
const search = document.getElementById('search-filter');
if (search) {
    search.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('#dataTable tbody tr');

        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

//link api 
const linkIcon = document.getElementById('apiLink');
const showInput = document.querySelector('.api-show');
const enter_button = document.getElementById('enter-api');
const linkInput = document.getElementById('input-link');

linkIcon.addEventListener(('click'), function(){
    showInput.classList.toggle('show');
});

enter_button.addEventListener(('click'), function(){
    const url = linkInput.value.trim();
    if(url){
        openApilink(url);
    }
});

function openApilink(url){
    window.open(url);
}








