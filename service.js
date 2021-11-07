let employeeMap = {}

let findByName = (name = '', surname = '') => {
    let result = []
    for (let employee of DATA.employees) {
        if ((!name || employee.name === name) && (!surname || employee.surname === surname)) {
            result.push(employee)
        }
    }
    return result
}

let addEmloyee = (name, surname) => {
    if (!name || !surname) throw 'name or surname is not defined'
    let id = DATA.employees.reduce(function (a, b) {
        return a.id > b.id ? a : b
    }).id + 1
    DATA.employees.push({'id': id, 'name': name, 'surname': surname})
}

let removeEmployee = (id) => {
    if (!id) throw 'id not defined'
    for (let employee of DATA.employees) {
        if (employee.id === id) {
            let index = DATA.employees.indexOf(employee)
            DATA.employees.splice(index, 1)
            break
        }
    }
}

let showEmployee = (employee) => {
    let keys = Object.keys(employee)
    for (let key of keys) {
        console.log(key + '=' + employee[key])
    }
}

showEmployees = () => {
    for (let employee of DATA.employees) {
        showEmployee(employee)
        console.log(employee);
    }
}

let findById = (id) => {
    if (!id) throw 'id not defined'
    if (employeeMap[id]) return employeeMap[id]
    for (let employee of DATA.employees) {
        if (employee.id === id) {
            employeeMap[id] = employee
            return employee
        }
    }
}

let addPhone = (id, phone) => {
    let employee = findById(id)
    !employee.phones ? employee.phones = [] : ''
    employee.phones.indexOf(phone) < 0 ? employee.phones.push(phone) : ''
}

let setDateOfBirth = (id, date) => {
    let employee = findById(id)
    employee.dateOfBirth = date
}

let getAge = (id) => {
    let today = new Date();
    let bd = new Date(findById(id).dateOfBirth)
    return Math.round((today - bd) / (24 * 3600 * 365 * 1000))
}

let formatDate = (date) => {
    let d = new Date(date)
    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    let month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    return day + '.' + month + '.' + d.getFullYear()
}

let getEmployeeInfo = (id) => {
    let employee = findById(id)
    result = employee.name + ' ' + employee.surname + ' was born ' + formatDate(employee.dateOfBirth) + ' (' + getAge(7) + ' years). ' + 'His phones: ' + employee.phones.toString();

    return result
}

let testEmployee = () => {
    addEmloyee('Andrew', 'Jackson')
    removeEmployee(5)
    addPhone(7, '911')
    addPhone(7, '922')
    addPhone(7, '922')
    setDateOfBirth(7, '2009-09-09')
    showEmployee(findById(7))
    console.log(getEmployeeInfo(7));
    console.log(getEmployeeJSON(7))
}

let getEmployeeJSON = (id) => {
    return JSON.stringify(findById(id))
}

testEmployee()