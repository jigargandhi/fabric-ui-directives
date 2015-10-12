/*
Usage: 
<uif-toggle labelOn="{string}" labelOff="{string}" desc="{string}" toggled="property" />

*/

class ToggleDirective implements ng.IDirective {
    
    template = '<div ng-class="toggleClass">' +
                 '<span class="ms-Toggle-description"><ng-transclude/></span>' +
                '<input type="checkbox" id="{{uniqueId}}" class="ms-Toggle-input" ng-model="toggled" />' +
                '<label for="{{uniqueId}}" class="ms-Toggle-field">' +
                    '<span class="ms-Label ms-Label--off">{{labelOff}}</span>' +
                    '<span class="ms-Label ms-Label--on">{{labelOn}}</span>' +
                '</label>' +
                '</div>';
    constructor() {
    }
    transclude = true;
    uniqueId = 1;
    scope = {
        labelOff: "@",
        labelOn: "@",
        toggled: "="
    }

    link(scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;

        scope.toggleClass = "ms-Toggle";
        
        if (attrs["textLocation"]) {
            
            var loc = attrs["textLocation"];
            loc = loc.charAt(0).toUpperCase() + loc.slice(1);
            scope.toggleClass += " ms-Toggle--text" + loc;
        }
    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new ToggleDirective();

        return directive;
    }
}


angular.module("fabric.ui.components.toggle", ['fabric.ui.components'])
    .directive("uifToggle", ToggleDirective.factory());
