(function (module) {
    "use strict";
    var EmployeeCtrl = function ($http, $location) {
        var vm = this;

        vm.employees = [];

        vm.newEmployee = {};

        vm.getEmployees = function () {
            $http.get('rest/getAll').then(function (response) {
                vm.employees = response.data;
            });
        };

        vm.delete = function (id) {
            if (confirm('Are you sure you want to delete?')) {
                $http.delete('rest/delete/' + id, {}).then(function () {
                    vm.getEmployees();
                });
            }
        };

        vm.add = function (employee) {
            $http.post('rest/add', vm.newEmployee).then(function () {
                $location.path('/');
                vm.getEmployees();
            });
        };

        vm.isValidId = function (id) {
            return id !== null && id !== undefined && parseInt(id) > 0;
        };

        vm.validationClassId = function (id) {
            return vm.isValidId(id) ? "has-success" : "has-error"
        };

        vm.isValidName = function (name) {
            return name !== null && name !== undefined && name.length > 0;
        };

        vm.validationClassName = function (name) {
            return vm.isValidName(name) ? "has-success" : "has-error"
        };

        vm.isValidSalary = function (salary) {
            return salary !== null && salary !== undefined && parseInt(salary) >= 0;
        };

        vm.validationClassSalary = function (salary) {
            return vm.isValidSalary(salary) ? "has-success" : "has-error"
        };

        vm.goToAddEmployee = function () {
            $location.path("addEmployee");
        };

        vm.goToList = function () {
            $location.path("");
            vm.getEmployees();
        };

        vm.getEmployees();
    };

    module.controller("EmployeeCtrl", EmployeeCtrl);

}(angular.module("employeeApp")));