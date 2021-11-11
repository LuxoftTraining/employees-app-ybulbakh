import {Person} from "./Person";
import {getEmployees} from "../service";

export class Employee extends Person {
    constructor(name, surname, department) {
        super(name, surname);
        this.department = department;
    }

    static fromJSON(obj) {
        return Object.assign(new Employee(), obj)
    }

    getDepartments = () => {
        let dep = []
        return getEmployees()
            .map(e => e.department)
            .filter(d => !dep.includes(d) ? dep.push(d) : false)
    }

    amountInDep(dep) {
        return getEmployees()
            .map(e => e.department)
            .filter(d => d === dep)
            .length;
    }

    sumSalaryInDep(dep) {
        return getEmployees()
            .filter(e => e.department === dep)
            .map(e => e.salary)
            .reduce((a, b) => a + b);
    }

    avgSalaryInDep(dep) {
        return this.sumSalaryInDep(dep) / this.amountInDep(dep)
    }

    maxSalaryInDep(dep) {
        return getEmployees()
            .filter(e => e.department === dep)
            .map(e => e.salary)
            .reduce((a, b) => b > a ? a = b : a = a);
    }

    depWithMaxAvgSalary() {
        return getEmployees()
            .map(e => [e.department, this.avgSalaryInDep(e.department)])
            .reduce((a, b) => b.salary > a.salary ? b : a)
    }

    depEmployees(dep) {
        return jsonToEmployees(getEmployees()
            .filter(e => e.department === dep))
    }

    employeesWithSalaryMoreThan(salary) {
        return jsonToEmployees(getEmployees()
            .filter(e => e.salary > salary))
    }
}

export function jsonToEmployees(employeesJSON) {
    let employees = [];
    for (let e of employeesJSON) {
        employees.push(Employee.fromJSON(e));
    }
    return employees;
}

window.Employee = Employee;

window.allEmployees = function () {
    return jsonToEmployees(getEmployees());
}