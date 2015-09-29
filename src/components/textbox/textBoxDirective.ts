class TextBoxDirective implements ng.IDirective {

    template = '<div class="ms-TextField">' +
                    '<input type="text" class="ms-TextField-field" id="{{uniqueId}}" ng-model="value" />' +
                '</div>'  ;
    constructor() {
    }
    uniqueId = 1;
    scope = {
        value: "=value"
    }

    link(scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
        //console.log(attrs);
        //scope.model = {
        //    value: attrs.value
        //};
        
    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new TextBoxDirective();

        return directive;
    }
}

angular.module("fabric.ui.components.textbox", ['fabric.ui.components'])
    .directive("uifTextbox", TextBoxDirective.factory());