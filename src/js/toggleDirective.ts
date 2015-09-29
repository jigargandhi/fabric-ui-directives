/*
Usage: 
<uif-toggle labelOn="{string}" labelOff="{string}" desc="{string}" toggled="property" />

*/
var appModule = angular.module("fabricuiDirectives", []);

class ToggleDirective implements ng.IDirective {
    
    template = '<div class="ms-Toggle">' +
                '<span class="ms-Toggle-description">{{desc}}</span>' +
                '<input type="checkbox" id="{{uniqueId}}" class="ms-Toggle-input" ng-model="toggled" />' +
                '<label for="{{uniqueId}}" class="ms-Toggle-field">' +
                    '<span class="ms-Label ms-Label--off">{{labelOff}}</span>' +
                    '<span class="ms-Label ms-Label--on">{{labelOn}}</span>' +
                '</label>' +
                '</div>';
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