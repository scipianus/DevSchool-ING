(function (module) {

    var link = function (scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$validators.maxAmount = function (value) {
            return value <= scope.maxAmount;
        };
    };

    var MaxAmount = function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                maxAmount: '=maxAmount'
            },
            link: link
        };
    };

    module.directive("maxAmount", MaxAmount);

}(angular.module("formValidationApp")));