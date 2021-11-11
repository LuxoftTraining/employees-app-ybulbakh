import {addEmployee, removeEmployee} from './service.pure';
import DATA from './employees-json';

const employees = DATA.employees;

test('removeEmployee', () =>
    expect(removeEmployee(employees, 5))
        .toEqual(employeesRemoved5)
);

test('addEmployee', () =>
    expect(addEmployee('7', '7'))
        .toEqual(employees7added)
);

const employees7added = [
    {
        id: 1,
        name: "George",
        surname: "Washington",
        department: "GOV",
        salary: 1000,
    },
    {
        id: 2,
        name: "John ",
        surname: "Adams",
        department: "GOV",
        dateOfBirth: "2009-07-09",
        salary: 3000,
    },
    {
        id: 3,
        name: "Thomas",
        surname: "Jefferson",
        department: "IT",
        managerRef: 4,
        salary: 1000,
    },
    {
        id: 4,
        name: "James",
        surname: "Madison",
        department: "IT",
        managerRef: 2,
        salary: 1000,
    },
    {
        id: 5,
        name: "James",
        surname: "Monroe",
        department: "GOV",
        salary: 2000,
    },
    {
        id: 6,
        name: "John",
        surname: "Quincy",
        department: "GOV",
        managerRef: 2,
        salary: 1500,
    },
    {
        id: 7,
        name: "7",
        surname: "7",
    },
]

const employeesRemoved5 = [
    {
        id: 1,
        name: "George",
        surname: "Washington",
        department: "GOV",
        salary: 1000,
    },
    {
        id: 2,
        name: "John ",
        surname: "Adams",
        department: "GOV",
        dateOfBirth: "2009-07-09",
        salary: 3000,
    },
    {
        id: 3,
        name: "Thomas",
        surname: "Jefferson",
        department: "IT",
        managerRef: 4,
        salary: 1000,
    },
    {
        id: 4,
        name: "James",
        surname: "Madison",
        department: "IT",
        managerRef: 2,
        salary: 1000,
    },
    {
        id: 6,
        name: "John",
        surname: "Quincy",
        department: "GOV",
        managerRef: 2,
        salary: 1500,
    },
]