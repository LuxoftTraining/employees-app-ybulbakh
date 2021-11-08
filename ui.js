const PLACEHOLDER = 'employeesPlaceholder'

let $ = (id) => {
    return document.getElementById(id)
}

let runUi = (employees) => {
    showEmployees(employees)
}

let clearEmployeesPlaceholder = () => {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}

showEmployees = (employees) => {
    clearEmployeesPlaceholder();
    const ul = document.createElement('ul')
    for (let employee of employees) {
        const li = document.createElement('li')
        ul.appendChild(li)
        li.innerHTML = employee.name + " " + employee.surname;
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Delete";
        removeButton.addEventListener('click',
            () => removeEmployeeUI(employee.id));
        li.appendChild(removeButton);
        $(PLACEHOLDER).appendChild(ul)
    }
}

function addEmployeeUI() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    if (!name) $('addEmployeeFormErrorMessage').innerHTML += 'ERROR name<br>'
    if (!surname) $('addEmployeeFormErrorMessage').innerHTML += 'ERROR surname<br>'
    /*const id =*/ addEmployee(name, surname);
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    showEmployees(DATA.employees);
}

let removeEmployeeUI = (id) => {
    removeEmployee(id)
    showEmployees(DATA.employees)
}