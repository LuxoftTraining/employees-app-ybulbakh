import {employeeManagerView} from './ui';
import DATA from './employees-json';

const employees = DATA.employees;

String.prototype.trimAll = function () {
    return this.replace(/>\s+</g, '><').replace(/\s\s+/g, ' ').trim()
};

String.prototype.removeTags = function() {
    return this.replace(/<[^>]+>/g,'').trimAll()
};

test('employeeManagerView Text', ()=>
    expect(employeeManagerView(employees,5).removeTags())
        .toEqual(
            "George WashingtonJohn AdamsThomas JeffersonJames MadisonJames MonroeJohn Quincy")
);