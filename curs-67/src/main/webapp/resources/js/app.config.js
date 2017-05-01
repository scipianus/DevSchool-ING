(function (module) {

    var employeeAppConfig = function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "employeeList.html"
            })
            .when("/addEmployee", {
                templateUrl: "employeeAdd.html"
            })
            .otherwise({
                redirectTo: "/"
            });
        $locationProvider.html5Mode(true);
    };

    module.config(employeeAppConfig);

}(angular.module("employeeApp")));