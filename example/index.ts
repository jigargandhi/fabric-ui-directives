/// <reference path="../src/js/typings/angularjs/angular.d.ts"/>

var module = angular.module('testApp', ['fabricuiDirectives']);

var controller = module.controller("testController", function($scope) {
    $scope.toggled = false;
});

