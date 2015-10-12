var ChoiceFieldDirective = (function () {
    function ChoiceFieldDirective() {
        this.template = '<div class="ms-ChoiceField">' +
            '<input id="{{uniqueId}}" class="ms-ChoiceField-input" type="radio" ng-checked="checked">' +
            '<label for="{{uniqueId}}" class="ms-ChoiceField-field"><span class="ms-Label"><ng-transclude/></span></label>' +
            '</div>';
        this.uniqueId = 1;
        this.transclude = true;
        this.scope = {
            checked: "="
        };
    }
    ChoiceFieldDirective.prototype.link = function (scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
    };
    ChoiceFieldDirective.factory = function () {
        var directive = function () { return new ChoiceFieldDirective(); };
        return directive;
    };
    return ChoiceFieldDirective;
})();
angular.module("fabric.ui.components.choicefield", ['fabric.ui.components'])
    .directive("uifChoicefield", ChoiceFieldDirective.factory());
