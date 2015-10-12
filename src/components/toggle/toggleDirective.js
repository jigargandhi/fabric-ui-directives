/*
Usage:
<uif-toggle labelOn="{string}" labelOff="{string}" desc="{string}" toggled="property" />

*/
var ToggleDirective = (function () {
    function ToggleDirective() {
        this.template = '<div ng-class="toggleClass">' +
            '<span class="ms-Toggle-description"><ng-transclude/></span>' +
            '<input type="checkbox" id="{{uniqueId}}" class="ms-Toggle-input" ng-model="toggled" />' +
            '<label for="{{uniqueId}}" class="ms-Toggle-field">' +
            '<span class="ms-Label ms-Label--off">{{labelOff}}</span>' +
            '<span class="ms-Label ms-Label--on">{{labelOn}}</span>' +
            '</label>' +
            '</div>';
        this.transclude = true;
        this.uniqueId = 1;
        this.scope = {
            labelOff: "@",
            labelOn: "@",
            toggled: "="
        };
    }
    ToggleDirective.prototype.link = function (scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
        scope.toggleClass = "ms-Toggle";
        if (attrs["textLocation"]) {
            var loc = attrs["textLocation"];
            loc = loc.charAt(0).toUpperCase() + loc.slice(1);
            scope.toggleClass += " ms-Toggle--text" + loc;
        }
    };
    ToggleDirective.factory = function () {
        var directive = function () { return new ToggleDirective(); };
        return directive;
    };
    return ToggleDirective;
})();
angular.module("fabric.ui.components.toggle", ['fabric.ui.components'])
    .directive("uifToggle", ToggleDirective.factory());
