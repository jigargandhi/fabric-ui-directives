/*
Usage:
<uif-toggle labelOn="{string}" labelOff="{string}" desc="{string}" toggled="property" />

*/
var appModule = angular.module("fabricuiDirectives", []);
var ToggleDirective = (function () {
    function ToggleDirective() {
        this.templateUrl = "templates/toggle.html";
        this.uniqueId = 1;
        this.scope = {
            labelOff: "@labelOff",
            labelOn: "@labelOn",
            desc: "@desc",
            toggled: "=toggled"
        };
    }
    ToggleDirective.prototype.link = function (scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
    };
    ToggleDirective.factory = function () {
        var directive = function () { return new ToggleDirective(); };
        return directive;
    };
    return ToggleDirective;
})();
appModule.directive("uifToggle", ToggleDirective.factory());
