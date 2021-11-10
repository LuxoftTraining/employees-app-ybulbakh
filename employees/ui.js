import {getEmployees, removeEmployee, addEmployee, findById, searchEmployees, setEmployeeManager} from './service';

const PLACEHOLDER = 'employeesPlaceholder'

let $ = (id) => {
    return document.getElementById(id)
}

export let runUi = () => {
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

function showEmployees(employees) {
    clearEmployeesPlaceholder();
    const ul = document.createElement("ul");

    for (let employee of employees) {
        const li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = employee.name + " " + employee.surname;

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
        removeButton.innerHTML = "Удалить";
        removeButton.addEventListener('click',
            () => removeEmployeeUI(employee.id));
        li.appendChild(removeButton);
    }
    document.getElementById(PLACEHOLDER).appendChild(ul);
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

let removeEmployeeUI = (id) => {
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