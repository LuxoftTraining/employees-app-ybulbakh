const PLACEHOLDER = 'employeesPlaceholder'

let $ = (id) => {
    return document.getElementById(id)
}

runUi=(employees)=>{
    showEmployees(employees)
}

clearEmployeesPlaceholder = () => {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}

showEmployees = (employees) => {
    clearEmployeesPlaceholder();
    $(PLACEHOLDER).innerHTML = '<ul>'
    for (let employee of employees) {
        $(PLACEHOLDER).innerHTML += '<li>' + employee.name + ' ' + employee.surname + '</li>'
    }
    $(PLACEHOLDER).innerHTML += '</ul>'
}
function addEmployeeUI() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const id = addEmployee(name, surname);
    showEmployees(DATA.employees);
}