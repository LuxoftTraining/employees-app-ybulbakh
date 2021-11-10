import {runUi, addEmployeeUI, openTab, searchEmployeeUI} from './employees/ui';
import './style.css';

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
runUi();