import {runUI, addEmployeeUI, openTab, searchEmployeeUI} from './employees/ui-all';
import './style.css';
import {Employee} from './employees/model/Employee';

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
runUI();