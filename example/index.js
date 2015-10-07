/// <reference path="../typings/angularjs/angular.d.ts"/>
angular.module('testApp', ['fabric.ui.components', 'fabric.ui.components.datepicker', 'fabric.ui.components.toggle', 'fabric.ui.components.textbox']);
var controller = angular.module('testApp').controller("testController", function ($scope) {
    $scope.toggled = false;
});
