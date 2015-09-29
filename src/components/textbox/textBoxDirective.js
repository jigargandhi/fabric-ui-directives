var TextBoxDirective = (function () {
    function TextBoxDirective() {
        this.template = '<div class="ms-TextField">' +
            '<input type="text" class="ms-TextField-field" id="{{uniqueId}}" ng-model="value" />' +
            '</div>';
        this.uniqueId = 1;
        this.scope = {
            value: "=value"
        };
    }
    TextBoxDirective.prototype.link = function (scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
        //console.log(attrs);
        //scope.model = {
        //    value: attrs.value
        //};
    };
    TextBoxDirective.factory = function () {
        var directive = function () { return new TextBoxDirective(); };
        return directive;
    };
    return TextBoxDirective;
})();
angular.module("fabric.ui.components.textbox", ['fabric.ui.components'])
    .directive("uifTextbox", TextBoxDirective.factory());
