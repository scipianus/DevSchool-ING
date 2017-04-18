(function (module) {

    var eventPlannerConfig = function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "/views/login.html"
            })
            .when("/createEvent", {
                templateUrl: "/views/createEvent.html",
                controller: "CreateEventCtrl",
                controllerAs: "vm"
            })
            .when("/discoverEvents", {
                templateUrl: "/views/discoverEvents.html",
                controller: "DiscoverEventsCtrl",
                controllerAs: "vm"
            })
            .when("/myEvents", {
                templateUrl: "/views/myEvents.html",
                controller: "MyEventsCtrl",
                controllerAs: "vm"
            })
            .otherwise({
                redirectTo: "/myEvents"
            });
        $locationProvider.html5Mode(true);
    };

    var googleMapsApiConfig = function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCPjo6_Tk9fuO2Crj-WIIMpCFr0VF9V9Yo',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
    };

    module.config(eventPlannerConfig);
    module.config(googleMapsApiConfig);

}(angular.module("eventPlanner")));