import {getEmployees, removeEmployee, addEmployee, findById, searchEmployees, setEmployeeManager} from './service';
import {Employee, jsonToEmployees} from "./model/Employee"

const PLACEHOLDER = 'employeesPlaceholder'

let $ = (id) => {
    return document.getElementById(id)
}

export let runUI = () => {
    showEmployees(getEmployees())
    fillSelect($('managerSelect'), getEmployeesOptions())
    $("searchButton").click();

    for (let input of document.getElementsByTagName('input')) {
        // input.addEventListener('keypress', (e) => {
        //         if (e.key === 'Enter' && input.parentNode.parentNode.tagName === 'DIV') $('add').click()
        //         if (e.key === 'Enter' && input.parentNode.parentNode.tagName === 'FORM') $('find').click()
        //     })
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && input.parentNode.parentNode.tagName === 'DIV') $('add').click()
            if (input.parentNode.parentNode.tagName === 'FORM') $('find').click()
        })
    }
    // assignSendOnEnter("searchPane", "searchEmployeesButton");
    // assignSendOnEnter("addPane", "addEmployeeButton");
}

let clearEmployeesPlaceholder = () => {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}

/*function showEmployees(employees) {
    clearEmployeesPlaceholder();
    const ul = document.createElement("ul");

    for (let employee of jsonToEmployees(employees)) {
        const li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = employee;

        if (employee.managerRef) {
            let manager = findById(employee.managerRef);
            const managerSpan = document.createElement("span");
            const managerSelect = document.createElement("select");
            fillSelect(managerSelect, getEmployeesOptions(), employee.managerRef);
            managerSelect.addEventListener('change',
                () => employee.managerRef = managerSelect.value);
            managerSpan.innerHTML = " <b>Manager:</b> ";
            li.appendChild(managerSpan);
            li.appendChild(managerSelect);
        }

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Delete";
        removeButton.addEventListener('click',
            () => removeEmployeeUI(employee.id));
        li.appendChild(removeButton);
    }
    document.getElementById(PLACEHOLDER).appendChild(ul);
    const total = document.createElement("p")
    document.getElementById(PLACEHOLDER).appendChild(total);

    const employee = new Employee();
    const departments = employee.getDepartments()

    total.innerHTML = 'Departments: ' + departments + "\r\n"
    for (let dep of departments) {
        const d = document.createElement("p")
        total.appendChild(d);
        d.innerHTML = dep

        const ul = document.createElement("ul");
        d.appendChild(ul);
        ul.appendChild(document.createElement("li")).innerHTML = 'Employees: ' + employee.depEmployees(dep);
        ul.appendChild(document.createElement("li")).innerHTML = 'Amount: ' + employee.amountInDep(dep);
        ul.appendChild(document.createElement("li")).innerHTML = 'Sum Salary: ' + employee.sumSalaryInDep(dep);
        ul.appendChild(document.createElement("li")).innerHTML = 'Avg Salary: ' + employee.avgSalaryInDep(dep);
        ul.appendChild(document.createElement("li")).innerHTML = 'Max Salary: ' + employee.maxSalaryInDep(dep);
    }
    total.appendChild(document.createElement("li")).innerHTML = 'employeesWithSalaryMoreThan 1000: ' + employee.employeesWithSalaryMoreThan(1000)
    total.appendChild(document.createElement("li")).innerHTML = 'depWithMaxSalary: ' + employee.depWithMaxAvgSalary()
}*/
/*
export function showEmployees(employeesJSON) {
    let employees = jsonToEmployees(employeesJSON);
    const html = showEmployeesView(employees);
    document.getElementById(PLACEHOLDER).innerHTML = html;
}
*/

function showEmployees(employeesJSON) {
    let employees = jsonToEmployees(employeesJSON);
    const html = showEmployeesView(
        getEmployees(), employees);
    document.getElementById(PLACEHOLDER).innerHTML =
        html;
}

/*
function showEmployeesView(employees) {
    let li_items = employees.map(e=>
        `<li>${e} <button
		onclick="removeEmployeeUI(${e.id})">X</button>
	</li>`).join("");
    return `<ul>${li_items}</ul>`;
}
*/

function showEmployeesView(allEmployees, employees) {
    let li_items = employees.map(e=>
        `<li>${e} <button 
		onclick="removeEmployeeUI(${e.id})">X</button>
     ${employeeManagerView(allEmployees,e.managerRef)}
      </li>`
    ).join("");

    return `<ul>${li_items}</ul>`;
}

export function addEmployeeUI() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const manager = document.getElementById("managerSelect").value;

    if (!name) {
        $('addEmployeeFormErrorMessage').innerHTML += 'ERROR name<br>'
        document.getElementById("name").style.backgroundColor = '#FFEEEE';
    }
    if (!surname) {
        $('addEmployeeFormErrorMessage').innerHTML += 'ERROR surname<br>'
        document.getElementById("surname").style.backgroundColor = '#FFEEEE';
    }
    const id = addEmployee(name, surname);
    setEmployeeManager(id, manager)
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    showEmployees(getEmployees());
}

export let removeEmployeeUI = (id) => {
    removeEmployee(id)
    showEmployees(getEmployees())
}

let fillSelect = (select, values, selectedValue) => {
    let option = document.createElement('option')
    option.text = 'Undefined'
    option.value = '0'
    select.add(option)

    for (let item of values) {
        let option = document.createElement('option')
        option.text = item.text
        option.value = item.value
        if (selectedValue === +option.value) option.selected = true;
        select.add(option)
    }
}

let getEmployeesOptions = () => {
    let result = []
    for (let item of getEmployees()) {
        result.push({value: item.id, text: item.name + ' ' + item.surname})
    }
    return result
}

export function searchEmployeeUI() {
    const name = document.getElementById("nameSearch").value;
    const surname = document.getElementById("surnameSearch").value;
    const managerRef = document.getElementById("managerSearch").value;

    const employees = searchEmployees(name, surname, managerRef);
    showEmployees(employees);
}

export let openTab = (evt, id) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
    $(id).style.display = 'block'
}

function assignSendOnEnter(paneId, buttonId) {
    let allInput = document.querySelectorAll("#" + paneId + " input");
    for (let input of allInput) {
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.querySelector("#" + paneId + " button").click();
            }
        });
    }
}

export function selectView(values) {
    const values_html = values.map(v=>
        `<option value="${v.value}" 
         ${v.selected?'selected':''}>${v.text}</option>`
    ).join("");
    return `<select>${values_html}</select>`;
}

export function employeeManagerView(employees, selectedId) {
    if (!selectedId) return "";
    let values = employees.map(e=>{
        return { text:e.name+" "+e.surname,
            value:e.id,
            selected: e.id===selectedId
        }
    });
    return `<span>${selectView(values)}</span>`;
}
