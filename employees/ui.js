const PLACEHOLDER = 'employeesPlaceholder'

let $ = (id) => {
    return document.getElementById(id)
}

let runUi = (employees) => {
    showEmployees(employees)
    fillSelect($('managerSelect'), getEmployeesOptions())
    $("searchButton").click();

    for (let input of document.getElementsByTagName('input')) {
        console.log(input.parentNode.parentNode)
        // input.addEventListener('keypress', (e) => {
        //         if (e.key === 'Enter' && input.parentNode.parentNode.tagName === 'DIV') $('add').click()
        //         if (e.key === 'Enter' && input.parentNode.parentNode.tagName === 'FORM') $('find').click()
        //     })
        input.addEventListener('keyup', () => {
            if (input.parentNode.parentNode.tagName === 'DIV') $('add').click()
            if (input.parentNode.parentNode.tagName === 'FORM') $('find').click()
        })
    }
    // assignSendOnEnter("searchPane", "searchEmployeesButton");
    // assignSendOnEnter("addPane", "addEmployeeButton");
}

let clearEmployeesPlaceholder = () => {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}

showEmployees = (employees) => {
    clearEmployeesPlaceholder();
    const ul = document.createElement('ul')
    let array = []
    for (let employee of employees) {
        let manager = employee.managerRef || 0
        !array[manager] ? array[manager] = [] : ''
        array[manager].push(employee)
    }
    for (let managerid in array) {
        let manager = (managerid > 0) ? findById(+managerid) : false
        const li = document.createElement('li')
        ul.appendChild(li)
        li.innerHTML = '<b>' + (manager ? 'Manager ' + manager.name + " " + manager.surname : 'without manager') + '</b>'
        for (let employee of array[managerid]) {
            const ul2 = document.createElement('ul')
            li.appendChild(ul2)

            const li2 = document.createElement('li')
            ul2.appendChild(li2)
            li2.innerHTML = employee.name + " " + employee.surname;

            const managerSelect = document.createElement('select')
            managerSelect.id = 'select' + employee.id
            fillSelect(managerSelect, getEmployeesOptions(), employee.managerRef)
            managerSelect.addEventListener('change', () => {
                    employee.managerRef = managerSelect.value
                    showEmployees(employees)
                }
            )
            li2.appendChild(managerSelect)

            const removeButton = document.createElement("button")
            removeButton.innerHTML = "Delete";
            removeButton.addEventListener('click',
                () => removeEmployeeUI(employee.id));
            li2.appendChild(removeButton);
        }
        $(PLACEHOLDER).appendChild(ul)
    }
}

function addEmployeeUI() {
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
    showEmployees(DATA.employees);
}

let removeEmployeeUI = (id) => {
    removeEmployee(id)
    showEmployees(DATA.employees)
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
    for (let item of DATA.employees) {
        result.push({value: item.id, text: item.name + ' ' + item.surname})
    }
    return result
}

function searchEmployeeUI() {
    const name = document.getElementById("nameSearch").value;
    const surname = document.getElementById("surnameSearch").value;
    const managerRef = document.getElementById("managerSearch").value;

    const employees = searchEmployees(name, surname, managerRef);
    showEmployees(employees);
}

let openTab = (evt, id) => {
    var i, tabcontent, tablinks;
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