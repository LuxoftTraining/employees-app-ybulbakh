import DATA from "./employees-json";
import {findById} from "./service";

export function removeEmployee(employees, id) {
    return employees.filter(e => e.id !== id);
}

export function addEmployee(name, surname) {
    let newEmployees = [...DATA.employees]
    let id = DATA.employees.reduce(function (a, b) {
        return a.id > b.id ? a : b
    }).id + 1
    newEmployees.push({'id': id, 'name': name, 'surname': surname})
    return newEmployees
}