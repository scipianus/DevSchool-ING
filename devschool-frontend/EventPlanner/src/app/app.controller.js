(function (module) {
    "use strict";
    var CreateEventCtrl = function ($location) {
        var vm = this;

        vm.event = {};

        vm.createEvent = function (event) {
            var newEvent = angular.copy(event);
            newEvent.startDate = vm.toTimestamp(event.startDate);
            newEvent.endDate = vm.toTimestamp(event.endDate);
            firebase.database().ref().child('/events').push(newEvent);
            $location.path("/");
        };

        vm.toTimestamp = function (date) {
            return (new Date(date)).getTime();
        };

        vm.validationClass = function (item) {
            return vm.isValid(item) ?
                "has-success has-feedback" :
                "has-error has-feedback";
        };

        vm.isValid = function (item) {
            return !(item === null || item === undefined);
        };
    };

    var MyEventsCtrl = function ($firebaseArray) {
        var vm = this;

        vm.options = ["day", "week", "month", "year"];

        vm.calendarConfig = {
            calendarView: "month",
            viewDate: Date.now(),
            calendarTitle: "Events",
            events: []
        };

        var ref = firebase.database().ref("/events");
        vm.events = $firebaseArray(ref);

        vm.events.$loaded().then(function (arr) {
            vm.calendarConfig.events = angular.copy(arr);
            for (var i = 0; i < vm.calendarConfig.events.length; ++i) {
                vm.calendarConfig.events[i].startsAt =
                    new Date(vm.calendarConfig.events[i].startDate);
                vm.calendarConfig.events[i].endsAt =
                    new Date(vm.calendarConfig.events[i].endDate);
                var color = vm.getRandomColor();
                vm.calendarConfig.events[i].color = {
                    primary: color,
                    secondary: color
                };
            }
        });

        vm.getRandomColor = function () {
            return "#" + ((1 << 24) * Math.random() | 0).toString(16);
        };

        vm.switchCalendarView = function (option) {
            vm.calendarConfig.calendarView = option;
        };

        vm.isCurrentOption = function (option) {
            return (option === vm.calendarConfig.calendarView) ? "active" : "";
        }
    };

    var DiscoverEventsCtrl = function ($firebaseArray, uiGmapGoogleMapApi) {
        var vm = this;

        vm.geocoder = new google.maps.Geocoder();
        vm.mapConfig = {
            center: {
                latitude: 44.439663,
                longitude: 26.096306
            },
            zoom: 10,
            markers: []
        };
        vm.markers = [];
        vm.asyncCalls = 2;

        var ref = firebase.database().ref("/events");
        vm.events = $firebaseArray(ref);

        vm.events.$loaded().then(function (arr) {
            vm.syncSources(1 - arr.length);
            vm.markers = angular.copy(arr);
            for (var i = 0; i < vm.markers.length; ++i) {
                vm.markers[i].id = i.toString();
                vm.markers[i].startsAt = new Date(vm.markers[i].startDate);
                vm.markers[i].endsAt = new Date(vm.markers[i].endDate);
                vm.markers[i].events = {};
                vm.markers[i].options = {draggable: false};
                vm.markers[i].windowOptions = {visible: false};
                vm.searchCoordsForAddress(vm.markers[i]);
            }
        });

        uiGmapGoogleMapApi.then(function (maps) {
            vm.syncSources(1);
        });

        vm.syncSources = function (count) {
            vm.asyncCalls -= count;
            if (vm.asyncCalls === 0) {
                vm.mapConfig.markers = vm.markers;
            }
        };

        vm.searchCoordsForAddress = function (event) {
            var id = event.id;

            vm.geocoder.geocode({address: event.location}, function (results, status) {
                if (status === 'OK') {
                    vm.markers[id].coords = {
                        latitude: results[0].geometry.location.lat(),
                        longitude: results[0].geometry.location.lng()
                    };
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
                vm.syncSources(1);
            });
        };

        vm.toggleMarkerWindow = function (marker) {
            vm.mapConfig.markers[marker.id].windowOptions.visible = !vm.mapConfig.markers[marker.id].windowOptions.visible;
        };

        vm.closeMarkerWindow = function (marker) {
            vm.mapConfig.markers[marker.id].windowOptions.visible = false;
        };
    };

    module.controller("CreateEventCtrl", CreateEventCtrl);
    module.controller("MyEventsCtrl", MyEventsCtrl);
    module.controller("DiscoverEventsCtrl", DiscoverEventsCtrl);

}(angular.module("eventPlanner")));