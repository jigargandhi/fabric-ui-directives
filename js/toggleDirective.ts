/*
Usage: 
<uif-toggle labelOn="{string}" labelOff="{string}" desc="{string}" toggled="property" />

*/
var appModule = angular.module("fabricuiDirectives", []);

class ToggleDirective implements ng.IDirective {
    templateUrl = "templates/toggle.html";
    constructor() {
    }
    uniqueId = 1;
    scope = {
        labelOff: "@labelOff",
        labelOn: "@labelOn",
        desc: "@desc",
        toggled: "=toggled"
    }

    link(scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new ToggleDirective();

        return directive;
    }
}

appModule.directive("uifToggle", ToggleDirective.factory());