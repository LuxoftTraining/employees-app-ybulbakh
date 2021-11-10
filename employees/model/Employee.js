import {Person} from "./Person";
export class Employee extends Person {
    constructor(name, surname, department) {
        super(name, surname);
        this.department = department;
    }
}
window.Employee = Employee;