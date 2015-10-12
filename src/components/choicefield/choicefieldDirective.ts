class ChoiceFieldDirective implements ng.IDirective {

    template = '<div class="ms-ChoiceField">' +
    '<input id="{{uniqueId}}" class="ms-ChoiceField-input" type="radio" ng-checked="checked">' +
    '<label for="{{uniqueId}}" class="ms-ChoiceField-field"><span class="ms-Label">{{label}}</span></label>' +
    '</div>';
    constructor() {
    }
    uniqueId = 1;
    scope = {
        checked: "=",
        label: "@"
    }

    link(scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
        
    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new ChoiceFieldDirective();

        return directive;
    }
}

angular.module("fabric.ui.components.choicefield", ['fabric.ui.components'])
    .directive("uifChoicefield", ChoiceFieldDirective.factory());