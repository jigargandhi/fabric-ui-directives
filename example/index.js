/// <reference path="../typings/angularjs/angular.d.ts"/>
angular.module('testApp', ['fabric.ui.components', 'fabric.ui.components.datepicker',
    'fabric.ui.components.toggle',
    'fabric.ui.components.textbox',
    'fabric.ui.components.dropdown'
]);
var controller = angular.module('testApp').controller("testController", function ($scope) {
    $scope.toggled = false;
    $scope.date = new Date();
    $scope["options"] = [
        { text: "Option 1" },
        { text: "Option 2" },
        { text: "Option 3" },
        { text: "Option 4" }
    ];
});
